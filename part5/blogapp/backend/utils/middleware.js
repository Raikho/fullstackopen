const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Path  :', req.path)
	logger.info('Body  :', req.body)
	logger.info('---')
	next()
}

// const morgan = require('morgan')
// const requestLogger = morgan(function (tokens, req, res) {
// 	const body = JSON.stringify(req.body)
// 	return [
// 		tokens.method(req, res),
// 		tokens.url(req, res),
// 		tokens.status(req, res),
// 		tokens.res(req, res, 'content-length'), '-',
// 		tokens['response-time'](req, res), 'ms',
// 		body === '{}' ? null : body,
// 	].join(' ')
// })

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
	logger.error(err.message)

	if (err.name === 'CastError')
		return res.status(400).send({ error: 'malformatted id' })
	else if (err.name === 'ValidationError')
		return res.status(400).json({ error: err.message })
	else if (err.name === 'JsonWebTokenError')
		return res.status(401).json({ error: 'invalid token' })
	else if (err.name === 'TokenExpiredError')
		return res.status(401).json({ error: 'expired token' })

	next(err)
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')
	if (auth && auth.startsWith('Bearer '))
		req.token = auth.replace('Bearer ', '')
	else req.token = null
	next()
}

const userExtractor = async (req, res, next) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken.id) {
		res.status(401).json({ error: 'token invalid' })
		return next()
	}
	const user = await User.findById(decodedToken.id)
	if (!user) {
		res.status(404).json({ error: 'user with token not found' })
		return next()
	}
	req.user = user
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
}