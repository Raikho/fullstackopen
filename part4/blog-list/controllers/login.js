const loginRouter = require('express').Router()
const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body

	const user = await User.findOne({ username })
	const isPassCorrect = (user !== null)
		? await brcypt.compare(password, user.passwordHash)
		: false

	if (!user || !isPassCorrect) {
		return res.status(401).json({
			error: 'invalid username or password'
		})
	}
	const userForToken = {
		username: user.username,
		id: user._id
	}
	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		// { expiresIn: 60*60 } // todo
	)

	res
		.status(200)
		.send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter