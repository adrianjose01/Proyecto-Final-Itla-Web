import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const nameRef = useRef();
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [allUsers, setUsers] = useState([]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    const fullname = nameRef.current.value;
    const username = userRef.current.value;
    const pwd = passwordRef.current.value;
    if (fullname === "" || username === "" || pwd === "") {
      alert("Please fill all the fields");
      return;
    }
    const newUsers = [
      ...allUsers,
      { fullname: fullname, user: username, password: pwd },
    ];
    fetch("https://itla-31d00-default-rtdb.firebaseio.com/users.json", {
      method: "PUT",
      body: JSON.stringify(newUsers),
    }).then((res) => {
      console.log("Success!!");
      props.setCurrentUser({
        fullname: fullname,
        user: username,
      });
      props.setIsLoggedIn(true);
      navigate("/");
    });
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler} className="login_form">
        <h1>Sign up</h1>
        <label>
          <span>Enter Your Full Name</span>
          <input ref={nameRef} type="text" />
        </label>
        <label>
          <span>Enter Your Username</span>
          <input ref={userRef} type="text" />
        </label>
        <label>
          <span>Enter Your password</span>
          <input ref={passwordRef} type="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
