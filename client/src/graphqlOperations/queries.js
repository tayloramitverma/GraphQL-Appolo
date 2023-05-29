import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query GetBooks {
    books {
      title
      author {
        firstName
        _id
      }
    }
  }
`;

export const GET_USER_BOOKS = gql`
  query Myprofile {
    myprofile {
      firstName
      lastName
      email
      books {
        title
        author
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($userId: ID!) {
    user(_id: $userId) {
      firstName
      lastName
      email
      books {
        author
        title
      }
    }
  }
`;
