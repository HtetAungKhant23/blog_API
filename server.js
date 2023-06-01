const server = require('./app');
require('dotenv').config();
const dbConnect = require('./configs/dbConnect');

const start = async () => {
    try {
        console.log('starting...');
        const connected = await dbConnect();
        console.log(connected);
        if (!connected) {
            throw new Error('database connection failed!');
        }
        console.log('DB connected!');
        server.listen(process.env.PORT, () => {
            console.log(`server is running at ${process.env.PORT} ...`);
        });
    } catch (err) {
        console.log('hihi');
        console.log(err.message);
    }
}

start();
