const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI)
const database = client.db('after_school')

module.exports = database