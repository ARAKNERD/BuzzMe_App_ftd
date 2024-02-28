import React, {useEffect, useState} from "react";

import Header from "./Header";
import PageHeader from "./PageHeader";
import Sidebar from "./Sidebar";

export default function AppContainer(props) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 500);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };
  return (
    <>
      {/* Preloader Start Here */}
      {/* <div id="preloader" /> */}
      {/* Preloader End Here */}
      <div
        id="wrapper"
        className={`wrapper ${
          isSidebarCollapsed ? "sidebar-collapsed" : "bg-ash"
        }`}>
        {/* Header Menu Area Start Here */}
        <Header toggler={toggleSidebar} />
        {/* Header Menu Area End Here */}
        {/* Page Area Start Here */}
        <div className="dashboard-page-one">
          {/* Sidebar Area Start Here */}
          <Sidebar />
          {/* Sidebar Area End Here */}
          <div className="dashboard-content-one">
            {/* Breadcubs Area Start Here */}
            <PageHeader title={props.title} />
            {/* <PageHeader title={props.title} /> --------------------------------- */}

            {/* Breadcubs Area End Here */}
            {props.children}

            {/* Footer Area Start Here */}
            <footer className="footer-wrap-layout1">
              <div className="copyright">
                © Copyrights <a href="#">Buzz Me</a> 2024. All rights reserved.
                {/* Designed by <a href="#">PsdBosS</a> */}
              </div>
            </footer>
            {/* Footer Area End Here */}
          </div>
        </div>
        {/* Page Area End Here */}
      </div>
    </>
  );
}
