import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppContainer from "../../../Components/Structure/AppContainer";
import { Toaster } from "react-hot-toast";
import ResetPassword from "../ResetPassword";
import AddSchoolAdmin from "../../../Components/SystemUsers/AddSchoolAdmin";
import RemoteLogOut from "../../RemoteLogOut";
import { useContext } from "react";
import AdminContext from "../../../Context/AdminContext";
import useStateCallback from "../../../util/customHooks/useStateCallback";
import TableHeader from "../../../Components/Common/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function ListSchoolAdminsPage() {
  const {schoolAdminList, getSchoolAdminList} = useContext(AdminContext);
  const [modal, setModal] = useStateCallback(false);

  const remoteLogout = (e, item) => {
    setModal(false, () =>
      setModal(
        <RemoteLogOut
          userID={item.user_id}
          isOpen={true}
        />
      )
    );
  };

  useEffect(() => {
    getSchoolAdminList();
  }, []);

  const handleUpdate=(e,item)=>{
    setModal(false, ()=>setModal(<ResetPassword accountID={item.account_id} isOpen={true}/>))
  }

  const handleAdd=()=>{
    setModal(false, ()=>setModal(<AddSchoolAdmin g={getSchoolAdminList}  isOpen={true}/>))
}
  return (
    <AppContainer title="School Administrators">
       <Toaster
          position="top-center"
          reverseOrder={false}
        />
      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
        <div className="card height-auto">
      {modal}
      <div className="card-body">
        <TableHeader
                title="School Administrators List"
                subtitle="List of all the different school administrators"  
                viewButton={
                  <a href="#" onClick={handleAdd} className="btn btn-info" style={{float:"right"}}>Add School Administrator</a>
                     
              } 
              />
        <div className="border-top mt-3"></div>

        <div className="table-responsive">
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Names</th>
                <th>Username</th>
                <th>School Name</th>
                <th>Actions</th>
                 
              </tr>
            </thead>
            <tbody>
            {Array.isArray(schoolAdminList) && schoolAdminList.map((item, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.first_name} {item.last_name}</td>
                          <td>{item.username}</td>
                          <td>{item.school_name}</td>
                          <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false">
                                <span className="flaticon-more-button-of-three-dots"></span>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => handleUpdate(e,item)}>
                                  <i className="fas fa-cogs text-dark-pastel-green"></i>
                                  Reset Password
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => remoteLogout(e,item)}>
                                  <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "red", marginRight: "3px" }} />
                                      Remote Log-Out
                                  </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {schoolAdminList === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No school administrators registered yet.
                          </td>
                        </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListSchoolAdminsPage;
