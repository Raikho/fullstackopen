import express from 'express'
import calculateBmiFromQuery from './bmiCalculator'
import { BmiReqHandler } from './utils'
import { calculator } from './multiplier'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: BmiReqHandler, res) => {
  const bmiMessage = calculateBmiFromQuery(req.query.height, req.query.weight)

  res.send(bmiMessage)
})

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body

  let value3: any = 1
  value3 = 3

  let value4: any = 3
  value4 = 4

  const result = calculator(value1, value2, op)
  res.send({ result })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
