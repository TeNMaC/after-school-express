
const express = require('express')
const path = require('path')
const cors = require('cors')
const lessonsRouter = require('./routes/lessons')
const ordersRouter = require('./routes/orders')
const teachersRouter = require('./routes/teachers')
const enrolmentRouter = require('./routes/enrolment')
const logger = require('./middleware/logger')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/lessons', lessonsRouter)
app.use('/orders', ordersRouter)
app.use('/teachers', teachersRouter)
app.use('/enrolment', enrolmentRouter)

app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'After School Lessons API'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
