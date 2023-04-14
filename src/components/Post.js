import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Post(props) {
  const contentRef = useRef();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = () => {
      fetch("https://itla-31d00-default-rtdb.firebaseio.com/posts.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        });
    };
    getPosts();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const content = contentRef.current.value;
    console.log(props.currentUser.fullname);
    let newPosts;
    if (posts) {
      newPosts = [
        ...posts,
        { fullName: props.currentUser.fullname, content: content },
      ];
    } else {
      newPosts = [{ fullName: props.currentUser.fullname, content: content }];
    }
    fetch("https://itla-31d00-default-rtdb.firebaseio.com/posts.json", {
      method: "PUT",
      body: JSON.stringify(newPosts),
    }).then((res) => {
      console.log("Success!!");
      navigate("/");
    });
  };

  return (
    <div className="container">
      <form className="login_form">
        <h2>Write something for your post</h2>
        <textarea ref={contentRef} required></textarea>
        <button onClick={submitHandler}>Post</button>
      </form>
    </div>
  );
}
