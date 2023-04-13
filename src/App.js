import React, { useState } from "react";
import AllPosts from "./components/AllPosts";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Post from "./components/Post";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to="/post">Make a Post</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <a href="/">Log Out</a>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <Routes>
          <Route exact path="/" element={<AllPosts />} />
          <Route
            exact
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            exact
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route exact path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
