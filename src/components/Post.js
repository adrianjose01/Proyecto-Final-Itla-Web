import React, { useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../FirebaseConfiguration";
import { useNavigate } from "react-router-dom";

export default function Post({ currentUser }) {
  const contentRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const content = contentRef.current.value;
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        content: content,
        fullName: currentUser.fullName,
      });
      navigate("/");
    } catch (err) {
      console.log("Somenting went wrong" + err.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Write something for your post</h2>
      <textarea ref={contentRef} required></textarea>
      <button type="submit">Post</button>
    </form>
  );
}
