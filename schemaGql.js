// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    _id:ID!
    firstName:String
    lastName:String
    email:String
    password:String
    books:[Book]
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: ID
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    users:[User]
    user(_id:ID!):User
    books:[BookWithName]
    ibook(_id:ID!):[Book]
    myprofile: User
  }

  type Mutation {
    signupUser(userSignup:signupUserInput!):User
    signinUser(userSignin:signinUserInput!):Token
    createBook(name:String):String
  }

  type Token {
    token:String!
  }

  input signupUserInput {
    firstName:String!
    lastName:String!
    email:String!
    password:String!
  }

  input signinUserInput {
    email:String!
    password:String!
 }

 type BookWithName {
  title:String
  author:IdName
}

type IdName {
  _id: String
  firstName:String
}
`;
