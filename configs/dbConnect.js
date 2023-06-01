const mongoose = require('mongoose');

const dbConnect = () => {
    console.log('hay');
    return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = dbConnect;