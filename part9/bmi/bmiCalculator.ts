const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2)
  if (bmi < 18.5) return 'Underweight'
  else if (bmi > 25) return 'Overweight'
  return 'Normal (healthy weight)'
}

console.log(calculateBmi(190, 90))
