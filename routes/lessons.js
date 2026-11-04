
const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const lessons = await database.collection('lesson')
      .find({}, { projection: { _id: 0 } })
      .sort({ id: 1 })
      .toArray()

    res.json(lessons)
  } catch (error) {
    console.error('Failed to retrieve lessons:', error.message)
    res.status(500).json({ error: 'Failed to retrieve lessons' })
  }
})

module.exports = router
