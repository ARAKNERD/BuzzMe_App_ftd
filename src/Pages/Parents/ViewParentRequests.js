import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import { Link } from "react-router-dom";
import useStateCallback from "../../util/customHooks/useStateCallback";
import AuthContext from "../../Context/AuthContext";
import ajaxParent from "../../util/remote/ajaxParent";
import { Toaster, toast } from 'react-hot-toast';


function ViewParentRequests() {

    const [requestList,setRequestList] = useState(false)
    const [loading,setLoading] = useState(false)
    const [modal, setModal] = useStateCallback(false);
    const {user} = useContext(AuthContext);

    const data = {
        school_requested: user.school_user?.school?.school_id,
        parent_id: "",
      };

    const getRequestList = async () => {
        const server_response = await ajaxParent.fetchParentRequests(data);
        if (server_response.status === "OK") {
            setRequestList(server_response.details);
            
        } else {
            setRequestList("404");
            
        }
    };

    const acceptRequest = async (e,item) => {
        var data2 = {
            request_id: item.request_id
          };
        const server_response = await ajaxParent.confirmParentRequest(data2);
        if (server_response.status === "OK") {
            toast.success("Parent request accepted!")
            getRequestList()
        } else {
            toast.error(server_response.message)
        }
    };

    const declineRequest = async (e,item) => {
        var data4 = {
            request_id: item.request_id
          };
        const server_response = await ajaxParent.declineParentRequest(data4);
        if (server_response.status === "OK") {
            toast.success("Parent request declined!")
            getRequestList()
        } else {
            toast.error(server_response.message)
        }
    };



    useEffect(() => {
        getRequestList();
      }, [data]);

  return(
  <AppContainer title="Parent Requests">
    <Toaster
            position="top-center"
            reverseOrder={false}
        />
          {modal}      
				<div className="col-lg-12">
          <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
            <div className="card-body map-card">
            <div class="heading-layout1 mg-b-25">
              <TableHeader
                title="Parent Requests"
                subtitle="List of all the pending parent requests"    
              />
                           <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={getRequestList} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                                        </div>
                                    </div>
                        </div>
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th scope="col" className="wd-10p">No.</th>
                      <th scope="col">Parent Name</th>
                      <th scope="col">Student</th>
                      <th scope="col">Student DOB</th>
                      <th scope="col">Actions</th>
                      
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(requestList) && requestList.length > 0 ? (
                      requestList.map((item, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{item.parent?.parent_name}</td>
                          <td><span>{item.student?.names}</span><br/><span><small>{item.student_code}</small></span></td>
                          <td>{item.student_dob}</td>
                          <td>
                            <div class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="flaticon-more-button-of-three-dots"></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" onClick={(e)=>acceptRequest(e,item)}><i class="fas fa-check-circle text-dark-pastel-green"></i>Accept Request</Link>
                                    <Link class="dropdown-item" onClick={(e)=>declineRequest(e,item)}><i class="fas fa-close text-orange-red"></i>Decline Request</Link>
                                                </div>
                                              
                                            </div></td>
                        </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="6" style={{textAlign:"center"}}>No pending parent requests.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
			    </div>
				</div>
    
    </AppContainer>
  )
}

export default ViewParentRequests;
