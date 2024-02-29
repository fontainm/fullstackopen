const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({})
      const byAuthor = (book) => book.author == args.author
      const byGenre = (book) => book.genres.includes(args.genre)

      let result = books

      if (args.author) {
        result = result.filter(byAuthor)
      }
      if (args.genre) {
        result = result.filter(byGenre)
      }
      return result
    },
    allAuthors: async () => {
      return Author.find({})
    },
  },
  Author: {
    bookCount: async (root) => {
      return 0
      const bookCount = books.filter((book) => book.author === root.name)
      return bookCount.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(root, args)
      let authorId
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        console.log('must save')
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        authorId = newAuthor._id
      } else {
        authorId = author._id
      }
      console.log(authorId)
      const book = new Book({ ...args, author: authorId })

      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
