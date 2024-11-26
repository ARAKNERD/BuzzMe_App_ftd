import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import AppContainer from "../../../Components/Structure/AppContainer";
import { Toaster } from "react-hot-toast";
import useStateCallback from "../../../util/customHooks/useStateCallback";
import TableHeader from "../../../Components/Common/TableHeader";
import AdminContext from "../../../Context/AdminContext";
import AddBoothAssistant from "../../../Components/SystemUsers/AddBoothAssistant";
import ResetPassword from "../../../Components/SystemUsers/ResetPassword";

function ListBoothAssistants() {
  const {boothAssistantList, getBoothAssistantList} = useContext(AdminContext);
  const [modal, setModal] = useStateCallback(false);
    
  useEffect(() => {
    getBoothAssistantList();
  }, []);
    
  const handleUpdate=(e,item)=>{
    setModal(false, ()=>setModal(<ResetPassword accountID={item.account_id} isOpen={true}/>))
  }
    
  const handleAdd=()=>{
    setModal(false, ()=>setModal(<AddBoothAssistant g={getBoothAssistantList}  isOpen={true}/>))
  }

  return (
    <AppContainer title="Booth Assistants">
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
                title="Booth Assistants List"
                subtitle="List of all the different booth assistants"  
                viewButton={
                  <a href="#" onClick={handleAdd} className="btn btn-info" style={{float:"right"}}>Add Booth Assistant</a>
                     
              } 
              />
        <div className="border-top mt-3"></div>

        <div className="table-responsive">
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Names</th>
                <th>School Name</th>
                <th>Username</th>
                <th>Actions</th>
                 
              </tr>
            </thead>
            <tbody>
            {Array.isArray(boothAssistantList) && boothAssistantList.map((item, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{item.first_name} {item.last_name} </td>
                <td>{item.school_name}</td>
                <td>{item.username}</td>
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
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {boothAssistantList === "404" && (<tr>
                <td colSpan="5" style={{textAlign: "center"}}>
                  No booth assistants registered yet.
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

export default ListBoothAssistants;
