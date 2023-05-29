import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_BOOKS } from "../graphqlOperations/queries";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { data, loading, error } = useQuery(GET_USER_BOOKS);
  const navigation = useNavigate();
  if (!localStorage.getItem("token")) {
    navigation("/");
  }
  if (loading) return <h1>Loading...</h1>;
  if (error) throw new Error(error);

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.myprofile.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>{`${data.myprofile.firstName} ${data.myprofile.lastName}`}</h5>
        <h6>Email - {data.myprofile.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.myprofile.books.map((book, index) => (
        <blockquote key={index}>
          <h6>{book.title}</h6>
        </blockquote>
      ))}
    </div>
  );
}
