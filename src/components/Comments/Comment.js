import React from "react";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <div className={styles.commentItem}>
      <p className={styles.author}>u/{comment.author}</p>
      <p className={styles.body}>{comment.body}</p>
    </div>
  );
};

export default Comment;
