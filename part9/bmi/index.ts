import express = require('express')
import bmiCalculator from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight) {
    res.send({
      error: 'malformatted parameters',
    })
  }

  const bmi = bmiCalculator(height, weight)
  res.send({
    weight,
    height,
    bmi,
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
