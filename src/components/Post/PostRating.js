import React from "react";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import styles from "./PostRating.module.css";
import { roundRating } from "../../utils/helper";

const PostRating = ({ rating, onUpVote, onDownVote }) => {
  return (
    <div className={styles.rating}>
      <TiArrowUpOutline className={styles.rateUp} onClick={onUpVote} />
      {roundRating(rating)}
      <TiArrowDownOutline className={styles.rateDown} onClick={onDownVote} />
    </div>
  );
};

export default PostRating;
