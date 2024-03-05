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
                <i className="flaticon-dashboard" />
                <span>Dashboard</span>
              </Link>
            </li>

            <RenderSecure code="ADMIN-VIEW">
              <li className="nav-item">
                <Link to="/rate/view" className="nav-link">
                  <i className="fa-solid fa-file-invoice-dollar" />
                  <span>charge Rates</span>
                </Link>
              </li>
            </RenderSecure>
            <RenderSecure code="ADMIN-VIEW">
              <li className="nav-item">
                <Link to="/accounts/view" className="nav-link">
                  <i className="fa-solid fa-file-invoice" />
                  <span>Account</span>
                </Link>
              </li>
            </RenderSecure>
            <RenderSecure code="ADMIN-VIEW">
              <li
                className="nav-item sidebar-nav-item"
                onClick={(e) => toggleDropdown(e)}>
                <Link to="#" className="nav-link">
                  <i className="fa-solid fa-school" />
                  <span>Schools</span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/schools/view" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      View Schools
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/schools/add" className="nav-link">
                      <i className="fa fa-angle-right" />
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
                  <i className="fa-solid fa-users" />
                  <span>School Users</span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/schools/user/view" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      View Schools Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/schools/user/add" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Add School User
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
                  <i className="flaticon-classmates" />
                  <span>Students</span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link to="/students/add" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Add student
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/students">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Students</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="student-details.html" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Student Details
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="student-promotion.html" className="nav-link">
                      <FontAwesomeIcon icon={faAngleRight} />
                      Student Promotion
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
                  <i className="flaticon-couple" />
                  <span>Parents</span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/parents">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Parents</span>
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
                  <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler" />
                  <span>Class Group </span>
                </Link>
                <ul className="nav sub-group-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/class-groups">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">View Class Groups</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/class-groups/add">
                      <FontAwesomeIcon icon={faAngleRight} />

                      <span className="sidemenu-label">Add Class Groups</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </RenderSecure>

            {/* <li className="nav-item">
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
                   <FontAwesomeIcon icon={faAngleRight} />

                    Exam Schedule
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="exam-grade.html" className="nav-link">
                   <FontAwesomeIcon icon={faAngleRight} />

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
            </li> */}
          </ul>
        </div>
      </div>
      {/* Sidebar Area End Here */}
    </>
  );
};

export default Sidebar;
