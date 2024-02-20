import express from 'express'
// import calculateBmi from './bmiCalculator'
import calculateBmiFromQuery from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

interface Query {
  height: string
  weight: string
}

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query as unknown as Query
  const bmiMessage = calculateBmiFromQuery({ height, weight })
  res.send(bmiMessage)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
