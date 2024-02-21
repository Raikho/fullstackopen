import express from 'express'
import calculateBmiFromQuery from './bmiCalculator'
import { BmiReqHandler } from './utils'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: BmiReqHandler, res) => {
  const bmiMessage = calculateBmiFromQuery(req.query.height, req.query.weight)

  res.send(bmiMessage)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
