-- Migration 002: Seed Data
-- This migration inserts initial data into the database

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (username, password_hash, email, role) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@revotechnologies.ug', 'admin');

-- Insert product categories
INSERT OR IGNORE INTO categories (name, description, slug) VALUES 
('Financial Technology', 'Banking and financial technology solutions', 'financial-technology'),
('E-Commerce', 'Online commerce and marketplace solutions', 'e-commerce'),
('Retail Technology', 'Point of sale and retail management systems', 'retail-technology'),
('Cloud Services', 'Cloud infrastructure and hosting solutions', 'cloud-services'),
('Mobile Development', 'Mobile application development services', 'mobile-development'),
('Web Development', 'Web application and website development', 'web-development'),
('Data Analytics', 'Business intelligence and data analysis', 'data-analytics');

-- Insert sample products
INSERT OR IGNORE INTO products (name, description, price, category_id, features, is_featured) VALUES 
('Mobile Banking Solutions', 'Complete mobile banking platform with secure transactions, bill payments, and account management.', 'Contact for Pricing', 1, '["Secure Transactions", "Bill Payments", "Account Management", "Multi-language Support"]', 1),
('E-Commerce Platform', 'Comprehensive e-commerce solution with payment integration, inventory management, and analytics.', 'Starting from $2,500', 2, '["Payment Integration", "Inventory Management", "Analytics Dashboard", "Mobile Responsive"]', 1),
('Digital Wallet System', 'Secure digital wallet for storing and transferring digital currencies with advanced security features.', 'Contact for Pricing', 1, '["Multi-currency Support", "Advanced Security", "Instant Transfers", "Transaction History"]', 0),
('POS Management System', 'Point of sale system for retail businesses with inventory tracking and sales analytics.', 'Starting from $1,200', 3, '["Inventory Tracking", "Sales Analytics", "Receipt Management", "Multi-location Support"]', 0),
('Cloud Infrastructure', 'Scalable cloud infrastructure solutions for businesses of all sizes with 99.9% uptime guarantee.', 'Starting from $500/month', 4, '["Scalable Infrastructure", "99.9% Uptime", "24/7 Support", "Data Backup"]', 0),
('Mobile App Development', 'Custom mobile applications for iOS and Android with modern UI/UX design.', 'Starting from $5,000', 5, '["iOS & Android", "Modern UI/UX", "API Integration", "App Store Deployment"]', 0),
('Web Development', 'Responsive web applications with modern frameworks and optimal performance.', 'Starting from $3,000', 6, '["Responsive Design", "Modern Frameworks", "SEO Optimized", "Fast Loading"]', 0),
('Data Analytics Platform', 'Advanced analytics platform for business intelligence and data-driven decision making.', 'Starting from $2,000', 7, '["Business Intelligence", "Real-time Analytics", "Custom Dashboards", "Data Visualization"]', 0);

-- Insert site settings
INSERT OR IGNORE INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES 
('site_name', 'Revo Technologies Uganda', 'text', 'Company name', 1),
('site_tagline', 'Innovating financial and technology solutions for Africa and beyond', 'text', 'Company tagline', 1),
('contact_email', 'info@revotechnologies.ug', 'text', 'Primary contact email', 1),
('contact_phone', '+256 700 123 456', 'text', 'Primary contact phone', 1),
('contact_address', 'Plot 123, Nakawa Industrial Area, Kampala, Uganda', 'text', 'Company address', 1),
('social_facebook', 'https://facebook.com/revotechnologies', 'text', 'Facebook page URL', 1),
('social_twitter', 'https://twitter.com/revotechnologies', 'text', 'Twitter profile URL', 1),
('social_linkedin', 'https://linkedin.com/company/revotechnologies', 'text', 'LinkedIn company page URL', 1),
('social_instagram', 'https://instagram.com/revotechnologies', 'text', 'Instagram profile URL', 1),
('hero_title', 'Welcome to Revo Technologies Uganda', 'text', 'Homepage hero title', 1),
('hero_subtitle', 'Innovating financial and technology solutions for Africa and beyond', 'text', 'Homepage hero subtitle', 1),
('about_story', 'Founded in 2019, Revo Technologies Uganda emerged from a vision to bridge the digital divide in Africa. We recognized the immense potential of technology to transform businesses and communities across the continent, and set out to make that vision a reality.', 'text', 'About us story', 1),
('about_mission', 'To empower African businesses with innovative technology solutions that drive growth, efficiency, and digital transformation across all sectors.', 'text', 'Company mission', 1),
('about_vision', 'To be the leading technology partner in Africa, creating a digitally connected continent where every business can leverage technology to achieve its full potential.', 'text', 'Company vision', 1),
('stats_projects', '500+', 'text', 'Number of completed projects', 1),
('stats_clients', '50+', 'text', 'Number of happy clients', 1),
('stats_experience', '5+', 'text', 'Years of experience', 1),
('stats_support', '24/7', 'text', 'Support availability', 1),
('meta_description', 'Revo Technologies Uganda - Leading technology solutions provider in Africa. Specializing in financial technology, e-commerce, mobile apps, and cloud services.', 'text', 'Website meta description', 1),
('meta_keywords', 'technology, fintech, e-commerce, mobile apps, web development, cloud services, Uganda, Africa', 'text', 'Website meta keywords', 1);

