import React, {useState} from "react";
// import Loader from "../Components/Common/Loader";
// import ajaxUser from "../util/remote/ajaxUser";
// import {useNavigate} from "react-router-dom";
// import Alert from "../Components/Common/Alert";

function Login() {
  // const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [pass, setPass] = useState("");
  // // const [loading, setLoading] = useState(false);
  // const [info, setInfo] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // setLoading(true);
  //   const server_response = await ajaxUser.loginUser(username, pass);
  //   // setLoading(false);

  //   if (server_response.status === "OK") {
  //     localStorage.setItem("@user", server_response.details);
  //     navigate("/");
  //     // window.location.reload();
  //     setInfo(<Alert type="success" message={server_response.message} />);
  //   } else {
  //     setInfo(<Alert type="danger" message={server_response.message} />);
  //   }
  // };

  return (
    <div>
      <div className="login-page-wrap">
        <div className="login-page-content">
          <div className="login-box">
            <div className="item-logo">
              <img src="./assets/img/logo2.png" alt="logo" />
            </div>
            <form className="login-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter usrename"
                  className="form-control"
                />
                <i className="far fa-envelope" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Enter password"
                  className="form-control"
                />
                <i className="fas fa-lock" />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember-me"
                  />
                  <label htmlFor="remember-me" className="form-check-label">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="forgot-btn">
                  Forgot Password?
                </a>
              </div>
              <div className="form-group">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
