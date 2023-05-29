import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SIGNIN_USER } from "../graphqlOperations/mutations";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { data, loading, error }] = useMutation(SIGNIN_USER);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="red card-panel">{`Submission error! ${error.message}`}</div>
    );
  if (data && data.user) {
    localStorage.setItem("token", data.user.token);
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
