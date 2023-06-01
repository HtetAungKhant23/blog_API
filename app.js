const express = require('express');

const app = express();

const userRoutes = require('./routes/user/userRoute');
const postRoutes = require('./routes/post/postRoute');
const commentRoutes = require('./routes/comment/commentRoute');
const categoryRoutes = require('./routes/category/categoryRoute');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,PATCH,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
});

app.use('/api/user', userRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    });
});

module.exports = app;