const express = require('express')
const lessonsRouter = require('./routes/lessons')

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/api/lessons', lessonsRouter)

app.get('/', (req, res) => {
  res.send('After School Lessons API is running')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})