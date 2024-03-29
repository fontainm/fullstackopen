import express = require('express')
import bmiCalculator from './bmiCalculator'
import { calculateExercises, ExerciseHours } from './exerciseCalculator'
import { isNotNumber } from './utils'

const app = express()

app.use(express.json())

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

app.post('/exercises', (req, res): any => {
  const params = req.body as ExerciseHours
  const dailyExercises = params.daily_exercises
  const target = params.target

  if (!dailyExercises || !target) {
    return res.status(400).send({
      error: 'parameters missing',
    })
  }

  if (!dailyExercises.length || isNotNumber(target)) {
    return res.status(400).send({
      error: 'malformatted parameters',
    })
  }

  const response = calculateExercises(dailyExercises, target)
  res.send(response)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
