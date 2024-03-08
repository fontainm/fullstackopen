import { isNotNumber } from './utils'

interface Exercise {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Exercise => {
  const periodLength = hours.length
  const trainingDays = hours.filter((hour) => hour > 0).length
  const sum = hours.reduce((a, b) => a + b, 0)
  const average = sum / periodLength
  const success = average > target
  let rating = 0
  let ratingDescription = ''
  const diff = average - target
  if (diff > 0) {
    rating = 1
    ratingDescription = 'thats good!'
  } else if (diff > -0.5) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'do more!'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

const target: number = Number(process.argv[2])
const hours: Array<number> = []

process.argv.map((val, index) => {
  if (index > 2) {
    if (isNotNumber(Number(val))) {
      throw new Error('Invalid argument, must provide only numbers')
    }
    hours.push(Number(val))
  }
})

try {
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '

  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
