import React from "react";
import Post from "../Post/Post";

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};
export default Posts;
