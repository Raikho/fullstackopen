interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
