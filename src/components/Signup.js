import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../FirebaseConfiguration";

export default function Signup(props) {
  const nameRef = useRef();
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const fullname = nameRef.current.value;
    const username = userRef.current.value;
    const pwd = passwordRef.current.value;
    if (fullname === "" || username === "" || pwd === "") {
      alert("Please fill all the fields");
      return;
    }
    try {
      const docRef = await addDoc(collection(firestore, "Usuarios"), {
        fullName: fullname,
        user: username,
        password: pwd,
      });
      console.log(docRef);
      navigate("/");
    } catch (err) {
      alert("Something went wrong!!!");
    }

    props.setIsLoggedIn(true);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
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
