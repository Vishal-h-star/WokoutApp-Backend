const mongoose = require('mongoose')

const Dbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`DB Connected: ${mongoose.connection.host}`);
        mongoose.connection.on('error', (err) => console.error(`MongoDb error`, err))

    } catch (err) {
        console.error("Db not connect :", err)
        process.exit(1);
    }
}

module.exports = Dbconnection;