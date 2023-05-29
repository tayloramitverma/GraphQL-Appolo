import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_BOOK } from "../graphqlOperations/mutations";

export default function CreateBook() {
  const [book, setBook] = useState("");
  const [createBook, { loading, error, data }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["GetBooks", "Myprofile"],
  });

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="red card-panel">{`Submission error! ${error.message}`}</div>
    );
  if (data && data.createBook)
    return <div className="green card-panel">{`${data.createBook}!`}</div>;

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
    <div className="container my-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={book}
          onChange={(e) => setBook(e.target.value)}
          placeholder="write your book here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
