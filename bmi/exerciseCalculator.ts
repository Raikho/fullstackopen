interface exerciseStats {
  target: number
  hours: number[]
}

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseExerciseArgs = (args: string[]): exerciseStats => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 31) throw new Error('Too many arguments')

  const target: number = Number(args[2])
  const hours: number[] = args.slice(3, args.length).map(s => Number(s))
  return { target, hours }
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length
  const trainingDays: number = hours.reduce(
    (prev, cur) => (cur > 0 ? prev + 1 : prev),
    0
  )
  const total: number = hours.reduce((prev, cur) => prev + cur, 0)
  const average: number = total / periodLength
  const success: boolean = average >= target

  let rating: number
  let ratingDescription: string

  if (average >= target) {
    rating = 3
    ratingDescription = 'goal surpassed, keep it up'
  } else if (average > target / 2) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'falling behind, work harder in the future'
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

try {
  const { target, hours } = parseExerciseArgs(process.argv)
  console.log(calculateExercises(hours, target))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) errorMessage += error.message
  console.log(errorMessage)
}
