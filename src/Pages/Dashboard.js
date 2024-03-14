import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../Components/Structure/AppContainer";
import ajaxSchool from "../util/remote/ajaxSchool";
import ajaxStudent from "../util/remote/ajaxStudent";
import AuthContext from "../Context/AuthContext";
import {RenderSecure} from "../util/script/RenderSecure";
import TableHeader from "../Components/Common/TableHeader";
import ajaxParent from "../util/remote/ajaxParent";
import {Toaster, toast} from "react-hot-toast";
import Loader from "../Components/Common/Loader";
import {Link} from "react-router-dom";

function Dashboard() {
  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const [studentsNumber, setStudentsNumber] = useState(false);
  const [parentsNumber, setParentsNumber] = useState(false);
  const {user} = useContext(AuthContext);
  const [requestList, setRequestList] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = {
    school_id: user.school_user ? user.school_user.school?.school_id : "",
    group_id: "",
  };

  const data2 = {
    school_requested: user.school_user?.school?.school_id,
    parent_id: "",
  };

  const data3 = {
    school_id: user.school_user ? user.school_user.school?.school_id : "",
  };

  const getRequestList = async () => {
    const server_response = await ajaxParent.fetchParentRequests(data2);
    if (server_response.status === "OK") {
      setRequestList(server_response.details);
    } else {
      setRequestList("404");
    }
  };

  const acceptRequest = async (e, item) => {
    var data3 = {
      request_id: item.request_id,
    };
    const server_response = await ajaxParent.confirmParentRequest(data3);
    if (server_response.status === "OK") {
      toast.success("Parent request accepted!");
      getRequestList();
    } else {
      toast.error(server_response.message);
    }
  };

  const declineRequest = async (e, item) => {
    var data4 = {
      request_id: item.request_id,
    };
    const server_response = await ajaxParent.declineParentRequest(data4);
    if (server_response.status === "OK") {
      toast.success("Parent request declined!");
      getRequestList();
    } else {
      toast.error(server_response.message);
    }
  };

  const getStudentsNumber = async () => {
    const server_response = await ajaxStudent.fetchStudentNumber(data);

    if (server_response.status === "OK") {
      //store results
      setStudentsNumber(server_response.details);
    } else {
      //communicate error
      setStudentsNumber("404");
    }
  };

  const getParentsNumber = async () => {
    const server_response = await ajaxParent.countParents(data3);
     
    if(server_response.status==="OK"){
       //store results
       setParentsNumber(server_response.details);
    }else{
       //communicate error
       setParentsNumber("404");
    }
  };

  const getSchoolsNumber = async () => {
    const server_response = await ajaxSchool.fetchSchoolNumber();

    if (server_response.status === "OK") {
      //store results
      setSchoolsNumber(server_response.details);
    } else {
      //communicate error
      setSchoolsNumber("404");
    }
  };

  useEffect(() => {
    getRequestList();
  }, []);

  useEffect(() => {
    getSchoolsNumber();
  }, []);

  useEffect(() => {
    getStudentsNumber();
  }, []);

  useEffect(() => {
    getParentsNumber();
  }, []);

  return (
    <div>
      <AppContainer title={"Dashboard"}>
        <Toaster position="top-center" reverseOrder={false} />
        {/* Dashboard summery Start Here */}
        <div className="row gutters-20">
          <RenderSecure code="ADMIN-VIEW">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="item-icon bg-light-blue">
                      <i className="flaticon-multiple-users-silhouette text-blue" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="item-content">
                      <div className="item-title">Schools</div>
                      <div className="item-number">
                        <span className="counter">
                          {schoolsNumber ? schoolsNumber.total_p : "..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RenderSecure>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="item-icon bg-light-green">
                    <i className="flaticon-classmates text-green" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="item-content">
                    <div className="item-title">Students</div>
                    <div className="item-number">
                      <span className="counter">
                        {studentsNumber ? studentsNumber.total_p : "..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="item-icon bg-light-green">
                    <i className="flaticon-user text-green" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="item-content">
                    <div className="item-title">Parents</div>
                    <div className="item-number">
                      <span className="counter">
                        {parentsNumber ? parentsNumber.total_p : "..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row gutters-20">
          <RenderSecure code="SCHOOL-USER-VIEW">
            <div className="col-lg-12">
              <div
                className="card custom-card"
                style={{marginTop: "25px", borderRadius: "10px"}}>
                <div className="card-body map-card">
                  <div class="heading-layout1 mg-b-25">
                    <TableHeader
                      title="Pending Parent Requests"
                      subtitle="List of all the pending parent requests"
                    />
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-expanded="false">
                        ...
                      </a>

                      <div class="dropdown-menu dropdown-menu-right">
                        <Link class="dropdown-item" onClick={getRequestList}>
                          <i class="fas fa-redo-alt text-orange-peel"></i>
                          Refresh
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-top mt-3"></div>
                  <div className="table-responsive">
                    <table className="table table-hover text-nowrap mg-b-0">
                      <thead>
                        <tr>
                          <th scope="col" className="wd-10p">
                            No.
                          </th>
                          <th scope="col">Parent Name</th>
                          <th scope="col">Student</th>
                          <th scope="col">Student DOB</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(requestList) &&
                        requestList.length > 0 ? (
                          requestList.map((item, key) => (
                            <tr key={key}>
                              <th scope="row">{key + 1}</th>
                              <td>{item.parent?.parent_name}</td>
                              <td>
                                <span>{item.student?.names}</span>
                                <br />
                                <span>
                                  <small>{item.student_code}</small>
                                </span>
                              </td>
                              <td>{item.student_dob}</td>
                              <td>
                                <div class="dropdown">
                                  <a
                                    href="#"
                                    class="dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-expanded="false">
                                    <span class="flaticon-more-button-of-three-dots"></span>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-right">
                                    <Link
                                      class="dropdown-item"
                                      onClick={(e) => acceptRequest(e, item)}>
                                      <i class="fas fa-check-circle text-dark-pastel-green"></i>
                                      Accept Request
                                    </Link>
                                    <Link
                                      class="dropdown-item"
                                      onClick={(e) => declineRequest(e, item)}>
                                      <i class="fas fa-close text-orange-red"></i>
                                      Decline Request
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{textAlign: "center"}}>
                              No pending parent requests.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </RenderSecure>
        </div>
      </AppContainer>
    </div>
  );
}

export default Dashboard;
