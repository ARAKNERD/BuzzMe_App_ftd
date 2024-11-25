import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { RenderSecure } from "../../util/script/RenderSecure";
import ajaxUser from "../../util/remote/ajaxUser";
import { toast } from 'react-hot-toast'

export default function Header(props) {
  const {user, userId} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {

    e.preventDefault();
    const server_response = await ajaxUser.logoutUser(userId);
    if (server_response.status === "OK") {
      localStorage.removeItem("buzzMe@user");
      navigate("/login");
      window.location.reload();
    } 
    else{
      toast.error(server_response.message); 
    }
  };
  

  function addSidebarToggleMobileListener() {
    document
      .querySelector(".sidebar-toggle-mobile")
      .addEventListener("click", function () {
        var wrapper = document.getElementById("wrapper");
        wrapper.classList.toggle("sidebar-collapsed-mobile");
        if (wrapper.classList.contains("sidebar-collapsed")) {
          wrapper.classList.remove("sidebar-collapsed");
        }
      });
  }
  return (
    <>
      {/* Header Menu Area Start Here */}
      <div className="navbar navbar-expand-md header-menu-one bg-light fixed-top">
        <div className="nav-bar-header-one">
          <div className="header-logo">
            <a href="/">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/logo5.png"}
                alt="logo"
                style={{width: "190px", height: "80px"}}
              />
            </a>
          </div>
          <div className="toggle-button sidebar-toggle">
            <button type="button" className="item-link" onClick={props.toggler}>
              <span className="btn-icon-wrap">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <div className="d-md-none mobile-nav-bar">
          <button
            className="navbar-toggler pulse-animation"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-navbar"
            aria-expanded="false"
            onClick={props.toggleSidebar}>
            <i className="far fa-arrow-alt-circle-down" />
          </button>
          <button
            type="button"
            className="navbar-toggler sidebar-toggle-mobile"
            onClick={addSidebarToggleMobileListener}>
            <i className="fas fa-bars" />
          </button>
        </div>
        <div
          className="header-main-menu collapse navbar-collapse"
          id="mobile-navbar">
          <ul className="navbar-nav">
            {/* <li className="navbar-item header-search-bar">
              <div className="input-group stylish-input-group">
                <span className="input-group-addon">
                  <button type="submit">
                    <span className="flaticon-search" aria-hidden="true" />
                  </button>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Find Something . . ."
                />
              </div>
            </li> */}
          </ul>
          <ul className="navbar-nav">
            <li className="navbar-item dropdown header-admin">
              <a
                className="navbar-nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false">
                <div className="admin-title">
                  <h5 className="item-title">{user.full_name}</h5>
                  <span>{user.role_name}</span>
                </div>
                <div className="admin-img">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/img/figure/user55.png"
                    }
                    style={{width:40}}
                    alt="Admin"
                  />
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="item-header">
                  <h6 className="item-title">{user.full_name}</h6>
                </div>
                <div className="item-content">
                  <ul className="settings-list">
                  <RenderSecure code="ADMIN-VIEW"><li>
                    <Link to={'/settings'}>
                    <i className="flaticon-gear-loading" />
                        Settings
                      </Link>
                    </li></RenderSecure>
                    <li>
                    <Link to={'/profile'}>
                    <i className="flaticon-user" />
                        My Profile
                      </Link>
                    </li>

                    <li>
                      <Link onClick={handleLogout}>
                        <i className="flaticon-turn-off" />
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            
          </ul>
        </div>
      </div>
      {/* Header Menu Area End Here */}
    </>
  );
}
