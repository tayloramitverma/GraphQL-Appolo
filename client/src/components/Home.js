import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../graphqlOperations/queries";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <h1>Loading...</h1>;
  if (error) throw new Error(error);

  return (
    <div className="container">
      {data.books.length === 0 ? (
        <h2>No recods found! </h2>
      ) : (
        data.books.map((book, index) => (
          <blockquote key={index}>
            <h6>{book.title}</h6>
            <Link to={`/user-profile/${book.author._id}`}>
              <p className="right-align">~{book.author.firstName}</p>
            </Link>
          </blockquote>
        ))
      )}
    </div>
  );
}
