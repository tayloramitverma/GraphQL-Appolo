import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_BOOK } from "../graphqlOperations/mutations";

export default function CreateBook() {
  const [book, setBook] = useState("");
  const [createBook, { loading, error, data }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["GetBooks", "Myprofile"],
  });

  if (loading) return <div className="text-center font-bold">Loading...</div>;
  if (error)
    return (
      <div className="text-center font-bold text-red-400">{`Submission error! ${error.message}`}</div>
    );
  if (data && data.createBook)
    return <div className="text-center font-bold text-green-400">{`${data.createBook}!`}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    createBook({
      variables: {
        name: book,
      },
    });
  };
  return (
    <div className="container mx-auto p-8 flex items-center justify-center flex-col mt-8">
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
        <input
          type="text"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          placeholder="write your book here"
          className="outline py-2 px-4 outline-offset-2 outline-slate-200 rounded-md"
          required
        />
        <button className="px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-300">create</button>
      </form>
    </div>
  );
}
