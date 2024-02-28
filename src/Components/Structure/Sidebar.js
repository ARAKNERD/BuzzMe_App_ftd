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
            <a href="index.html">
              <img
                src="./assets/img/logo1.png"
                alt="logo"
                style={{width: "200px", height: "100px"}}
              />
            </a>
          </div>
        </div>
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <a href="#" className="nav-link">
                <i className="flaticon-dashboard" />
                <span>Dashboard</span>
              </a>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <a href="index.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Admin
                  </a>
                </li>
                <li className="nav-item">
                  <a href="index3.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Students
                  </a>
                </li>
                <li className="nav-item">
                  <a href="index4.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Parents
                  </a>
                </li>
              </ul>
            </li>

            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <a href="#" className="nav-link">
                <i className="flaticon-classmates" />
                <span>Students</span>
              </a>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                <Link className="nav-link" to="/students">
                <i className="fas fa-angle-right" />
                <span className="sidemenu-label">View Students</span>
              </Link>
                </li>
                <li className="nav-item">
                  <a href="student-details.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Student Details
                  </a>
                </li>
                <li className="nav-item">
                  <a href="admit-form.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Admission Form
                  </a>
                </li>
                <li className="nav-item">
                  <a href="student-promotion.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Student Promotion
                  </a>
                </li>
              </ul>
            </li>

            <li
              className="nav-item sidebar-nav-item"
              onClick={(e) => toggleDropdown(e)}>
              <a href="#" className="nav-link">
                <i className="flaticon-couple" />
                <span>Parents</span>
              </a>
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

            <li className="nav-item sidebar-nav-item">
              <a href="#" className="nav-link">
                <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler" />
                <span>Class Group </span>
              </a>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <a href="all-class.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    All Classes
                  </a>
                </li>
                <li className="nav-item">
                  <a href="add-class.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Add New Class
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="all-subject.html" className="nav-link">
                <i className="flaticon-open-book" />
                <span>Subject</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="class-routine.html" className="nav-link">
                <i className="flaticon-calendar" />
                <span>Class Routine</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="student-attendence.html" className="nav-link">
                <i className="flaticon-checklist" />
                <span>Attendence</span>
              </a>
            </li>
            <li className="nav-item sidebar-nav-item">
              <a href="#" className="nav-link">
                <i className="flaticon-shopping-list" />
                <span>Exam</span>
              </a>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <a href="exam-schedule.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Exam Schedule
                  </a>
                </li>
                <li className="nav-item">
                  <a href="exam-grade.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Exam Grades
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="transport.html" className="nav-link">
                <i className="flaticon-bus-side-view" />
                <span>Transport</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="hostel.html" className="nav-link">
                <i className="flaticon-bed" />
                <span>Hostel</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="notice-board.html" className="nav-link">
                <i className="flaticon-script" />
                <span>Notice</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="messaging.html" className="nav-link">
                <i className="flaticon-chat" />
                <span>Messeage</span>
              </a>
            </li>
            <li className="nav-item sidebar-nav-item">
              <a href="#" className="nav-link">
                <i className="flaticon-menu-1" />
                <span>UI Elements</span>
              </a>
              <ul className="nav sub-group-menu">
                <li className="nav-item">
                  <a href="notification-alart.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Alart
                  </a>
                </li>
                <li className="nav-item">
                  <a href="button.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Button
                  </a>
                </li>
                <li className="nav-item">
                  <a href="grid.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Grid
                  </a>
                </li>
                <li className="nav-item">
                  <a href="modal.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Modal
                  </a>
                </li>
                <li className="nav-item">
                  <a href="progress-bar.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Progress Bar
                  </a>
                </li>
                <li className="nav-item">
                  <a href="ui-tab.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Tab
                  </a>
                </li>
                <li className="nav-item">
                  <a href="ui-widget.html" className="nav-link">
                    <i className="fas fa-angle-right" />
                    Widget
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="map.html" className="nav-link">
                <i className="flaticon-planet-earth" />
                <span>Map</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="account-settings.html" className="nav-link">
                <i className="flaticon-settings" />
                <span>Account</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar Area End Here */}
    </>
  );
};

export default Sidebar;
