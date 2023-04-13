import React, { useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../FirebaseConfiguration";

export default function Login(props) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = userRef.current.value;
    const pwd = passwordRef.current.value;

    const querySnapshot = await getDocs(collection(firestore, "Usuarios"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    const currentUser = data.filter(
      (user) => user.user === username && user.password === pwd
    );
    if (currentUser) {
      console.log(currentUser);
      props.setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Something went wrong log in into the account, try again!");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
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
