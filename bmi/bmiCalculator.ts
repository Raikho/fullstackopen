import { parseBmiQuery as parseQuery, parseBmiCli as parseCli } from './utils'

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

const calculateBmiFromQuery = (height: string, weight: string) => {
  try {
    const { cm, kg } = parseQuery(height, weight)
    const bmi = calculateBmi(cm, kg)

    return { weight: kg, height: cm, bmi }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) errorMessage += error.message
    return { error: errorMessage }
  }
}

export default calculateBmiFromQuery

try {
  const { cm, kg } = parseCli(process.argv)
  console.log(calculateBmi(cm, kg))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) errorMessage += error.message
  console.log(errorMessage)
}
