import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../graphqlOperations/mutations";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUserInput, { data, loading, error }] = useMutation(SIGNUP_USER);

  if (loading) return <div className="text-center font-bold">Loading...</div>;
  if (error)
    return (
      <div className="text-center font-bold text-red-400">{`Submission error! ${error.message}`}</div>
    );
  if (data && data.user)
    return (
      <div className="text-center font-bold text-green-400">{`${data.user.firstName} Signed Up successfully!`}</div>
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
    <div className="container mx-auto p-8 flex items-center justify-center flex-col mt-8">
      <h5 className="my-4 font-bold">Signup!!</h5>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
          className="outline py-2 px-4 outline-offset-2 outline-slate-200 rounded-md"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
          className="outline py-2 px-4 outline-offset-2 outline-slate-200 rounded-md"
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
          className="outline py-2 px-4 outline-offset-2 outline-slate-200 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
          className="outline py-2 px-4 outline-offset-2 outline-slate-200 rounded-md"
        />
        <button
          className="px-4 py-2 font-semibold text-sm bg-violet-500 text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
