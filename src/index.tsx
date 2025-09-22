import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes

// Get all projects
app.get('/api/projects', async (c) => {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      SELECT id, name, amount, description, client, status, created_at, updated_at
      FROM projects 
      ORDER BY created_at DESC
    `).all();
    
    // Convert amounts from cents to regular currency
    const projects = result.results?.map(project => ({
      ...project,
      amount: (project.amount as number) / 100
    })) || [];

    return c.json({ projects, total: projects.length });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Get all payments
app.get('/api/payments', async (c) => {
  const { env } = c;
  
  try {
    const result = await env.DB.prepare(`
      SELECT id, month, amount, client, description, received_date, created_at, updated_at
      FROM payments 
      ORDER BY month DESC
    `).all();
    
    // Convert amounts from cents to regular currency
    const payments = result.results?.map(payment => ({
      ...payment,
      amount: (payment.amount as number) / 100
    })) || [];

    return c.json({ payments, total: payments.length });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return c.json({ error: 'Failed to fetch payments' }, 500);
  }
});

// Get delta calculation
app.get('/api/delta', async (c) => {
  const { env } = c;
  
  try {
    // Calculate totals
    const projectsResult = await env.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM projects WHERE status = 'active'
    `).first();
    
    const paymentsResult = await env.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM payments
    `).first();
    
    const totalProjects = (projectsResult?.total as number) || 0;
    const totalPayments = (paymentsResult?.total as number) || 0;
    const delta = totalPayments - totalProjects;
    
    // Get recent delta calculations
    const historyResult = await env.DB.prepare(`
      SELECT * FROM delta_calculations 
      ORDER BY calculation_date DESC 
      LIMIT 10
    `).all();
    
    const history = historyResult.results?.map(calc => ({
      ...calc,
      total_project_amount: (calc.total_project_amount as number) / 100,
      total_received_amount: (calc.total_received_amount as number) / 100,
      delta_amount: (calc.delta_amount as number) / 100
    })) || [];

    return c.json({
      current: {
        totalProjects: totalProjects / 100,
        totalPayments: totalPayments / 100,
        delta: delta / 100,
        status: delta >= 0 ? 'excess' : 'pending'
      },
      history
    });
  } catch (error) {
    console.error('Error calculating delta:', error);
    return c.json({ error: 'Failed to calculate delta' }, 500);
  }
});

// Add new project
app.post('/api/projects', async (c) => {
  const { env } = c;
  
  try {
    const { name, amount, description, client = 'Digital Span' } = await c.req.json();
    
    if (!name || !amount) {
      return c.json({ error: 'Name and amount are required' }, 400);
    }

    const result = await env.DB.prepare(`
      INSERT INTO projects (name, amount, description, client)
      VALUES (?, ?, ?, ?)
    `).bind(name, Math.round(amount * 100), description || '', client).run();

    return c.json({ 
      id: result.meta.last_row_id, 
      name, 
      amount, 
      description, 
      client,
      message: 'Project added successfully' 
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return c.json({ error: 'Failed to add project' }, 500);
  }
});

// Add new payment
app.post('/api/payments', async (c) => {
  const { env } = c;
  
  try {
    const { month, amount, description, client = 'Digital Span' } = await c.req.json();
    
    if (!month || !amount) {
      return c.json({ error: 'Month and amount are required' }, 400);
    }

    const result = await env.DB.prepare(`
      INSERT INTO payments (month, amount, description, client)
      VALUES (?, ?, ?, ?)
    `).bind(month, Math.round(amount * 100), description || '', client).run();

    return c.json({ 
      id: result.meta.last_row_id, 
      month, 
      amount, 
      description, 
      client,
      message: 'Payment added successfully' 
    });
  } catch (error) {
    console.error('Error adding payment:', error);
    return c.json({ error: 'Failed to add payment' }, 500);
  }
});

// Save delta calculation
app.post('/api/delta/save', async (c) => {
  const { env } = c;
  
  try {
    const projectsResult = await env.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM projects WHERE status = 'active'
    `).first();
    
    const paymentsResult = await env.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM payments
    `).first();
    
    const totalProjects = (projectsResult?.total as number) || 0;
    const totalPayments = (paymentsResult?.total as number) || 0;
    const delta = totalPayments - totalProjects;

    const result = await env.DB.prepare(`
      INSERT INTO delta_calculations (calculation_date, total_project_amount, total_received_amount, delta_amount, notes)
      VALUES (DATE('now'), ?, ?, ?, ?)
    `).bind(totalProjects, totalPayments, delta, 'Manual calculation save').run();

    return c.json({ 
      id: result.meta.last_row_id,
      totalProjects: totalProjects / 100,
      totalPayments: totalPayments / 100,
      delta: delta / 100,
      message: 'Delta calculation saved' 
    });
  } catch (error) {
    console.error('Error saving delta calculation:', error);
    return c.json({ error: 'Failed to save delta calculation' }, 500);
  }
});

// Update project
app.put('/api/projects/:id', async (c) => {
  const { env } = c;
  const id = c.req.param('id');
  
  try {
    const { name, amount, description, client, status } = await c.req.json();
    
    if (!name || !amount) {
      return c.json({ error: 'Name and amount are required' }, 400);
    }

    await env.DB.prepare(`
      UPDATE projects 
      SET name = ?, amount = ?, description = ?, client = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(name, Math.round(amount * 100), description || '', client || 'Digital Span', status || 'active', id).run();

    return c.json({ 
      id: parseInt(id), 
      name, 
      amount, 
      description, 
      client,
      status,
      message: 'Project updated successfully' 
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

// Delete project
app.delete('/api/projects/:id', async (c) => {
  const { env } = c;
  const id = c.req.param('id');
  
  try {
    const result = await env.DB.prepare(`
      DELETE FROM projects WHERE id = ?
    `).bind(id).run();

    if (result.changes === 0) {
      return c.json({ error: 'Project not found' }, 404);
    }

    return c.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// Update payment
app.put('/api/payments/:id', async (c) => {
  const { env } = c;
  const id = c.req.param('id');
  
  try {
    const { month, amount, description, client } = await c.req.json();
    
    if (!month || !amount) {
      return c.json({ error: 'Month and amount are required' }, 400);
    }

    await env.DB.prepare(`
      UPDATE payments 
      SET month = ?, amount = ?, description = ?, client = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(month, Math.round(amount * 100), description || '', client || 'Digital Span', id).run();

    return c.json({ 
      id: parseInt(id), 
      month, 
      amount, 
      description, 
      client,
      message: 'Payment updated successfully' 
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    return c.json({ error: 'Failed to update payment' }, 500);
  }
});

// Delete payment
app.delete('/api/payments/:id', async (c) => {
  const { env } = c;
  const id = c.req.param('id');
  
  try {
    const result = await env.DB.prepare(`
      DELETE FROM payments WHERE id = ?
    `).bind(id).run();

    if (result.changes === 0) {
      return c.json({ error: 'Payment not found' }, 404);
    }

    return c.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return c.json({ error: 'Failed to delete payment' }, 500);
  }
});

// Main dashboard route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delta Calculator - Surprised vs Digital Span</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          .delta-positive { color: #059669; }
          .delta-negative { color: #dc2626; }
          .card { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
        </style>
    </head>
    <body class="bg-gray-50">
        <div class="min-h-screen">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center py-6">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">
                                <i class="fas fa-calculator mr-3 text-blue-600"></i>
                                Delta Calculator
                            </h1>
                            <p class="text-sm text-gray-600 mt-1">Surprised vs Digital Span Financial Tracking</p>
                        </div>
                        <button onclick="refreshData()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-sync-alt mr-2"></i>Refresh
                        </button>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Delta Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                                <i class="fas fa-project-diagram"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Total Projects</p>
                                <p class="text-2xl font-semibold text-gray-900" id="totalProjects">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 text-green-600">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Total Received</p>
                                <p class="text-2xl font-semibold text-gray-900" id="totalPayments">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Delta Amount</p>
                                <p class="text-2xl font-semibold" id="deltaAmount">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-orange-100 text-orange-600">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Status</p>
                                <p class="text-lg font-semibold" id="deltaStatus">Calculating...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Projects Section -->
                    <div class="bg-white rounded-lg shadow-sm">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">
                                <i class="fas fa-tasks mr-2"></i>Projects
                            </h2>
                        </div>
                        <div class="p-6">
                            <div class="overflow-hidden" style="max-height: 400px; overflow-y: auto;">
                                <table class="min-w-full" id="projectsTable">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Payments Section -->
                    <div class="bg-white rounded-lg shadow-sm">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">
                                <i class="fas fa-credit-card mr-2"></i>Payments Received
                            </h2>
                        </div>
                        <div class="p-6">
                            <div class="overflow-hidden" style="max-height: 400px; overflow-y: auto;">
                                <table class="min-w-full" id="paymentsTable">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">
                        <i class="fas fa-plus-circle mr-2"></i>Quick Actions
                    </h3>
                    <div class="flex flex-wrap gap-4">
                        <button onclick="showAddProjectForm()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Add Project
                        </button>
                        <button onclick="showAddPaymentForm()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Add Payment
                        </button>
                        <button onclick="saveDeltaCalculation()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            <i class="fas fa-save mr-2"></i>Save Current Delta
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Project Modal -->
        <div id="addProjectModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Add New Project</h3>
                    <form id="projectForm">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                            <input type="text" id="projectName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="projectAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="projectDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideAddProjectForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Add Payment Modal -->
        <div id="addPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Add New Payment</h3>
                    <form id="paymentForm">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Month (YYYY-MM)</label>
                            <input type="month" id="paymentMonth" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="paymentAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="paymentDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideAddPaymentForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add Payment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Project Modal -->
        <div id="editProjectModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Edit Project</h3>
                    <form id="editProjectForm">
                        <input type="hidden" id="editProjectId">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                            <input type="text" id="editProjectName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="editProjectAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="editProjectDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select id="editProjectStatus" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideEditProjectForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Payment Modal -->
        <div id="editPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Edit Payment</h3>
                    <form id="editPaymentForm">
                        <input type="hidden" id="editPaymentId">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Month (YYYY-MM)</label>
                            <input type="month" id="editPaymentMonth" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="editPaymentAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="editPaymentDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideEditPaymentForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Update Payment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4 text-red-600">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Confirm Delete
                    </h3>
                    <p class="text-gray-700 mb-6" id="deleteMessage">Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div class="flex gap-3">
                        <button type="button" onclick="hideDeleteModal()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                        <button type="button" onclick="confirmDelete()" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app