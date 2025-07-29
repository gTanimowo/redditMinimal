import React from "react";
import Search from "../Search/Search";
import logo from "../../assets/redditLogo.png";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="reddit logo" className={styles.logo} />
        </Link>
        <p>
          <span>Reddit</span>Minimal
        </p>
      </div>

      <Search />
    </div>
  );
};

export default Header;
