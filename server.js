const server = require('./app');
require('dotenv').config();
const dbConnect = require('./configs/dbConnect');

const start = async () => {
    try {
        const connected = await dbConnect();
        if (connected) {
            console.log('DB connected!');
            server.listen(process.env.PORT, () => {
                console.log(`server is running at ${process.env.PORT} ...`);
            });
        }
        throw new Error('database connection failed!');
    } catch (err) {
        console.log(err.message);
    }
}

start();
