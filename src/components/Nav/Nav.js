import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";

const navObjects = [
  "Home",
  "Askreddit",
  "NoStupidQuestions",
  "facepalm",
  "interesting",
];

const Nav = () => {
  const [toggle, setToggle] = useState(true);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => setToggle(!toggle);

  const NavBar = () => {
    return (
      <div className={styles.nav}>
        <div className={styles.navTitle}>
          <h2>Subreddits</h2>
          {isTablet && (
            <p
              tabIndex={0}
              role="button"
              onClick={handleToggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleToggle();
              }}
            >
              ✖
            </p>
          )}
        </div>

        <ul>
          {navObjects.map((item, index) => (
            <li key={index}>
              <Link to={`${item}`} className={styles.navLink}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Burger button JSX
  const BurgerSign = () => {
    return (
      <button
        onClick={handleToggle}
        aria-label="Open navigation menu"
        className={styles.navBurgerBtn}
      >
        ☰
      </button>
    );
  };

  return (
    <>
      {!isTablet && <NavBar />}

      {isTablet && (toggle ? <NavBar /> : <BurgerSign />)}
    </>
  );
};

export default Nav;
