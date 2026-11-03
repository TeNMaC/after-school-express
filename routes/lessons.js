const express = require('express')
const lessons = require('../data/lessons')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(lessons)
})

module.exports = router