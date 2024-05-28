import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppContainer from "../../Components/Structure/AppContainer";
import { Toaster } from "react-hot-toast";
import ajaxSchool from "../../util/remote/ajaxSchool";
import AuthContext from "../../Context/AuthContext";
import useStateCallback from "../../util/customHooks/useStateCallback";
import AddBoothAssistant from "./AddBoothAssistant";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import ResetPassword from "./ResetPassword";

function ListBoothAssistants() {
    const [boothAssistants, setBoothAssistants] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const {user} = useContext(AuthContext);


    const getBoothAssistants = async () => {
        try {
          const data = {
            school: ""
          };
          setLoading(true)
          const serverResponse = await ajaxSchool.fetchBoothAssistants(data);
          setLoading(false)
          console.log(serverResponse)
          if (serverResponse.status === "OK") {
            setBoothAssistants(serverResponse.details);
          } else {
            // Handle error condition
            setBoothAssistants("404");
          }
        } catch (error) {
          // Handle network or other errors
          console.error("Error:", error);
        }
      };
    
      useEffect(() => {
        getBoothAssistants();
      }, []);
    
      const handleUpdate=(e,item)=>{
        setModal(false, ()=>setModal(<ResetPassword accountID={item.account_id} isOpen={true}/>))
      }
    
      const handleAdd=()=>{
        setModal(false, ()=>setModal(<AddBoothAssistant g={getBoothAssistants}  isOpen={true}/>))
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
            {Array.isArray(boothAssistants) && boothAssistants.map((item, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.first_name} {item.last_name} </td>
                          <td>{item.school.school_name}</td>
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
                      {boothAssistants === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No booth assistants registered yet.
                          </td>
                        </tr>)}
            </tbody>
          </table>
          {loading && <Loader/>}
        </div>
      </div>
    </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListBoothAssistants;
