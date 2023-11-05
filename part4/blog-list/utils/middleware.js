const logger = require('./logger')

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

	next(err)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}