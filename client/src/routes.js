import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import CreateBook from "./components/CreateBook";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "home", element: <Home /> },
      { path: "create", element: <CreateBook /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile", element: <Profile /> },
      { path: "user-profile/:userId", element: <UserProfile /> },
    ],
  },
]);
