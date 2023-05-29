import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation CreateUser($userSignup: signupUserInput!) {
    user: signupUser(userSignup: $userSignup) {
      firstName
      lastName
      email
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser($userSignin: signinUserInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($name: String) {
    createBook(name: $name)
  }
`;
