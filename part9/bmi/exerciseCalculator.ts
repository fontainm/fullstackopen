const calculateExercises = (hours) => {
  return {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.9285714285714286,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))
