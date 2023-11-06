const info = (...params) => (process.env.NODE_ENV === 'test')
	? null
	: console.log(...params)

const error = (...params) => (process.env.NODE_ENV === 'test')
	? null
	: console.error(...params)

module.exports = { info, error }