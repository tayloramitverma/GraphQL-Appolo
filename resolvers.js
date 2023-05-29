import { users, books } from "./fakeDB.js";
import { randomBytes } from "crypto";

export const resolvers = {
  Query: {
    users: () => users,
    books: () => books,
    user: (_, args) => users.find((user) => user.id === args.id),
    ibook: (_, { id }) => books.filter((book) => book.author === id),
  },
  User: {
    books: (user) => books.filter((book) => book.author === user.id),
  },
  Mutation: {
    signupUser: (_, { userNew }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        ...userNew,
      });
      return users.find((user) => user.id === id);
    },
  },
};
