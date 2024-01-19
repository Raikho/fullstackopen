const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { startStandaloneServer } = require('@apollo/server/standalone') // todo: delete

const express = require('express')
const cors = require('cors')
const http = require('http')

const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { initialAuthors, initialBooks, authError } = require('./utils')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

mongoose.set('strictQuery', false)
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('connected to MongoDB')
    await Author.deleteMany({})
    await Book.deleteMany({})
    // await User.deleteMany({})

    const savedAuthors = []
    initialAuthors.forEach(a => {
      const author = new Author({ ...a })
      savedAuthors.push(author)
    })
    savedAuthors.forEach(a => a.save())

    initialBooks.forEach(b => {
      const author = savedAuthors.find(a => a.name === b.author)
      const book = new Book({ ...b, author: author.id })
      book.save()
    })

    const user = await User.findOne({ username: 'bob_smith' })
    if (!user) {
      console.log('no user found, creating user "bob_smith"...')
      const user = new User({
        username: 'bob_smith',
        name: 'Bob Smith',
        favoriteGenre: 'refactoring',
      })
      user.save()
    } else {
      console.log('success, user "bob_smith" found')
    }
  })
  .catch(err => console.log('error connecting to MongoDB:', err.message))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        console.log('authorizing...')
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          const currentUser = await User.findById(decodedToken.id)
          console.log('==> Authorized, current user: ', currentUser.username)
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
