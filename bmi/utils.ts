export interface bmiStats {
  // TODO: remove export and references
  cm: number
  kg: number
}

export const parseBmiQuery = (query: {
  height: string
  weight: string
}): bmiStats => {
  const cm = Number(query.height)
  const kg = Number(query.weight)
  if (isNaN(cm) || isNaN(kg)) throw new Error('Arguments were not numbers!')

  return { cm, kg }
}
