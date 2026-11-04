
const express = require('express')
const path = require('path')
const lessonsRouter = require('./routes/lessons')
const logger = require('./middleware/logger')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(logger)
app.use('/lessons',lessonsRouter)

app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.use('/images', (req, res) => {
  res.status(404).send('Image not found')
})

app.use('/api/lessons', lessonsRouter)

app.get('/', (req, res) => {
  res.send('After School Lessons API is running')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
