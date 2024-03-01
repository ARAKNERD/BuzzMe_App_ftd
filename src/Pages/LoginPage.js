import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ajaxUser from "../util/remote/ajaxUser";
import Loader from "../Components/Common/Loader";
import Alert from "../Components/Common/Alert";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const server_response = await ajaxUser.loginUser(username, pass);
    setLoading(false);

    if (server_response.status === "OK") {
      localStorage.setItem("buzzMe@user", server_response.details);
      navigate("/");
      window.location.reload();
      setInfo(<Alert type="success" message={server_response.message} />);
    } else {
      setInfo(<Alert type="danger" message={server_response.message} />);
    }
  };

  return (
    <div>
      <div className="login-page-wrap">
        <div className="login-page-content">
          <div className="login-box">
            <div className="item-logo">
              <img src="./assets/img/logo2.png" alt="logo" />
            </div>
            {loading && <Loader/>}
            {info}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="form-control"
                  value={username} onChange={(e)=>setUsername(e.target.value)}
                />
                <i className="fas fa-envelope" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-control"
                  value={pass} onChange={(e)=>setPass(e.target.value)}
                />
                <i className="fas fa-lock" />
              </div>
              
              <div className="form-group">
              {loading && (<button type="submit" disabled className="login-btn">
                  Signing in..
                </button>)}
                {!loading && (<button type="submit" className="login-btn">
                  Login
                </button>)}
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
