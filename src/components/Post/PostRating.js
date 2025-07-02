import React from "react";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";
import styles from "./Post.module.css";

const PostRating = ({ rating }) => {
  console.log(rating);
  return (
    <>
      <TiArrowDownOutline />
      {rating}
      <TiArrowUpOutline />
    </>
  );
};

export default PostRating;
