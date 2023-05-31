import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../graphqlOperations/queries";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <h1 className="text-center font-bold">Loading...</h1>;
  if (error) throw new Error(error);

  return (
    <div className="container mx-auto p-8 flex items-center justify-center flex-col mt-8">
      {data.books.length === 0 ? (
        <h2 className="mb-4 font-bold">No recods found! </h2>
      ) : (
        data.books.map((book, index) => (
          <blockquote key={index} className="flex justify-between items-center p-4 bg-slate-50 mb-2 w-full md:w-2/4">
            <h6>{book.title}</h6>
            <Link to={`/user-profile/${book.author._id}`} className="text-blue-400 font-bold">
              <p className="right-align">~{book.author.firstName}</p>
            </Link>
          </blockquote>
        ))
      )}
    </div>
  );
}
