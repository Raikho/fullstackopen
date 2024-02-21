type Operation = 'multiply' | 'add' | 'divide'
interface calcValues {
  a: number
  b: number
}

const parseArguments = (args: string[]): calcValues => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const a: number = Number(process.argv[2])
  const b: number = Number(process.argv[3])
  if (isNaN(a) || isNaN(b)) throw new Error('Arguments were not numbers!')

  return { a, b }
}

export const calculator = (a: number, b: number, op: Operation): number => {
  if (op === 'multiply') return a * b
  else if (op === 'add') return a + b
  else if (op === 'divide') {
    if (b === 0) throw new Error("Can't divide by 0!")
    return a / b
  } else throw new Error('Operation is not multiply, add, or divide!')
}

const printCalculator = (op: Operation) => {
  try {
    const { a, b } = parseArguments(process.argv)
    console.log(`${op} with ${a} and ${b} equals: ${calculator(a, b, op)}`)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) errorMessage += error.message
    console.log(errorMessage)
  }
}

printCalculator('add')
// printCalculator(4, 2, 'multiply')
// printCalculator(4, 2, 'divide')
// printCalculator(4, 0, 'divide')
