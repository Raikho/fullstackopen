const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { initialAuthors, initialBooks, tryGQL } = require('./utils')
const Author = require('./models/author')
const Book = require('./models/book')

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
  })
  .catch(err => console.log('error connecting to MongoDB:', err.message))

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(name: String, setBornTo: Int): Author
  }
`

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
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          author.save()
        }
        const book = new Book({ ...args, author: author.id })
        return await book.save()
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
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        return author.save()
      } catch (error) {
        throw new GraphQLError('Saving new author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    editAuthor: async (root, args) => {
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
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
