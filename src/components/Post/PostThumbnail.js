import React from "react";
import { getValidThumbnail } from "../../utils/helper";
import styles from "./Post.module.css";

const PostThumbnail = ({ post }) => {
  return (
    <div className={styles.postThumbnail}>
      <img
        src={getValidThumbnail(post)}
        alt={post.data.subreddit_name_prefixed}
        className={styles.postThumbnail}
      />
    </div>
  );
};

export default PostThumbnail;
