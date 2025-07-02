import React from "react";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          aria-label="Search"
          name="search"
        />
      </form>
    </>
  );
};

export default Search;
