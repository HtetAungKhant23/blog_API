const express = require('express');
const errHandler = require('./middlewares/errHandler');
const { corsHandler } = require('./middlewares/corsHandler');

require('dotenv').config();
const dbConnect = require('./configs/dbConnect');

const app = express();

const userRoutes = require('./routes/user/userRoute');
const postRoutes = require('./routes/post/postRoute');
const commentRoutes = require('./routes/comment/commentRoute');
const categoryRoutes = require('./routes/category/categoryRoute');

app.use(express.json());
app.use(corsHandler);

app.use('/api/user', userRoutes);

app.use(errHandler);

const start = async () => {
    try {
        const connected = await dbConnect();
        if (!connected) {
            throw new Error('database connection failed!');
        }
        console.log('DB connected!');
        app.listen(process.env.PORT, () => {
            console.log(`server is running at ${process.env.PORT} ...`);
        });
    } catch (err) {
        console.log("connection error", err);
    }
}

start();