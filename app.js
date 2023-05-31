const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/corsErrorHandler');

const app = express();

const userRoutes = require('./routes/user/userRoute');
const postRoutes = require('./routes/post/postRoute');
const commentRoutes = require('./routes/comment/commentRoute');
const categoryRoutes = require('./routes/category/categoryRoute');

app.use(express.json());
app.use(cors);

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/category', categoryRoutes);

app.use(errorHandler);

module.exports = app;