import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ajaxUser from "../util/remote/ajaxUser";
import Loader from "../Components/Common/Loader";
import Alert from "../Components/Common/Alert";
import functions from "../util/functions";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [passView, setPassV] = useState(false);

  const togglePasswordVisibility = () => {
    setPassV(!passView);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    const data = {
      username: username,
      password: pass,
    };
    const server_response = await ajaxUser.loginUser(data);
    setLoading(false);

    if (server_response.status === "OK") {

      localStorage.setItem("buzzMe@user", server_response.details);
      

      const access_token = localStorage.getItem('buzzMe@user');
      const decorded_token = functions.parseJwt(access_token);
      const role = decorded_token['data']['role_id'];
      const secure = decorded_token['data']['secure'];
      if(secure === "0"){
        navigate("/Activate/account");
        window.location.reload();
      }
     else {
        setInfo(<Alert type="success" message={server_response.message} />);
        navigate('/');
        window.location.reload();
        }
    } else {
      setInfo(<Alert type="danger" message={server_response.message} />);
    }
  };

  return (
    <div>
      <div className="login-page-wrap">
        <div className="half-image first-half"></div>
        <div className="half-image second-half">
          <div className="login-page-content">
            <div className="login-box">
              <div className="item-logo">
                <img src={process.env.PUBLIC_URL + "/assets/img/logo2.png"} />
              </div>
              {loading && <Loader />}
              {info}
              <h2 className="text-center">{" "}Admin Login</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Enter username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  <i className="fas fa-user" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type={passView ? "text" : "password"} placeholder="Enter password" className="form-control" value={pass} onChange={(e) => setPass(e.target.value)}/>
                  <i className={passView ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={togglePasswordVisibility}/>
                </div>
                <div className="form-group">
                  {loading && (
                    <button type="submit" disabled className="login-btn">
                      Signing in..
                    </button>
                  )}
                  {!loading && (
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
