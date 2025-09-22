-- Projects table - stores all project information with pricing
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents to avoid floating point issues
  description TEXT,
  client TEXT DEFAULT 'Digital Span',
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'cancelled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Payments table - stores all received payments by month
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month TEXT NOT NULL, -- Format: 'YYYY-MM' (e.g., '2024-09')
  amount INTEGER NOT NULL, -- Amount in cents
  client TEXT DEFAULT 'Digital Span',
  description TEXT,
  received_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Delta calculations table - stores calculated balances
CREATE TABLE IF NOT EXISTS delta_calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculation_date DATE NOT NULL,
  total_project_amount INTEGER NOT NULL,
  total_received_amount INTEGER NOT NULL,
  delta_amount INTEGER NOT NULL, -- Positive = excess, Negative = pending
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_payments_month ON payments(month);
CREATE INDEX IF NOT EXISTS idx_payments_client ON payments(client);
CREATE INDEX IF NOT EXISTS idx_delta_date ON delta_calculations(calculation_date);

-- Triggers to update updated_at timestamps
CREATE TRIGGER IF NOT EXISTS update_projects_timestamp 
AFTER UPDATE ON projects
BEGIN
  UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_payments_timestamp 
AFTER UPDATE ON payments
BEGIN
  UPDATE payments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;