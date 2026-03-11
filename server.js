import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import database from './database/database.js';
import { errorHandler, notFound, asyncHandler } from './middleware/errorHandler.js';
import {
    validateAdminLogin,
    validateProduct,
    validateContactForm,
    validateNewsletterSubscription,
    validateSiteSetting,
    validateContactStatus,
    validateId,
    validatePagination,
    validateAnalyticsTracking
} from './middleware/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many authentication attempts, please try again later.'
});
app.use('/api/admin/login', authLimiter);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize database
database.init().catch(console.error);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Admin authentication
app.post('/api/admin/login', validateAdminLogin, asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await database.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email, role: user.role },
        message: 'Login successful'
    });
}));

// Get all products (admin)
app.get('/api/admin/products', authenticateToken, asyncHandler(async (req, res) => {
    const products = await database.getAllProducts();
    res.json(products);
}));

// Get single product (admin)
app.get('/api/admin/products/:id', authenticateToken, validateId, asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);
    const product = await database.getProductById(productId);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
}));

// Add new product (admin)
app.post('/api/admin/products', authenticateToken, validateProduct, asyncHandler(async (req, res) => {
    const { name, description, price, category_id, features, image_url, is_featured } = req.body;

    const result = await database.createProduct({
        name,
        description,
        price,
        category_id,
        features: features || [],
        image_url,
        is_featured: is_featured || false
    });

    const newProduct = await database.getProductById(result.id);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
}));

// Update product (admin)
app.put('/api/admin/products/:id', authenticateToken, validateId, validateProduct, asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price, category_id, features, image_url, is_featured } = req.body;

    const existingProduct = await database.getProductById(productId);
    if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await database.updateProduct(productId, {
        name,
        description,
        price,
        category_id,
        features: features || [],
        image_url,
        is_featured: is_featured || false
    });

    const updatedProduct = await database.getProductById(productId);
    res.json({ message: 'Product updated successfully', product: updatedProduct });
}));

// Delete product (admin)
app.delete('/api/admin/products/:id', authenticateToken, validateId, asyncHandler(async (req, res) => {
    const productId = parseInt(req.params.id);
    
    const existingProduct = await database.getProductById(productId);
    if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await database.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
}));

// Contact form submission
app.post('/api/contact', validateContactForm, asyncHandler(async (req, res) => {
    const { name, email, phone, company, subject, message, newsletter } = req.body;
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get('User-Agent');

    const submissionData = {
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        newsletter_subscription: newsletter || false,
        ip_address,
        user_agent
    };

    await database.createContactSubmission(submissionData);

    // Subscribe to newsletter if requested
    if (newsletter) {
        try {
            await database.subscribeNewsletter(email, name, 'contact_form');
        } catch (error) {
            console.log('Newsletter subscription error:', error.message);
        }
    }

    res.json({ message: 'Thank you for your message! We will get back to you soon.' });
}));

// Get contact submissions (admin)
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (page - 1) * limit;
        
        const submissions = await database.getAllContactSubmissions(parseInt(limit), parseInt(offset));
        res.json(submissions);
    } catch (error) {
        console.error('Error fetching contact submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single contact submission (admin)
app.get('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
    try {
        const submissionId = parseInt(req.params.id);
        const submission = await database.getContactSubmissionById(submissionId);
        
        if (!submission) {
            return res.status(404).json({ message: 'Contact submission not found' });
        }
        
        res.json(submission);
    } catch (error) {
        console.error('Error fetching contact submission:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update contact submission status (admin)
app.put('/api/admin/contacts/:id/status', authenticateToken, [
    body('status').isIn(['new', 'read', 'replied', 'closed']).withMessage('Invalid status')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
        }

        const submissionId = parseInt(req.params.id);
        const { status } = req.body;

        const existingSubmission = await database.getContactSubmissionById(submissionId);
        if (!existingSubmission) {
            return res.status(404).json({ message: 'Contact submission not found' });
        }

        await database.updateContactStatus(submissionId, status);
        res.json({ message: 'Contact submission status updated successfully' });
    } catch (error) {
        console.error('Error updating contact submission:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Analytics data (admin)
app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const analytics = await database.getAnalyticsData(parseInt(days));
        
        // Get additional stats
        const [totalProducts, totalContacts, totalNewsletterSubscribers] = await Promise.all([
            database.get('SELECT COUNT(*) as count FROM products WHERE is_active = 1'),
            database.get('SELECT COUNT(*) as count FROM contact_submissions'),
            database.get('SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 1')
        ]);

        res.json({
            ...analytics,
            totalProducts: totalProducts.count,
            totalContacts: totalContacts.count,
            totalNewsletterSubscribers: totalNewsletterSubscribers.count
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Track page view
app.post('/api/analytics/track', async (req, res) => {
    try {
        const { page, referrer, session_id } = req.body;
        const ip_address = req.ip || req.connection.remoteAddress;
        const user_agent = req.get('User-Agent');

        await database.trackPageView({
            page,
            ip_address,
            user_agent,
            referrer,
            session_id
        });

        res.json({ message: 'Page view tracked' });
    } catch (error) {
        console.error('Error tracking page view:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Newsletter subscription
app.post('/api/newsletter/subscribe', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
        }

        const { email, name } = req.body;
        
        await database.subscribeNewsletter(email, name, 'website');
        res.json({ message: 'Successfully subscribed to newsletter!' });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get site settings (public)
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await database.getPublicSiteSettings();
        const settingsObject = {};
        settings.forEach(setting => {
            settingsObject[setting.setting_key] = setting.setting_value;
        });
        res.json(settingsObject);
    } catch (error) {
        console.error('Error fetching site settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all site settings (admin)
app.get('/api/admin/settings', authenticateToken, async (req, res) => {
    try {
        const settings = await database.getAllSiteSettings();
        res.json(settings);
    } catch (error) {
        console.error('Error fetching site settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update site setting (admin)
app.put('/api/admin/settings/:key', authenticateToken, [
    body('value').notEmpty().withMessage('Setting value is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
        }

        const { key } = req.params;
        const { value } = req.body;

        await database.updateSiteSetting(key, value);
        res.json({ message: 'Setting updated successfully' });
    } catch (error) {
        console.error('Error updating site setting:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get categories (public)
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await database.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get products (public)
app.get('/api/products', async (req, res) => {
    try {
        const products = await database.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Admin login: admin / admin123`);
});
