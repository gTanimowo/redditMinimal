import React from "react";
import styles from "./SkeletonComment.module.css";

const SkeletonComment = ({ count = 5 }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeletonComment}>
          <div className={styles.skeletonAuthor}></div>
          <div className={styles.skeletonBody}></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComment;
