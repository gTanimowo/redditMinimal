import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout = ({ nav }) => {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.layoutContainer}>
        <div
          className={isTablet ? styles.contentFullWidth : styles.contentWithNav}
        >
          <Outlet />
        </div>

        {!isTablet && (
          <div className={styles.navSidebar}>
            <Nav navSubreddit={nav} />
          </div>
        )}

        {isTablet && <Nav navSubreddit={nav} />}
      </div>
    </>
  );
};

export default MainLayout;
