import React from "react";
import {Link} from "react-router-dom";
import {RenderSecure} from "../../util/script/RenderSecure";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";


const Sidebar = (props) => {
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
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color position-fixed" style={{ left: 0, marginTop: "90px" }}>
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
                    <Link to="/schools/add" className="nav-link">
                      <i className="fas fa-angle-right" />
                      Register School
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/schools/view" className="nav-link">
                      <i className="fas fa-angle-right" />
                      View Schools
                    </Link>
                  </li>
                  
                </ul>
              </li>
              
            </RenderSecure>
          
             
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>Students</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/students/register" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Register Student
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/students">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Students</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/students/transfer" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Transfer Student
                    </Link>
                  </li>
                </ul>
              </li>
            
              {/* <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>Contacts</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                <li className="nav-item">
                    <Link className="nav-link" to="/parents/add">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">
                        Register Contact
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/contacts"}>
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Contacts</span>
                    </Link>
                  </li>
                  
                </ul>
              </li> */}
             <li className="nav-item">
                <Link to="/contacts" className="nav-link">
                  <span><b>Contacts</b></span>
                </Link>
              </li>
            <RenderSecure code="SCHOOL-USER-VIEW">
              <li className="nav-item">
                <Link to="/class-groups" className="nav-link">
                  <span><b>Student Groups</b></span>
                </Link>
              </li>
            </RenderSecure >
            <RenderSecure code="ADMIN-VIEW">
            <li className="nav-item">
                <Link to="/call-logs" className="nav-link">
                  <span><b>Call Logs</b></span>
                </Link>
              </li>
              </RenderSecure>
              <li className="nav-item">
                <Link to="/stations" className="nav-link">
                  <span><b>Calling Stations</b></span>
                </Link>
              </li>
            


            <RenderSecure code="ADMIN-VIEW">
            
            <li className="nav-item">
                <Link to="/transactions/all" className="nav-link">
                  <span><b>Transactions</b></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/buzz-cards" className="nav-link">
                  <span><b>Buzz Cards</b></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/statistics" className="nav-link">
                  <span><b>Statistics</b></span>
                </Link>
              </li>
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <span><b>System Users</b></span>
                </Link>
                <ul className="nav sub-group-menu">
                
                <li className="nav-item">
                    <Link to="/booth-assistants" className="nav-link">
                      <i className="fas fa-angle-right" />
                      View Booth Assistants
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/school_admin/view" className="nav-link">
                      <i className="fas fa-angle-right" />
                      View School Admins
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/view" className="nav-link">
                      <i className="fas fa-angle-right" />
                      View System Admins
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
