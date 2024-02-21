import { Request } from 'express'

export interface bmiStats {
  // TODO: remove export and references
  cm: number
  kg: number
}

export type BmiReqHandler = Request<
  {},
  {},
  {},
  { height: string; weight: string }
>

export const parseBmiQuery = (height: string, weight: string): bmiStats => {
  if (!height) throw new Error('Height argument not supplied!')
  if (!weight) throw new Error('Weight argument not supplied!')

  const cm = Number(height)
  const kg = Number(weight)
  if (isNaN(cm) || isNaN(kg)) throw new Error('Arguments were not numbers!')

  return { cm, kg }
}

export const parseBmiCli = (args: string[]): bmiStats => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const cm: number = Number(args[2])
  const kg: number = Number(args[3])
  if (isNaN(cm) || isNaN(kg)) throw new Error('Arguments were not numbers!')

  return { cm, kg }
}
