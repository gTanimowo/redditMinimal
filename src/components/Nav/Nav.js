import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import PostThumbnail from "../Post/PostThumbnail";

const Nav = ({ navSubreddit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {isTablet && (
        <button
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={toggleNav}
          className={styles.navBurgerBtn}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      )}


      <nav
        className={`${styles.nav} ${
          isTablet ? (isOpen ? styles.navOpen : styles.navClosed) : ""
        }`}
      >
        <div className={styles.navTitle}>
          <h2>Subreddits</h2>
        </div>
        <ul>
          {navSubreddit.map((sub, index) => (
            <NavLink
              key={index}
              to={`/r/${sub.data.display_name}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navItem} ${styles.activeNav}`
                  : styles.navItem
              }
              onClick={() => isTablet && setIsOpen(false)}
            >
              <li className={styles.navList}>
                <PostThumbnail post={sub} />
                <span className={styles.navText}>{sub.data.display_name}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
