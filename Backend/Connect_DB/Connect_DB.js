const dotenv = require('dotenv')
dotenv.config();

const mongoose = require('mongoose')

const Connect_DB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_DB)
        console.log(`MongoDB is Connected `)

    } catch (err) {
        console.log('Not Connected')
        return err
    }
}
module.exports = Connect_DB