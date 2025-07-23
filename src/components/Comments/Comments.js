import React, { useState } from "react";
import styles from "./Comments.module.css";
import SkeletonComment from "./SkeletonComment";
import Comment from "./Comment";

const Comments = ({ comments, loadingComments }) => {
  const [visibleCount, setVisibleCount] = useState(5);


  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className={styles.commentList}>
      {loadingComments ? (
        <SkeletonComment count={5} />
      ) : (
        <>
          {comments.slice(0, visibleCount).map((comment) => (
            <Comment key={comment.data.id} comment={comment.data} />
          ))}
          {visibleCount < comments.length && (
            <button className={styles.loadMore} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
