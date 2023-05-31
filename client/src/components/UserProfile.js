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

  if (loading) return <h1 className="text-center font-bold">Loading...</h1>;
  if (error) throw new Error(error);

  return (
    <div className="container items-center mx-auto p-8 flex justify-center flex-col mt-8">
      <div className="relative rounded-xl overflow-auto p-8 w-full md:w-2/4">
        <div className="overflow-visible relative max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5">
          <img
            alt=""
            className="bg-white absolute -left-6 w-24 h-24 rounded-full shadow-lg"
            src={`https://robohash.org/${data.user.firstName}.png?size=200x200&set=set4`}
          />
          <div className="flex flex-col py-5 pl-24">
            <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
              {`${data.user.firstName} ${data.user.lastName}`}
            </strong>
            <span className="text-slate-500 text-sm font-medium dark:text-slate-400">
              {data.user.email}
            </span>
          </div>
        </div>
      </div>
      <h3 className="mb-4 font-bold">Your Books</h3>
      {data.user.books.map((book, index) => (
        <blockquote
          key={index}
          className="list-disc flex justify-between items-center p-4 bg-slate-50 mb-2 w-full md:w-2/4"
        >
          <h6>{book.title}</h6>
        </blockquote>
      ))}
    </div>
  );
}
