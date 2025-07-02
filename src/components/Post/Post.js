import React from "react";
import styles from "./Post.module.css";
import PostRating from "./PostRating";

const Post = ({ post }) => {
  console.log("Post content:", post);
  return (
    <div className={styles.posts}>
      <div className={styles.post}>
        <div className={styles.rating}>
          <PostRating rating={post.rating} />
        </div>
        <div className={styles.postTitle}>
          <div>{post.post}</div>
          <img src={post.image} alt="reddit image" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Post;
