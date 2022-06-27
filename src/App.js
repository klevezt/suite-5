import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./components/Users/Users";
import { BrowserRouter } from "react-router-dom";
import User from "./components/User/User";

const App = () => {
  const [showOption1, setOption1] = useState(true);
  const [showOption2, setOption2] = useState(false);

  const getUsersHandler = () => {
    setOption1(true);
    setOption2(false);
  };

  const usersPostsHandler = () => {
    setOption1(false);
    setOption2(true);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <div className="text-center my-5">
          <img src="logo.png" alt="" />
        </div>

        <div className="d-flex justify-content-between w-100">
          <div className="sidebar">
            <ul className="list-group">
              <li
                className={`list-group-item ${showOption1 ? "active" : ""}`}
                onClick={getUsersHandler}
              >
                Get All Users
              </li>
              <li
                className={`list-group-item ${showOption2 ? "active" : ""}`}
                onClick={usersPostsHandler}
              >
                Retrieve a user's post
              </li>
            </ul>
          </div>
          <div className="content">
            {showOption1 && <Users />}
            {showOption2 && <User />}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
