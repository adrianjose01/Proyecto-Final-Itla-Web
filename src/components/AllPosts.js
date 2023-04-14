import { useEffect, useState } from "react";

export default function AllPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = () => {
      fetch("https://itla-31d00-default-rtdb.firebaseio.com/posts.json")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data.reverse());
          props.setpost(data);
        });
    };
    getPosts();
  }, []);

  return (
    <div className="posts_container">
      <h1 className="title">Muro Interactivo</h1>
      <ul className="posts">
        {posts &&
          posts.reverse().map((post) => (
            <li key={post.content}>
              {post.content} <br />
              <b>Created by: {post.fullName}</b>
            </li>
          ))}
      </ul>
    </div>
  );
}
