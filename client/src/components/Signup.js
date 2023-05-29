import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../graphqlOperations/mutations";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUserInput, { data, loading, error }] = useMutation(SIGNUP_USER);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="red card-panel">{`Submission error! ${error.message}`}</div>
    );
  if (data && data.user)
    return (
      <div className="green card-panel">{`${data.user.firstName} Signed Up successfully!`}</div>
    );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signupUserInput({
      variables: {
        userSignup: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      <h5>Signup!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
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
          Submit
        </button>
      </form>
    </div>
  );
}
