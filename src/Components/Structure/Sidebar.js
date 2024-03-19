import React, { useContext } from "react";
import {Link} from "react-router-dom";
import {RenderSecure} from "../../util/script/RenderSecure";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../Context/AuthContext";


const Sidebar = (props) => {
  const {user} = useContext(AuthContext);
  const toggleDropdown = (e) => {
    // e.preventDefault();
    // Toggle the "show" class on the main menu item
    if (e.target.parentElement.classList.contains("show ")) {
      e.target.parentElement.classList.remove("show");
    } else {
      e.target.parentElement.classList.add("show");
    }

    // Display submenu items as blocks
    const submenu = e.target.nextElementSibling;
    if (submenu) {
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    }
    // submenu.classList.contains("show");
  };
  return (
    <>
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
        <div className="mobile-sidebar-header d-md-none">
          <div className="header-logo">
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
                alt="Logo"
                style={{width: "200px", height: "100px"}}
              />
            </Link>
          </div>
        </div>
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span><b>Dashboard</b></span>
              </Link>
            </li>

            <RenderSecure code="ADMIN-VIEW">
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>Schools</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/schools/view" className="nav-link">
                      <i className="fas fa-angle-right" />
                      View Schools
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/schools/add" className="nav-link">
                      <i className="fas fa-angle-right" />
                      Add School
                    </Link>
                  </li>
                </ul>
              </li>
            </RenderSecure>

            <RenderSecure code="SCHOOL-USER-VIEW">
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>Students</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/students/add" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Add Student
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={`/students/${user.school_user?.school?.school_id}`}>
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Students</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </RenderSecure>
            <RenderSecure code="SCHOOL-USER-VIEW">
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>Parents</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to={`/parents/${user.school_user?.school?.school_id}`}>
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Parents</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/parent/requests">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">
                        View Parent Requests
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </RenderSecure>

            <RenderSecure code="SCHOOL-USER-VIEW">
              <li className="nav-item">
                <Link to="/class-groups" className="nav-link">
                  <span><b>Student Groups</b></span>
                </Link>
              </li>
            </RenderSecure>

            <RenderSecure code="ADMIN-VIEW">
              <li className="nav-item">
                <Link to="/Districts/view" className="nav-link">
                  <span><b>Districts</b></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/regions/view" className="nav-link">
                  <span><b>Regions</b></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rate/view" className="nav-link">
                  <span><b>Charge Rates</b></span>
                </Link>
              </li>
              </RenderSecure>
              <li className="nav-item">
                <Link to="/stations" className="nav-link">
                  <span><b>Calling Stations</b></span>
                </Link>
              </li>
            


            <RenderSecure code="ADMIN-VIEW">
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>School Administrators</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/Admin/addSchoolUser" className="nav-link">
                      <i className="fas fa-angle-right" />
                      Add School Admin
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/Admin/user/view" className="nav-link">
                      <i className="fas fa-angle-right" />
                      View School Admins
                    </Link>
                  </li>
                </ul>
              </li>
            </RenderSecure>
          </ul>
        </div>
      </div>
      {/* Sidebar Area End Here */}
    </>
  );
};

export default Sidebar;
