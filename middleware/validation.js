import { body, param, query, validationResult } from 'express-validator';

// Validation middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// Admin authentication validation
const validateAdminLogin = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];

// Product validation
const validateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Product name must be between 3 and 200 characters'),
    body('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Product description must be between 10 and 2000 characters'),
    body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isLength({ max: 100 })
        .withMessage('Price must not exceed 100 characters'),
    body('category_id')
        .isInt({ min: 1 })
        .withMessage('Valid category ID is required'),
    body('features')
        .optional()
        .isArray()
        .withMessage('Features must be an array'),
    body('image_url')
        .optional()
        .isURL()
        .withMessage('Image URL must be a valid URL'),
    body('is_featured')
        .optional()
        .isBoolean()
        .withMessage('is_featured must be a boolean'),
    handleValidationErrors
];

// Contact form validation
const validateContactForm = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    body('email')
        .isEmail()
        .withMessage('Valid email address is required')
        .normalizeEmail(),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Phone number must be valid'),
    body('company')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Company name must not exceed 200 characters'),
    body('subject')
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Subject must be between 5 and 200 characters'),
    body('message')
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
    body('newsletter')
        .optional()
        .isBoolean()
        .withMessage('Newsletter subscription must be a boolean'),
    handleValidationErrors
];

// Newsletter subscription validation
const validateNewsletterSubscription = [
    body('email')
        .isEmail()
        .withMessage('Valid email address is required')
        .normalizeEmail(),
    body('name')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    handleValidationErrors
];

// Site setting validation
const validateSiteSetting = [
    body('value')
        .notEmpty()
        .withMessage('Setting value is required')
        .isLength({ max: 1000 })
        .withMessage('Setting value must not exceed 1000 characters'),
    handleValidationErrors
];

// Contact status validation
const validateContactStatus = [
    body('status')
        .isIn(['new', 'read', 'replied', 'closed'])
        .withMessage('Status must be one of: new, read, replied, closed'),
    handleValidationErrors
];

// Parameter validation
const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    handleValidationErrors
];

// Query validation
const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    handleValidationErrors
];

// Analytics tracking validation
const validateAnalyticsTracking = [
    body('page')
        .notEmpty()
        .withMessage('Page is required')
        .isLength({ max: 200 })
        .withMessage('Page must not exceed 200 characters'),
    body('referrer')
        .optional()
        .isURL()
        .withMessage('Referrer must be a valid URL'),
    body('session_id')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Session ID must not exceed 100 characters'),
    handleValidationErrors
];

export {
    validateAdminLogin,
    validateProduct,
    validateContactForm,
    validateNewsletterSubscription,
    validateSiteSetting,
    validateContactStatus,
    validateId,
    validatePagination,
    validateAnalyticsTracking,
    handleValidationErrors
};
