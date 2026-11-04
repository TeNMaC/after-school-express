const { MongoClient } = require('mongodb')

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('MongoDB Atlas connected successfully')
  } finally {
    await client.close()
  }
}

testConnection().catch(error => {
  console.error('MongoDB connection failed:', error.message)
  process.exitCode = 1
})