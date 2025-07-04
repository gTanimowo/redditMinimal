import React from "react";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1 1 75%" }}>
          <Outlet />
        </div>
        <div style={{ flex: "0 0 25%" }}>
          <Nav />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
