import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    const getPosts = () => {
      fetch("https://itla-31d00-default-rtdb.firebaseio.com/users.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            setUsers(data);
          }
        });
    };
    getPosts();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const pwd = passwordRef.current.value;

    const currentUser = allUsers.filter(
      (user) => user.user === username && user.password === pwd
    );
    if (currentUser) {
      console.log(currentUser);
      props.setIsLoggedIn(true);
      console.log(currentUser);
      props.setCurrentUser({
        fullname: currentUser[0].fullname,
        user: currentUser[0].user,
      });
      navigate("/");
    } else {
      alert("Something went wrong log in into the account, try again!");
    }
  };
  return (
    <div className="container">
      <h1>Log In</h1>
      <form onSubmit={submitHandler} className="login_form">
        <label>
          <span>Enter Your Username</span>
          <input required ref={userRef} type="text" />
        </label>
        <label>
          <span>Enter Your password</span>
          <input required ref={passwordRef} type="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
