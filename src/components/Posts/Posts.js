import React from "react";
import Post from "../Post/Post";

const Posts = ({ timeline }) => {
  return (
    <div>
      {timeline.map((post, index) => (
        <div key={index}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};
export default Posts;
