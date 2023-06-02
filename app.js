const express = require('express');
const errHandler = require('./middlewares/errHandler');
const { corsHandler } = require('./middlewares/corsHandler');

const app = express();

const userRoutes = require('./routes/user/userRoute');
const postRoutes = require('./routes/post/postRoute');
const commentRoutes = require('./routes/comment/commentRoute');
const categoryRoutes = require('./routes/category/categoryRoute');

app.use(express.json());
app.use(corsHandler);

app.use('/api/user', userRoutes);

app.use(errHandler);

module.exports = app;