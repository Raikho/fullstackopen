import express from 'express';
import calculateBmiFromQuery from './bmiCalculator';
import { BmiReqHandler } from './utils';
import { calculator, Operation } from './multiplier';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: BmiReqHandler, res) => {
  const bmiMessage = calculateBmiFromQuery(req.query.height, req.query.weight);

  res.send(bmiMessage);
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || !value2 || isNaN(Number(value1)) || isNaN(Number(value2)))
    return res.status(400).send({ error: '...' });

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const hours = daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const out = calculateExercises(daily_exercises, target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return res.send({ hours, target, out });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
