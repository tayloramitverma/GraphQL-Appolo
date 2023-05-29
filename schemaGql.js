// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id:ID!
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
    books:[Book]
    user(id:ID!):User
    ibook(id:ID!):[Book]
  }

  type Mutation {
    signupUser(userNew:userInput!):User
  }

  input userInput{
     firstName:String!
     lastName:String!
     email:String!
     password:String!
  }
`;
