// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let error = {
        message: 'Something went wrong!',
        status: 500
    };

    // Database errors
    if (err.code === 'SQLITE_CONSTRAINT') {
        if (err.message.includes('UNIQUE constraint failed')) {
            error.message = 'Duplicate entry. This record already exists.';
            error.status = 409;
        } else if (err.message.includes('FOREIGN KEY constraint failed')) {
            error.message = 'Invalid reference. Related record does not exist.';
            error.status = 400;
        } else {
            error.message = 'Database constraint violation.';
            error.status = 400;
        }
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error.message = 'Invalid token.';
        error.status = 401;
    }

    if (err.name === 'TokenExpiredError') {
        error.message = 'Token has expired.';
        error.status = 401;
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        error.message = 'Validation failed.';
        error.status = 400;
    }

    // Cast errors (invalid ObjectId, etc.)
    if (err.name === 'CastError') {
        error.message = 'Invalid ID format.';
        error.status = 400;
    }

    // Duplicate key errors
    if (err.code === 11000) {
        error.message = 'Duplicate entry. This record already exists.';
        error.status = 409;
    }

    // Rate limit errors
    if (err.status === 429) {
        error.message = 'Too many requests. Please try again later.';
        error.status = 429;
    }

    // Send error response
    res.status(error.status).json({
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

// 404 handler
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export { errorHandler, notFound, asyncHandler };
