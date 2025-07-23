import React from "react";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import styles from "./PostRating.module.css";
import { roundRating } from "../../utils/helper";

const PostRating = ({ rating }) => {
  return (
    <div className={styles.rating}>
      <TiArrowDownOutline className={styles.rateDown} />
      {roundRating(rating)}
      <TiArrowUpOutline className={styles.rateUp} />
    </div>
  );
};

export default PostRating;
