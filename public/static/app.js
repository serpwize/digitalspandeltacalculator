// Delta Calculator Frontend JavaScript

let currentData = {
    projects: [],
    payments: [],
    delta: null
};

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN');
}

// Load all data
async function loadData() {
    try {
        // Show loading state
        showLoadingState();
        
        // Fetch all data in parallel
        const [projectsResponse, paymentsResponse, deltaResponse] = await Promise.all([
            axios.get('/api/projects'),
            axios.get('/api/payments'),
            axios.get('/api/delta')
        ]);
        
        currentData.projects = projectsResponse.data.projects;
        currentData.payments = paymentsResponse.data.payments;
        currentData.delta = deltaResponse.data.current;
        
        // Update UI
        updateDashboard();
        updateProjectsTable();
        updatePaymentsTable();
        
    } catch (error) {
        console.error('Error loading data:', error);
        showErrorMessage('Failed to load data. Please try again.');
    }
}

// Show loading state
function showLoadingState() {
    document.getElementById('totalProjects').textContent = 'Loading...';
    document.getElementById('totalPayments').textContent = 'Loading...';
    document.getElementById('deltaAmount').textContent = 'Loading...';
    document.getElementById('deltaStatus').textContent = 'Loading...';
}

// Update dashboard cards
function updateDashboard() {
    const { totalProjects, totalPayments, delta, status } = currentData.delta;
    
    document.getElementById('totalProjects').textContent = formatCurrency(totalProjects);
    document.getElementById('totalPayments').textContent = formatCurrency(totalPayments);
    
    const deltaElement = document.getElementById('deltaAmount');
    deltaElement.textContent = formatCurrency(Math.abs(delta));
    deltaElement.className = `text-2xl font-semibold ${delta >= 0 ? 'delta-positive' : 'delta-negative'}`;
    
    const statusElement = document.getElementById('deltaStatus');
    if (delta >= 0) {
        statusElement.textContent = `₹${formatCurrency(delta).replace(/[₹,]/g, '')} Excess`;
        statusElement.className = 'text-lg font-semibold delta-positive';
    } else {
        statusElement.textContent = `₹${formatCurrency(Math.abs(delta)).replace(/[₹,]/g, '')} Pending`;
        statusElement.className = 'text-lg font-semibold delta-negative';
    }
}

// Update projects table
function updateProjectsTable() {
    const tbody = document.querySelector('#projectsTable tbody');
    
    if (currentData.projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">No projects found</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentData.projects.map(project => `
        <tr>
            <td class="px-4 py-3">
                <div>
                    <p class="text-sm font-medium text-gray-900">${escapeHtml(project.name)}</p>
                    ${project.description ? `<p class="text-xs text-gray-500">${escapeHtml(project.description)}</p>` : ''}
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'
                    }">${project.status}</span>
                </div>
            </td>
            <td class="px-4 py-3 text-right text-sm font-medium text-gray-900">
                ${formatCurrency(project.amount)}
            </td>
            <td class="px-4 py-3 text-center">
                <div class="flex justify-center space-x-2">
                    <button onclick="editProject(${project.id})" class="text-blue-600 hover:text-blue-800" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProject(${project.id}, '${escapeHtml(project.name)}')" class="text-red-600 hover:text-red-800" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update payments table
function updatePaymentsTable() {
    const tbody = document.querySelector('#paymentsTable tbody');
    
    if (currentData.payments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">No payments found</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentData.payments.map(payment => `
        <tr>
            <td class="px-4 py-3">
                <div>
                    <p class="text-sm font-medium text-gray-900">${payment.month}</p>
                    ${payment.description ? `<p class="text-xs text-gray-500">${escapeHtml(payment.description)}</p>` : ''}
                </div>
            </td>
            <td class="px-4 py-3 text-right text-sm font-medium text-gray-900">
                ${formatCurrency(payment.amount)}
            </td>
            <td class="px-4 py-3 text-center">
                <div class="flex justify-center space-x-2">
                    <button onclick="editPayment(${payment.id})" class="text-blue-600 hover:text-blue-800" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deletePayment(${payment.id}, '${payment.month}')" class="text-red-600 hover:text-red-800" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Refresh all data
async function refreshData() {
    await loadData();
    showSuccessMessage('Data refreshed successfully!');
}

// Show/hide project form
function showAddProjectForm() {
    document.getElementById('addProjectModal').classList.remove('hidden');
}

function hideAddProjectForm() {
    document.getElementById('addProjectModal').classList.add('hidden');
    document.getElementById('projectForm').reset();
}

// Show/hide payment form
function showAddPaymentForm() {
    document.getElementById('addPaymentModal').classList.remove('hidden');
}

function hideAddPaymentForm() {
    document.getElementById('addPaymentModal').classList.add('hidden');
    document.getElementById('paymentForm').reset();
}

// Add new project
async function addProject(event) {
    event.preventDefault();
    
    const name = document.getElementById('projectName').value.trim();
    const amount = parseFloat(document.getElementById('projectAmount').value);
    const description = document.getElementById('projectDescription').value.trim();
    
    if (!name || !amount) {
        showErrorMessage('Please fill in all required fields');
        return;
    }
    
    try {
        await axios.post('/api/projects', {
            name,
            amount,
            description
        });
        
        hideAddProjectForm();
        await loadData();
        showSuccessMessage('Project added successfully!');
    } catch (error) {
        console.error('Error adding project:', error);
        showErrorMessage('Failed to add project. Please try again.');
    }
}

// Add new payment
async function addPayment(event) {
    event.preventDefault();
    
    const month = document.getElementById('paymentMonth').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const description = document.getElementById('paymentDescription').value.trim();
    
    if (!month || !amount) {
        showErrorMessage('Please fill in all required fields');
        return;
    }
    
    try {
        await axios.post('/api/payments', {
            month,
            amount,
            description
        });
        
        hideAddPaymentForm();
        await loadData();
        showSuccessMessage('Payment added successfully!');
    } catch (error) {
        console.error('Error adding payment:', error);
        showErrorMessage('Failed to add payment. Please try again.');
    }
}

// Save delta calculation
async function saveDeltaCalculation() {
    try {
        await axios.post('/api/delta/save');
        showSuccessMessage('Delta calculation saved successfully!');
    } catch (error) {
        console.error('Error saving delta calculation:', error);
        showErrorMessage('Failed to save delta calculation. Please try again.');
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.notification-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `notification-message fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`;
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    loadData();
    
    // Form submissions
    document.getElementById('projectForm').addEventListener('submit', addProject);
    document.getElementById('paymentForm').addEventListener('submit', addPayment);
    
    // Modal close on click outside
    document.getElementById('addProjectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideAddProjectForm();
        }
    });
    
    document.getElementById('addPaymentModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideAddPaymentForm();
        }
    });
    
    // Edit form submissions
    document.getElementById('editProjectForm').addEventListener('submit', updateProject);
    document.getElementById('editPaymentForm').addEventListener('submit', updatePayment);
    
    // Edit modal close on click outside
    document.getElementById('editProjectModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideEditProjectForm();
        }
    });
    
    document.getElementById('editPaymentModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideEditPaymentForm();
        }
    });
    
    document.getElementById('deleteModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideDeleteModal();
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAddProjectForm();
            hideAddPaymentForm();
            hideEditProjectForm();
            hideEditPaymentForm();
            hideDeleteModal();
        }
    });
});

// Edit and Delete Functions

// Edit Project Functions
function editProject(projectId) {
    const project = currentData.projects.find(p => p.id === projectId);
    if (!project) {
        showErrorMessage('Project not found');
        return;
    }
    
    document.getElementById('editProjectId').value = project.id;
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectAmount').value = project.amount;
    document.getElementById('editProjectDescription').value = project.description || '';
    document.getElementById('editProjectStatus').value = project.status;
    
    showEditProjectForm();
}

function showEditProjectForm() {
    document.getElementById('editProjectModal').classList.remove('hidden');
}

function hideEditProjectForm() {
    document.getElementById('editProjectModal').classList.add('hidden');
    document.getElementById('editProjectForm').reset();
}

async function updateProject(event) {
    event.preventDefault();
    
    const id = document.getElementById('editProjectId').value;
    const name = document.getElementById('editProjectName').value.trim();
    const amount = parseFloat(document.getElementById('editProjectAmount').value);
    const description = document.getElementById('editProjectDescription').value.trim();
    const status = document.getElementById('editProjectStatus').value;
    
    if (!name || !amount) {
        showErrorMessage('Please fill in all required fields');
        return;
    }
    
    try {
        await axios.put(`/api/projects/${id}`, {
            name,
            amount,
            description,
            status
        });
        
        hideEditProjectForm();
        await loadData();
        showSuccessMessage('Project updated successfully!');
    } catch (error) {
        console.error('Error updating project:', error);
        showErrorMessage('Failed to update project. Please try again.');
    }
}

// Edit Payment Functions
function editPayment(paymentId) {
    const payment = currentData.payments.find(p => p.id === paymentId);
    if (!payment) {
        showErrorMessage('Payment not found');
        return;
    }
    
    document.getElementById('editPaymentId').value = payment.id;
    document.getElementById('editPaymentMonth').value = payment.month;
    document.getElementById('editPaymentAmount').value = payment.amount;
    document.getElementById('editPaymentDescription').value = payment.description || '';
    
    showEditPaymentForm();
}

function showEditPaymentForm() {
    document.getElementById('editPaymentModal').classList.remove('hidden');
}

function hideEditPaymentForm() {
    document.getElementById('editPaymentModal').classList.add('hidden');
    document.getElementById('editPaymentForm').reset();
}

async function updatePayment(event) {
    event.preventDefault();
    
    const id = document.getElementById('editPaymentId').value;
    const month = document.getElementById('editPaymentMonth').value;
    const amount = parseFloat(document.getElementById('editPaymentAmount').value);
    const description = document.getElementById('editPaymentDescription').value.trim();
    
    if (!month || !amount) {
        showErrorMessage('Please fill in all required fields');
        return;
    }
    
    try {
        await axios.put(`/api/payments/${id}`, {
            month,
            amount,
            description
        });
        
        hideEditPaymentForm();
        await loadData();
        showSuccessMessage('Payment updated successfully!');
    } catch (error) {
        console.error('Error updating payment:', error);
        showErrorMessage('Failed to update payment. Please try again.');
    }
}

// Delete Functions
let deleteItem = null;

function deleteProject(projectId, projectName) {
    deleteItem = { type: 'project', id: projectId, name: projectName };
    document.getElementById('deleteMessage').textContent = `Are you sure you want to delete the project "${projectName}"? This action cannot be undone.`;
    showDeleteModal();
}

function deletePayment(paymentId, paymentMonth) {
    deleteItem = { type: 'payment', id: paymentId, name: `payment for ${paymentMonth}` };
    document.getElementById('deleteMessage').textContent = `Are you sure you want to delete the payment for "${paymentMonth}"? This action cannot be undone.`;
    showDeleteModal();
}

function showDeleteModal() {
    document.getElementById('deleteModal').classList.remove('hidden');
}

function hideDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    deleteItem = null;
}

async function confirmDelete() {
    if (!deleteItem) {
        hideDeleteModal();
        return;
    }
    
    try {
        const endpoint = deleteItem.type === 'project' ? '/api/projects' : '/api/payments';
        await axios.delete(`${endpoint}/${deleteItem.id}`);
        
        hideDeleteModal();
        await loadData();
        showSuccessMessage(`${deleteItem.type === 'project' ? 'Project' : 'Payment'} deleted successfully!`);
    } catch (error) {
        console.error(`Error deleting ${deleteItem.type}:`, error);
        showErrorMessage(`Failed to delete ${deleteItem.type}. Please try again.`);
    }
}

// Auto-refresh every 5 minutes
setInterval(() => {
    loadData();
}, 5 * 60 * 1000);