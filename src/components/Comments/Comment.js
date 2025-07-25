import React from "react";
import styles from "./Comment.module.css";
import { timeAgo } from "../../utils/helper";

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentInteraction}>
        <p className={styles.author}>u/{comment.author}</p>
        <p className={styles.timePosted}> {timeAgo(comment.created_utc)}</p>
      </div>

      <p className={styles.body}>{comment.body}</p>
    </div>
  );
};

export default Comment;
