import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemaGql.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { DATABASE_URI, JWT_SECRET } from "./utils/index.js";

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongodb connected!");
});

mongoose.connection.on("error", () => {
  throw new Error("mongodb connected!");
});

import "./models/User.js";
import "./models/Book.js";
import { resolvers } from "./resolvers.js";
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: ({ req }) => {
    // Get the user token from the headers.
    const { authorization } = req.headers;

    if (authorization) {
      const { userId } = jwt.verify(authorization, JWT_SECRET);
      return { userId };
    }
  },
});

console.log(`🚀  Server ready at: ${url}`);
