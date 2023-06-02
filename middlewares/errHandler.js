exports.errHandler = (error, req, res, next) => {
    const stack = err.stack;
    const status = err.statsu || 'failed!';
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({
        stack: stack,
        status: status,
        message: message
    });
}