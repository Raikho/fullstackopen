import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      genres
      published
      id
    }
  }
`
export const GENRE_BOOKS = gql`
  query genreBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      genres
      published
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
    }
  }
`
export const CHANGE_BIRTH_DATE = gql`
  mutation changeBirthDate($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER_INFO = gql`
  query {
    me {
      username
      name
      favoriteGenre
    }
  }
`

export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      name
      born
      bookCount
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      genres
      published
      id
    }
  }
`
