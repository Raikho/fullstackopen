import { bmiStats as stats } from './utils'

import { parseBmiQuery as parseQuery } from './utils'

const parseArgs = (args: string[]): stats => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const cm: number = Number(args[2])
  const kg: number = Number(args[3])
  if (isNaN(cm) || isNaN(kg)) throw new Error('Arguments were not numbers!')

  return { cm, kg }
}

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

try {
  const { cm, kg } = parseArgs(process.argv)
  console.log(calculateBmi(cm, kg))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) errorMessage += error.message
  console.log(errorMessage)
}

const calculateBmiFromQuery = (query: { height: string; weight: string }) => {
  try {
    console.log(query) // debug
    const { cm, kg } = parseQuery(query)
    const bmi = calculateBmi(cm, kg)

    return { weight: kg, height: cm, bmi }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) errorMessage += error.message
    return { error: errorMessage }
  }
}

export default calculateBmiFromQuery
