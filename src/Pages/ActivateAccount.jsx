import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ajaxUser from "../util/remote/ajaxUser";
import Loader from "../Components/Common/Loader";
import toast, {Toaster} from "react-hot-toast";
import functions from "../util/functions";

function ActivateAccount() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [passView, setPassView] = useState(false);
  const [passView1, setPassView1] = useState(false);
  const user_id = functions.sessionGuard();

  const togglePasswordVisibility = () => {
    setPassView(!passView);
  };

  const togglePasswordVisibility1 = () => {
    setPassView1(!passView1);
  };

  const handleLogout = async () => {

    const server_response = await ajaxUser.logoutUser(user_id);
    if (server_response.status === "OK") {
      localStorage.removeItem("buzzMe@user");
      navigate("/login");
      window.location.reload();
    } 
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass === cpass) {

      const data = {account_id: user_id, secure_string: pass};

      const server_response = await ajaxUser.ActivateUserAccount(data);
      setLoading(true);

      if (server_response.status === "OK") {
        setLoading(false);
        toast.success(server_response.message);
        handleLogout(user_id)
        
      } else {
        setLoading(false);
        toast.error(server_response.message);
      }
    } else {
      toast.error("Passwords don't match");
    }
  };
  return (
    <div>
      <div className="login-page-wrap">
        <div className="halv-image first-half"></div>
        <div className="halv-image second-half">
          <div className="login-page-content">
            <Toaster />
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
                  <label>New Password</label>
                  <input type={passView ? "text" : "password"} placeholder="Enter new password" className="form-control" value={pass} onChange={(e) => setPass(e.target.value)}/>
                  <i className={passView ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={togglePasswordVisibility}/>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type={passView1 ? "text" : "password"}
                    placeholder="Confirm password.."
                    className="form-control"
                    value={cpass}
                    onChange={(e) => setCpass(e.target.value)}
                  />
                  <i className={passView1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={togglePasswordVisibility1}/>
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
    </div>
  );
}

export default ActivateAccount;
