import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AppContainer from "../../../Components/Structure/AppContainer";
import AdminContext from "../../../Context/AdminContext";
import useStateCallback from "../../../util/customHooks/useStateCallback";
import TableHeader from "../../../Components/Common/TableHeader";
import ResetPassword from "../ResetPassword";
import toast, {Toaster} from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import RemoteLogOut from "../../RemoteLogOut";
import AddAdmin from "../../../Components/SystemUsers/AddAdmin";

function ListAdminsPage() {

    const {adminList, getAdminList} = useContext(AdminContext);
    const [modal, setModal] = useStateCallback(false);

    const handleAdd=()=>{
        setModal(false, ()=>setModal(<AddAdmin g={getAdminList}  isOpen={true}/>))
    }

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

    const handleUpdate=(e,item)=>{
        setModal(false, ()=>setModal(<ResetPassword accountID={item.account_id} isOpen={true}/>))
      }
  return (
    <AppContainer title="System Administrators">
      <Toaster position="top-center" reverseOrder={false} />

    {modal}
      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
        <div className="card height-auto">
   
      <div className="card-body">
        <TableHeader
            title="System Administrators List"
            subtitle="List of all the different system administrators" 
            viewButton={
                <a href="#" onClick={handleAdd} className="btn btn-info" style={{float:"right"}}>Add Administrator</a>
                   
            }   
              />
        {/* Search form */}
        {/* Table */}
        <div className="border-top mt-3"></div>
        <div className="table-responsive">
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Names</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                    {Array.isArray(adminList) && adminList.map((item, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.first_name} {item.last_name}</td>
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
                      {adminList === "404" && (<tr>
                          <td colSpan="3" style={{textAlign: "center"}}>
                            No system administrators registered yet.
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

export default ListAdminsPage;
