import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../FirebaseConfiguration";
import { useState } from "react";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "posts"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setPosts(data);
  };
  getData();
  return (
    <div>
      <h1>Muro Interactivo</h1>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.content}>
              {post.content} <br />
              {post.fullName}
            </li>
          ))}
      </ul>
    </div>
  );
}
