import React, { useState } from "react";
import styles from "./PostRating.module.css";
import { IoIosShareAlt } from "react-icons/io";

const Share = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `https://www.reddit.com${post.data.permalink}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      alert("Clipboard not supported");
    }
  };
  return (
    <>
      <button className={styles.rating} onClick={handleCopyLink}>
        <IoIosShareAlt /> {copied ? "copied!" : "share"}
      </button>
    </>
  );
};

export default Share;
