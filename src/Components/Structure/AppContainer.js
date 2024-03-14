import React, {useEffect, useState} from "react";
import Header from "./Header";
import PageHeader from "./PageHeader";
import Sidebar from "./Sidebar";

export default function AppContainer(props) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <>
      <div
        id="wrapper"
        className={`wrapper ${
          isSidebarCollapsed ? "sidebar-collapsed" : "bg-ash"
        }`}>
        {/* Header Menu Area */}
        <Header toggler={toggleSidebar} />

        {/* Page Content */}
        <div className="dashboard-page-one">
          {/* Sidebar Area */}
          <Sidebar />

          <div className="dashboard-content-one">
            {/* Page Header */}
            <PageHeader title={props.title} />

            {/* Render child components */}
            {props.children}

            {/* Footer Area */}
            {/* <footer className="footer-wrap-layout1">
              <div className="copyright">
                © Copyrights <a href="#">Buzz Me</a> 2024. All rights reserved.
              </div>
            </footer> */}
          </div>
        </div>
      </div>
    </>
  );
}
