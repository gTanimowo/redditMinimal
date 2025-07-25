import React, { useState } from "react";
import styles from "./Post.module.css";
import PostRating from "./PostRating";
import Comments from "../Comments/Comments";
import Share from "./Share";
import PostThumbnail from "./PostThumbnail";
import { FaRegComment } from "react-icons/fa";
import { getComments } from "../../utils/data";
import { timeAgo } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpvote, toggleDownvote } from "../../store/VoteSlice";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const imageUrl = post.data?.preview?.images?.[0]?.source?.url;

  const dispatch = useDispatch();
  const postId = post.data.id;
  const redditScore = post.data.score;

  const voteScore = useSelector((state) => state.votes.votes[postId] || 0);
  const displayedScore = redditScore + voteScore;

  const handleUpvote = () => {
    dispatch(toggleUpvote(postId));
  };

  const handleDownvote = () => {
    dispatch(toggleDownvote(postId));
  };

  const handleToggleComments = async () => {
    if (!showComments) {
      setLoadingComments(true);
      const data = await getComments(post.data.subreddit, post.data.id);
      setComments(data || []);
      setLoadingComments(false);
    }
    setShowComments(!showComments);
  };

  return (
    <>
      <hr className={styles.divider} />
      <div className={styles.postCard}>
        <div className={styles.postDetails}>
          <PostThumbnail post={post} />
          <div className={styles.postName}>
            {post.data.subreddit_name_prefixed}
          </div>
          <div className={styles.postTime}>
            {timeAgo(post.data.created_utc)}
          </div>
        </div>
        <div className={styles.postHeader}>
          <h3 className={styles.postTitle}>{post.data.title}</h3>
        </div>

        {imageUrl && (
          <div className={styles.postImage}>
            <img
              src={imageUrl.replace(/&amp;/g, "&")}
              alt={post.data.title}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.postInteractions}>
          <PostRating
            rating={displayedScore}
            onUpVote={handleUpvote}
            onDownVote={handleDownvote}
          />
          <div className={styles.rating} onClick={handleToggleComments}>
            <FaRegComment className={styles.commentIcon} />{" "}
            {post.data.num_comments}
          </div>
          <Share post={post} />
        </div>

        {showComments && (
          <div className={styles.commentsContainer}>
            <Comments comments={comments} loadingComments={loadingComments} />
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
