import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_BY_ID } from "../graphqlOperations/queries";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();

  console.log("userId", userId);
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId,
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) throw new Error(error);

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>{`${data.user.firstName} ${data.user.lastName}`}</h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.user.books.map((book, index) => (
        <blockquote key={index}>
          <h6>{book.title}</h6>
        </blockquote>
      ))}
    </div>
  );
}
