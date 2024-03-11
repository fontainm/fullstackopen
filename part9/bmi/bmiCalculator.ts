const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2)
  if (bmi < 18.5) return 'Underweight'
  else if (bmi > 25) return 'Overweight'
  return 'Normal (healthy weight)'
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))

export default calculateBmi
