import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Database {
    constructor() {
        this.db = null;
        this.dbPath = path.join(__dirname, 'revotechnologies.db');
    }

    // Initialize database connection
    async init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    this.setupDatabase()
                        .then(() => resolve())
                        .catch(reject);
                }
            });
        });
    }

    // Setup database schema and seed data
    async setupDatabase() {
        try {
            // Read and execute schema
            const schemaPath = path.join(__dirname, 'schema.sql');
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await this.exec(schema);

            // Check if database is empty and seed if necessary
            const userCount = await this.get('SELECT COUNT(*) as count FROM users');
            if (userCount.count === 0) {
                const seedPath = path.join(__dirname, 'seed.sql');
                const seed = fs.readFileSync(seedPath, 'utf8');
                await this.exec(seed);
                console.log('Database seeded with initial data');
            }

            console.log('Database setup completed');
        } catch (error) {
            console.error('Error setting up database:', error);
            throw error;
        }
    }

    // Execute SQL query
    exec(sql) {
        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Run SQL query
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    // Get single row
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Get all rows
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Close database connection
    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connection closed');
                    resolve();
                }
            });
        });
    }

    // User methods
    async getUserByUsername(username) {
        return this.get('SELECT * FROM users WHERE username = ? AND is_active = 1', [username]);
    }

    async createUser(userData) {
        const { username, password_hash, email, role = 'admin' } = userData;
        return this.run(
            'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
            [username, password_hash, email, role]
        );
    }

    // Product methods
    async getAllProducts() {
        return this.all(`
            SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.is_active = 1 
            ORDER BY p.sort_order ASC, p.created_at DESC
        `);
    }

    async getProductById(id) {
        return this.get(`
            SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ? AND p.is_active = 1
        `, [id]);
    }

    async createProduct(productData) {
        const { name, description, price, category_id, features, image_url, is_featured = 0 } = productData;
        return this.run(
            'INSERT INTO products (name, description, price, category_id, features, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, category_id, JSON.stringify(features), image_url, is_featured]
        );
    }

    async updateProduct(id, productData) {
        const { name, description, price, category_id, features, image_url, is_featured } = productData;
        return this.run(
            'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, features = ?, image_url = ?, is_featured = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name, description, price, category_id, JSON.stringify(features), image_url, is_featured, id]
        );
    }

    async deleteProduct(id) {
        return this.run('UPDATE products SET is_active = 0 WHERE id = ?', [id]);
    }

    // Category methods
    async getAllCategories() {
        return this.all('SELECT * FROM categories WHERE is_active = 1 ORDER BY name ASC');
    }

    async getCategoryById(id) {
        return this.get('SELECT * FROM categories WHERE id = ? AND is_active = 1', [id]);
    }

    async createCategory(categoryData) {
        const { name, description, slug } = categoryData;
        return this.run(
            'INSERT INTO categories (name, description, slug) VALUES (?, ?, ?)',
            [name, description, slug]
        );
    }

    // Contact submission methods
    async createContactSubmission(submissionData) {
        const { name, email, phone, company, subject, message, newsletter_subscription, ip_address, user_agent } = submissionData;
        return this.run(
            'INSERT INTO contact_submissions (name, email, phone, company, subject, message, newsletter_subscription, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, company, subject, message, newsletter_subscription, ip_address, user_agent]
        );
    }

    async getAllContactSubmissions(limit = 50, offset = 0) {
        return this.all(
            'SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
    }

    async getContactSubmissionById(id) {
        return this.get('SELECT * FROM contact_submissions WHERE id = ?', [id]);
    }

    async updateContactStatus(id, status) {
        return this.run('UPDATE contact_submissions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
    }

    // Site settings methods
    async getSiteSetting(key) {
        return this.get('SELECT * FROM site_settings WHERE setting_key = ?', [key]);
    }

    async getAllSiteSettings() {
        return this.all('SELECT * FROM site_settings ORDER BY setting_key ASC');
    }

    async getPublicSiteSettings() {
        return this.all('SELECT setting_key, setting_value FROM site_settings WHERE is_public = 1 ORDER BY setting_key ASC');
    }

    async updateSiteSetting(key, value) {
        return this.run(
            'UPDATE site_settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?',
            [value, key]
        );
    }

    async createSiteSetting(settingData) {
        const { setting_key, setting_value, setting_type = 'text', description, is_public = 0 } = settingData;
        return this.run(
            'INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES (?, ?, ?, ?, ?)',
            [setting_key, setting_value, setting_type, description, is_public]
        );
    }

    // Analytics methods
    async trackPageView(pageData) {
        const { page, ip_address, user_agent, referrer, session_id } = pageData;
        return this.run(
            'INSERT INTO analytics (page, ip_address, user_agent, referrer, session_id) VALUES (?, ?, ?, ?, ?)',
            [page, ip_address, user_agent, referrer, session_id]
        );
    }

    async getAnalyticsData(days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const [pageViews, contactSubmissions, newsletterSubscribers] = await Promise.all([
            this.get('SELECT COUNT(*) as count FROM analytics WHERE created_at >= ?', [startDate.toISOString()]),
            this.get('SELECT COUNT(*) as count FROM contact_submissions WHERE created_at >= ?', [startDate.toISOString()]),
            this.get('SELECT COUNT(*) as count FROM newsletter_subscribers WHERE subscribed_at >= ? AND is_active = 1', [startDate.toISOString()])
        ]);

        const topPages = await this.all(`
            SELECT page, COUNT(*) as views 
            FROM analytics 
            WHERE created_at >= ? 
            GROUP BY page 
            ORDER BY views DESC 
            LIMIT 10
        `, [startDate.toISOString()]);

        return {
            pageViews: pageViews.count,
            contactSubmissions: contactSubmissions.count,
            newsletterSubscribers: newsletterSubscribers.count,
            topPages
        };
    }

    // Newsletter methods
    async subscribeNewsletter(email, name = null, source = 'website') {
        try {
            return await this.run(
                'INSERT INTO newsletter_subscribers (email, name, source) VALUES (?, ?, ?)',
                [email, name, source]
            );
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                // Email already exists, update if inactive
                return await this.run(
                    'UPDATE newsletter_subscribers SET is_active = 1, name = ?, subscribed_at = CURRENT_TIMESTAMP WHERE email = ?',
                    [name, email]
                );
            }
            throw error;
        }
    }

    async unsubscribeNewsletter(email) {
        return this.run(
            'UPDATE newsletter_subscribers SET is_active = 0, unsubscribed_at = CURRENT_TIMESTAMP WHERE email = ?',
            [email]
        );
    }

    async getNewsletterSubscribers(limit = 50, offset = 0) {
        return this.all(
            'SELECT * FROM newsletter_subscribers WHERE is_active = 1 ORDER BY subscribed_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
    }
}

// Create singleton instance
const database = new Database();

export default database;
