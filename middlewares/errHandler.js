const errHandler = (error, req, res, next) => {
    const stack = error.stack;
    const status = error.status || 'failed!';
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({
        status: status,
        message: message,
        stack: stack
    });
}

module.exports = errHandler;