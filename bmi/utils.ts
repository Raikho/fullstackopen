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

export const parseBmiQuery = (query: {
  height: string
  weight: string
}): bmiStats => {
  if (!query.height) throw new Error('Height argument not supplied!')
  if (!query.weight) throw new Error('Weight argument not supplied!')

  const cm = Number(query.height)
  const kg = Number(query.weight)
  if (isNaN(cm) || isNaN(kg)) throw new Error('Arguments were not numbers!')

  return { cm, kg }
}
