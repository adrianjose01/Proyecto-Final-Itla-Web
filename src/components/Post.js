import React from "react";

export default function Post() {
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <h2>Write something for your post</h2>
      <textarea required></textarea>
      <button type="submit">Post</button>
    </form>
  );
}
