
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

const editableFields = [
  'topic','location','price','space','icon','image','currency'
]

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const updates = req.body
  const fields = updates && typeof updates === 'object' &&
    !Array.isArray(updates) ? Object.keys(updates) : []

  if (!Number.isInteger(id) || id < 1 ||
      fields.length === 0 ||
      fields.some(field => !editableFields.includes(field))) {
    return res.status(400).json({ error: 'Invalid lesson update' })
  }

  if ('space' in updates &&
      (!Number.isInteger(updates.space) || updates.space < 0)) {
    return res.status(400).json({ error: 'Invalid spaces' })
  }

  if ('price' in updates &&
      (typeof updates.price !== 'number' ||
       !Number.isFinite(updates.price) || updates.price < 0)) {
    return res.status(400).json({ error: 'Invalid price' })
  }

  if (fields.some(field => !['price', 'space'].includes(field) &&
      (typeof updates[field] !== 'string' || !updates[field].trim()))) {
    return res.status(400).json({ error: 'Invalid lesson field' })
  }

  try {
    const lesson = await database.collection('lesson').findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after', projection: { _id: 0 } }
    )

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    res.json(lesson)
  } catch (error) {
    console.error('Failed to update lesson:', error.message)
    res.status(500).json({ error: 'Failed to update lesson' })
  }
})
module.exports = router
