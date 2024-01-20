const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = Book.find({})
      if (args.author) query.find({ author: args.author })
      if (args.genre) query.find({ genres: args.genre })

      return query.exec()
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({})
      return books.reduce(
        (prev, b) => (b.author.equals(root.id) ? prev + 1 : prev),
        0
      )
    },
  },
  Book: {
    author: async root => await Author.findById(root.author),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) authError()

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          author.save()
          pubsub.publish('AUTHOR_ADDED', { authorAdded: author })
        }
        const book = new Book({ ...args, author: author.id })
        await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error,
          },
        })
      }
    },
    addAuthor: async (root, args, context) => {
      if (!context.currentUser) authError()

      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving new author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      pubsub.publish('AUTHOR_ADDED', { authorAdded: author })

      return author
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) authError()

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('Saving author birth date failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const username = args.username
      const favoriteGenre = args.favoriteGenre
      const name = args.name

      const user = new User({ username, name, favoriteGenre })
      return await user.save().catch(err => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            err,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '1234') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        name: user.name,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },
  Subscription: {
    authorAdded: {
      subscribe: () => pubsub.asyncIterator('AUTHOR_ADDED'),
    },
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
