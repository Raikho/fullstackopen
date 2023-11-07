const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
	const { username, name, password } = req.body
	const result = validatePassword(password)
	if (!result.isValid)
		return res.status(400).json(result.body)

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({ username, name, passwordHash })
	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

const validatePassword = password =>  {
	let error = ''
	let isValid = false
	const minLength = 3

	if (!password)
		error = 'Password validation failed: Password is required'
	else if (password.length < minLength)
		error = `Password validation failed: Password must be at least ${minLength} characters long`
	else
		isValid = true

	return { body: { error }, isValid }
}

module.exports = userRouter