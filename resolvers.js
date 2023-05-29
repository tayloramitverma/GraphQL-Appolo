import { users, books } from "./fakeDB.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./utils/index.js";

const User = mongoose.model("User");
const Book = mongoose.model("Book");

export const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, args) => await User.findOne({ _id: args._id }),
    books: async () => await Book.find({}).populate("author", "_id, firstName"),
    ibook: async (_, { _id }) => await Book.find({ author: _id }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must logged In!");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    books: async (user) => await Book.find({ author: user._id }),
  },
  Mutation: {
    signupUser: async (_, { userSignup }) => {
      const user = await User.findOne({ email: userSignup.email });
      if (user) {
        throw new Error("User already exist!");
      }

      const hashedPassword = await bcrypt.hash(userSignup.password, 12);

      const newUser = await new User({
        ...userSignup,
        password: hashedPassword,
      });

      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User not exist!");
      }

      const doMatch = await bcrypt.compare(userSignin.password, user.password);

      if (!doMatch) {
        throw new Error("User not exist!");
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return { token };
    },
    createBook: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You must logged In!");

      const newBook = await new Book({
        title: name,
        author: userId,
      });

      newBook.save();

      return "Book created successfully!";
    },
  },
};
