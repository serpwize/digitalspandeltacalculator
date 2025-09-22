-- Insert project data (converting amounts to cents)
INSERT OR IGNORE INTO projects (name, amount, description) VALUES 
  ('Insight Information', 4000000, 'Website project'),
  ('D59', 6000000, 'Website project'),
  ('Digital Span Website', 5000000, 'Website project'),
  ('Grey tec', 3500000, 'Website project'),
  ('Studie dutch, egbert, server migration', 2000000, 'Website project'),
  ('Breakdance Autometrtens', 2500000, 'Website project'),
  ('Breakdance/elementor verkeersschoolweber', 2300000, 'Website project'),
  ('Mangia Pizza', 3750000, 'Website project'),
  ('June sohan work', 3500000, 'Website project'),
  ('Ovom', 3500000, 'Website project'),
  ('Brine Consulting', 4000000, 'Website project'),
  ('New Author website - chaitali', 1000000, 'Website project'),
  ('Digital Span - June', 1000000, 'Website project'),
  ('Digital Span - July', 1000000, 'Website project'),
  ('Digital Span - Aug', 1000000, 'Website project'),
  ('Greytec - seo & web maintenance - 6 months', 12000000, 'Website project'),
  ('BM Process June', 4300000, 'Website project'),
  ('BM Process July', 4300000, 'Website project'),
  ('BM Process Aug', 4300000, 'Website project'),
  ('BM Process Sept', 4300000, 'Website project'),
  ('Karen email task', 300000, 'Email task'),
  ('Greytec ads', 1500000, 'Advertising project'),
  ('orsi shopify', 2000000, 'Shopify project'),
  ('Karen email task', 300000, 'Email task'),
  ('Bram adhoc task - https://bint.be/', 500000, 'Adhoc task'),
  ('Deb DYL Design', 2500000, 'Design project'),
  ('Rodanco - website - without SEO', 7000000, 'Website project'),
  ('Test Site -Chaitali', 7000000, 'Test site'),
  ('NuQuant', 1000000, 'Website project'),
  ('Karen website', 1500000, 'Website project'),
  ('July Sohans work', 3500000, 'Website project'),
  ('Aug fixed amount for extra tasks', 1500000, 'Fixed amount tasks'),
  ('Aug extra amount based on 500 per hour - 15 hours', 750000, 'Hourly work - 15 hours @ 500/hour'),
  ('Gordium SEO - starting oct', 4000000, 'SEO project starting October');

-- Insert payment data (converting amounts to cents)
INSERT OR IGNORE INTO payments (month, amount, description) VALUES 
  ('2024-09', 5000000, 'Sept 2024 payment'),
  ('2024-10', 4960700, 'Oct 2024 payment'),
  ('2024-11', 4795000, 'Nov 2024 payment'),
  ('2024-12', 4824700, 'Dec 2024 payment'),
  ('2025-01', 0, 'Jan 2025 - no payment'),
  ('2025-02', 9900000, 'Feb 2025 payment'),
  ('2025-03', 0, 'March 2025 - no payment'),
  ('2025-04', 6000000, 'April 2025 payment'),
  ('2025-05', 6000000, 'May 2025 payment'),
  ('2025-06', 11000000, 'June 2025 payment'),
  ('2025-07', 11000000, 'July 2025 payment'),
  ('2025-08', 12500000, 'Aug 2025 payment'),
  ('2025-09', 12500000, 'Sept 2025 payment');

-- Calculate and insert initial delta calculation
INSERT INTO delta_calculations (
  calculation_date,
  total_project_amount,
  total_received_amount,
  delta_amount,
  notes
) VALUES (
  DATE('now'),
  (SELECT COALESCE(SUM(amount), 0) FROM projects),
  (SELECT COALESCE(SUM(amount), 0) FROM payments),
  (SELECT COALESCE(SUM(amount), 0) FROM payments) - (SELECT COALESCE(SUM(amount), 0) FROM projects),
  'Initial calculation based on seed data'
);