import React from "react";
import {Link} from "react-router-dom";
import {RenderSecure} from "../../util/script/RenderSecure";

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
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
        <div className="mobile-sidebar-header d-md-none">
          <div className="header-logo">
            <Link to="index.html">
              <img
                src="./assets/img/logo1.png"
                alt="logo"
                style={{width: "200px", height: "100px"}}
              />
            </Link>
          </div>
        </div>
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <Link to="#" className="nav-link">
                <i className="flaticon-dashboard" />
                <span>Dashboard</span>
              </Link>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <Link to="index.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="index3.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="index4.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Parents
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <Link to="#" className="nav-link">
                <i className="flaticon-classmates" />
                <span>Schools</span>
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

            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <Link to="#" className="nav-link">
                <i className="flaticon-classmates" />
                <span>School Users</span>
              </Link>
              <ul className="nav sub-group-menu">
             
                <li className="nav-item">
                  <Link to="/schools/user/view" className="nav-link">
                    <i className="fas fa-angle-right" />
                    View Schools Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/schools/user/add" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Add School User
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <Link to="#" className="nav-link">
                <i className="flaticon-classmates" />
                <span>Students</span>
              </Link>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                <Link className="nav-link" to="/students">
                <i className="fas fa-angle-right" />
                <span className="sidemenu-label">View Students</span>
              </Link>
                </li>
                <li className="nav-item">
                  <Link to="student-details.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Student Details
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="admit-form.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Admission Form
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="student-promotion.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Student Promotion
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <Link to="#" className="nav-link">
                <i className="flaticon-couple" />
                <span>Parents</span>
              </Link>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                <Link className="nav-link" to="/parents">
                <i className="fas fa-angle-right" />
                <span className="sidemenu-label">View Parents</span>
              </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/parents/add">
                <i className="fas fa-angle-right" />
                <span className="sidemenu-label">Add Parent</span>
              </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item sidebar-nav-item" onClick={(e) => toggleDropdown(e)}>
              <Link to="#" className="nav-link">
                <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler" />
                <span>Class Group </span>
              </Link>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                <Link className="nav-link" to="/class-groups">
                <i className="fas fa-angle-right" />
                <span className="sidemenu-label">View Class Groups</span>
              </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/class-groups/add">
                <i className="fas fa-angle-right" />
                <span className="sidemenu-label">Add Class Groups</span>
              </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="all-subject.html" className="nav-link">
                <i className="flaticon-open-book" />
                <span>Subject</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="class-routine.html" className="nav-link">
                <i className="flaticon-calendar" />
                <span>Class Routine</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="student-attendence.html" className="nav-link">
                <i className="flaticon-checklist" />
                <span>Attendence</span>
              </Link>
            </li>
            <li className="nav-item sidebar-nav-item">
              <Link to="#" className="nav-link">
                <i className="flaticon-shopping-list" />
                <span>Exam</span>
              </Link>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <Link to="exam-schedule.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Exam Schedule
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="exam-grade.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Exam Grades
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="transport.html" className="nav-link">
                <i className="flaticon-bus-side-view" />
                <span>Transport</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="hostel.html" className="nav-link">
                <i className="flaticon-bed" />
                <span>Hostel</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="notice-board.html" className="nav-link">
                <i className="flaticon-script" />
                <span>Notice</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="messaging.html" className="nav-link">
                <i className="flaticon-chat" />
                <span>Messeage</span>
              </Link>
            </li>
            <li className="nav-item sidebar-nav-item">
              <Link to="#" className="nav-link">
                <i className="flaticon-menu-1" />
                <span>UI Elements</span>
              </Link>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <Link to="notification-alart.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Alart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="button.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Button
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="grid.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Grid
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="modal.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Modal
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="progress-bar.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Progress Bar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="ui-tab.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Tab
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="ui-widget.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Widget
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="map.html" className="nav-link">
                <i className="flaticon-planet-earth" />
                <span>Map</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="account-settings.html" className="nav-link">
                <i className="flaticon-settings" />
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar Area End Here */}
    </>
  );
};

export default Sidebar;
