import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("login");
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="flex items-center justify-between p-6">
          <div className="">
            <Link
              to="/home"
              className="text-white"
            >
              Book App
            </Link>
          </div>
          <div className="sm:ml-6 sm:block">
            <ul id="nav-mobile" className="flex space-x-4 text-white">
              {token ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/create">Create</Link>
                  </li>
                  <li>
                    <button className="red btn" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
