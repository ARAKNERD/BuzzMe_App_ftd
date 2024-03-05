import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ajaxUser from "../util/remote/ajaxUser";
import Loader from "../Components/Common/Loader";
import Alert from "../Components/Common/Alert";

function ActivateAccount() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [passView, setPassView] = useState(false);
  const [passView1, setPassView1] = useState(false);

  const togglePasswordVisibility = () => {
    setPassView(!passView);
  };
  const togglePasswordVisibility1 = () => {
    setPassView1(!passView1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {Password: pass};

    const server_response = await ajaxUser.loginUser(data);
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
              <img src="../assets/img/logo2.png" alt="logo" />
            </div>
            {loading && <Loader />}
            {info}
            <h2 className="text-center">
              {" "}
              <i>
                Activate Your Account <br /> To Continue
              </i>
            </h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>password</label>
                <input
                  type={passView ? "text" : "password"}
                  placeholder="Enter password"
                  className="form-control"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <i
                  className={
                    passView ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                  onClick={togglePasswordVisibility}
                />
              </div>

              <div className="form-group">
                <label>comfirm password</label>
                <input
                  type={passView1 ? "text" : "password"}
                  placeholder="comfirm password"
                  className="form-control"
                  value={cpass}
                  onChange={(e) => setCpass(e.target.value)}
                />
                <i
                  className={
                    passView1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                  onClick={togglePasswordVisibility1}
                />
              </div>

              <div className="form-group">
                {loading && (
                  <button type="submit" disabled className="login-btn">
                    Activation in progress ...
                  </button>
                )}
                {!loading && (
                  <button type="submit" className="login-btn">
                    Activate Account
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivateAccount;
