const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
	.then(() => logger.info('connected to MongoDB'))
	.catch(err => logger.error('error connecting to MongoDB:', err.message))


app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app