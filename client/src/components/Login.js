import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { SIGNIN_USER } from "../graphqlOperations/mutations";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { data, loading, error }] = useMutation(SIGNIN_USER);

  if (loading) return <div className="text-center font-bold">Loading...</div>;
  if (error)
    return (
      <div className="text-center font-bold text-red-400">{`Submission error! ${error.message}`}</div>
    );
  if (data && data.user) {
    localStorage.setItem("token", data.user.token);
    navigate("/home");
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
    <div className="container mx-auto p-8 flex items-center justify-center flex-col mt-8">
      <h5 className="my-4 font-bold">Login!!</h5>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          Login
        </button>
      </form>
    </div>
  );
}
