
const express = require('express')
const database = require('../database')

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, phone, items } = req.body

  const validName = typeof name === 'string' &&
    /^[\p{L} ]+$/u.test(name.trim())

  const validPhone = typeof phone === 'string' &&
    /^\d+$/.test(phone)

  const validItems = Array.isArray(items) && items.length > 0 &&
    items.every(item =>
      Number.isInteger(item.lessonId) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    )

  if (!validName || !validPhone || !validItems) {
    return res.status(400).json({ error: 'Invalid order details' })
  }

  try {
    const order = {
      name: name.trim(),
      phone,
      items,
      createdAt: new Date()
    }

    const result = await database.collection('order').insertOne(order)

    res.status(201).json({
      message: 'Order submitted successfully',
      orderId: result.insertedId
    })
  } catch (error) {
    console.error('Failed to save order:', error.message)
    res.status(500).json({ error: 'Failed to save order' })
  }
})

module.exports = router
