const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { initialAuthors, initialBooks } = require('./utils')
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
    initialAuthors.forEach(async a => {
      const author = new Author({ ...a })
      author.save()
    })
    initialBooks.forEach(async b => {
      const book = new Book({ ...b })
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
    published: Int
    author: String!
    genres: [String]!
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
      published: Int
      author: String!
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

      return await query.exec()
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    name: root => root.name,
    born: root => root.born,
    id: root => root.id,
    bookCount: async root => {
      const books = await Book.find({})
      return books.reduce(
        (prev, b) => prev + (b.author === root.name ? 1 : 0),
        0
      )
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({})
      if (!authors.map(a => a.name).includes(args.author)) {
        const newAuthor = new Author({ name: args.author })
        newAuthor.save()
      }

      const book = new Book({ ...args })
      return book.save()
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      return author.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
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
