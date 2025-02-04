// src/App.js
import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import PostDetails from "./pages/Post-detalis";
import Profile from "./pages/Profile";
import Dashboard from "./dashboard/Dashboard";
import "./i18n";

const App = () => {

  const router = createBrowserRouter([
    { path: "/signup", element: <Signup/> },
    { path: "/login", element: <Login /> },

    {
      path: "/",
      element: <Dashboard />,
      children: [
        { path: "/Posts", element: <Posts /> },
        { path: "/posts/:id", element: <PostDetails /> },
        { path: "/profile", element: <Profile /> },
      ],
    },

  ]);
  return (

    <div className="App">
      <RouterProvider router={router} />
    </div>

  );
};

export default App;
