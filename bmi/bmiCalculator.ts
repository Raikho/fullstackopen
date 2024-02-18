const calculateBmi = (cm: number, kg: number): string => {
  const bmi: number = (kg / (cm * cm)) * 100 * 100
  // console.log('bmi calc: ', bmi) // debug

  if (bmi < 16) return 'Underweight (severe thinness)'
  else if (bmi < 17) return 'Underweight (moderate thinness)'
  else if (bmi < 18.5) return 'Underweight (mild thinness'
  else if (bmi < 25) return 'Normal (healthy weight)'
  else if (bmi < 30) return 'Overweight (pre-obese)'
  else if (bmi < 35) return 'Obese (class I)'
  else if (bmi < 40) return 'Obese (class II)'
  else return 'Obese (class III)'
}

console.log(calculateBmi(180, 74))
