import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../Components/Structure/AppContainer";
import ajaxStudent from "../util/remote/ajaxStudent";
import AuthContext from "../Context/AuthContext";
import TableHeader from "../Components/Common/TableHeader";
import {Toaster, toast} from "react-hot-toast";
import Loader from "../Components/Common/Loader";
import {Link} from "react-router-dom";
import ajaxCallStation from "../util/remote/ajaxCallStation";
import ajaxStation from "../util/remote/ajaxStation";

function SchoolDashboard() {

  const [studentsNumber, setStudentsNumber] = useState(false);
  const [schoolLogsNumber, setSchoolLogsNumber] = useState(false);

  const {user} = useContext(AuthContext);
  const [studentsToday, setStudentsToday] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [stationList, setStationList] = useState(false);
  const [limit, setLimit] = useState(5);


  const getStations = async () => {
    setLoading2(true);
    const server_response = await ajaxStation.fetchFewStations(user.school,limit);
    setLoading2(false);
    if (server_response.status === "OK") {
      setStationList(server_response.details);
    }else {
      setStationList("404");
    }
  };

  const getStudentsToday = async () => {
    setLoading(true);
    const server_response = await ajaxStudent.fetchStudentsTodayLimit(user.school,limit);
    setLoading(false);
    if (server_response.status === "OK") {
      setStudentsToday(server_response.details);
    } else {
      setStudentsToday("404");
    }
  };

  const getStudentsNumber = async () => {
    const server_response = await ajaxStudent.fetchStudentNumber(user.school);

    if (server_response.status === "OK") {
      //store results
      setStudentsNumber(server_response.details);
    } else {
      //communicate error
      setStudentsNumber("404");
    }
  };
  const getSchoolLogsNumber = async () => {
    const server_response = await ajaxCallStation.countSchoolLogsToday(user.school);
    if (server_response.status === "OK") {
      //store results
      setSchoolLogsNumber(server_response.details);
    } else {
      //communicate error
      setSchoolLogsNumber("404");
    }
  };

  useEffect(() => {
    getStudentsToday();
    getStudentsNumber();
    getSchoolLogsNumber();
  }, [user.school]);

  useEffect(() => {
    
    getStations();
  }, [user.school, limit]);

  return (
    <div>
      <AppContainer title={"Dashboard"}>
        <Toaster position="top-center" reverseOrder={false} />

        <div className="row">
          <div class="col-4-xxxl col-12">
                        <div class="card dashboard-card-ten">
                            <div class="card-body gradient-orange-peel">
                                <div class="heading-layout1">
                                    <div class="item-title" >
                                        <h3 style={{color:"white"}}>Welcome!</h3>
                                    </div>
                                </div>
                                <div class="student-info">
                                    <div class="media media-none--xs">
                                        <div class="item-img">
                                        <img src={process.env.PUBLIC_URL + "/assets/img/figure/user55.png"} style={{backgroundColor:"white"}} alt="School Admin"/>
                                        </div>
                                        <div class="media-body">
                                            <h3 class="item-title" style={{color:"white"}}>{user.school_user?.first_name} {user.school_user?.last_name}</h3>
                                            <p style={{color:"white"}}> School Administrator</p>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                <table className="table mt-2 mw-100 color-span">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-0" style={{color:"white"}}> <span className="w-50">School Name </span> </td>
                                            <td style={{color:"white"}}>:</td>
                                            <td className="py-2 px-0" style={{color:"white"}}> <span className=""><b>{user.school_user?.school?.school_name}</b></span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0" style={{color:"white"}}> <span className="w-50">School E-mail</span> </td>
                                            <td style={{color:"white"}}>:</td>
                                            <td className="py-2 px-0" style={{color:"white"}}> <span className=""><b>{user.school_user?.school?.email}</b></span> </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                                </div>
                            </div>
                        </div>
          </div>
          <div class="col-8-xxxl col-12">
                        <div class="row">
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/students.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Students</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">{studentsNumber ? studentsNumber.total_p : "..."}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/customer-support.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Calls Today</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">{schoolLogsNumber ? schoolLogsNumber.total_p : "..."}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/payment-method.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Airtime Loaded Today</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/commission.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title" style={{color:"white"}}>Airtime Commission</div>
                                        <div class="item-number" style={{color:"white"}}><span class="counter">00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>
          </div>
          
          </div>
          <div className="row">
        <div className="col-6-xxxl col-12">
              <div
                className="card custom-card"
                style={{borderRadius: "10px"}}>
                <div className="card-body map-card">
                  <div class="heading-layout1 mg-b-25">
                    <TableHeader
                      title="Status of Calling Stations"
                      subtitle="List of calling stations and their current status"
                     
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
                        <Link class="dropdown-item" to={'/stations'}>
                          <i class="fa-solid fa-eye text-orange-peel"></i>
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-top mt-3"></div>
                  <div className="table-responsive">
                    <table className="table table-hover text-nowrap mg-b-0">
                      <thead>
                      <tr>
                      <th>No.</th>
                      <th>Station Name</th>
                      {user.school_user?"":<th>School</th>}
                      <th>Status</th>
                    </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(stationList) && stationList.map((item, key) => (
                            <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.station_name}</td>
                          {user.school_user?"":<td>{item.school?.school_name}</td>}
                          <td>{item.status==="300"?<span class="badge badge-success">Active</span>:
                          item.status==="200"?<span class="badge badge-warning">Inactive</span>:<span class="badge badge-danger">Off</span>}</td>

                        </tr>
                        
                          ))}
                        {stationList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No calling stations registered yet.
                          </td>
                        </tr>)}
                      </tbody>
                    </table>
                    {loading2 && <Loader/>}

                  </div>
                </div>
              </div>
        </div>
        <div className="col-6-xxxl col-12">
          <div className="card custom-card"
                style={{borderRadius: "10px"}}>
            <div className="card-body">
          <div className="heading-layout1">
          <TableHeader
                  title="Recently Registered Students"
                  subtitle="List of the students registered today"
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
                        <Link class="dropdown-item" to={`/school-students`}>
                          <i class="fa-solid fa-eye text-orange-peel"></i>
                          View All
                        </Link>
                      </div>
                    </div>
          </div>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Student Code</th>
                  <th>Registration Number</th>
                  <th>Student Group</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(studentsToday) && studentsToday.map((student, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{student.first_name} {student.last_name}</td>
                          <td>{student.student_code}</td>
                          <td>{student.reg_no?student.reg_no:"Not recorded"}</td>
                          <td>{student.group}</td>
                        </tr>
                      ))
                    }
                    {studentsToday === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No students registered today.
                          </td>
                        </tr>)}
              </tbody>
            </table>
            {loading && <Loader/>}
          </div>
        </div>
              </div></div></div>
    
       
        
        
      </AppContainer>
    </div>
  );
}

export default SchoolDashboard;
{/* 
        <div className="row">
        <div className="col-6-xxxl col-12">
              <div
                className="card custom-card"
                style={{marginTop: "10px", borderRadius: "10px"}}>
                <div className="card-body map-card">
                  <div class="heading-layout1 mg-b-25">
                    <TableHeader
                      title="Status of Calling Stations"
                      subtitle="List of calling stations and their current status"
                     
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
                        <Link class="dropdown-item" to={'/stations'}>
                          <i class="fa-solid fa-eye text-orange-peel"></i>
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-top mt-3"></div>
                  <div className="table-responsive">
                    <table className="table table-hover text-nowrap mg-b-0">
                      <thead>
                      <tr>
                      <th>No.</th>
                      <th>Station Name</th>
                      {user.school_user?"":<th>School</th>}
                      <th>Status</th>
                    </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(stationList) && stationList.map((item, key) => (
                            <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.station_name}</td>
                          {user.school_user?"":<td>{item.school?.school_name}</td>}
                          <td>{item.status==="300"?<span class="badge badge-success">Active</span>:
                          item.status==="200"?<span class="badge badge-warning">Inactive</span>:<span class="badge badge-danger">Off</span>}</td>

                        </tr>
                        
                          ))}
                        {stationList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No calling stations registered yet.
                          </td>
                        </tr>)}
                      </tbody>
                    </table>
                    {loading2 && <Loader/>}

                  </div>
                </div>
              </div>
        </div>
        <div className="col-6-xxxl col-12">
          <div className="card custom-card"
                style={{marginTop: "10px", borderRadius: "10px"}}>
            <div className="card-body">
          <div className="heading-layout1">
          <TableHeader
                  title="Recently Registered Students"
                  subtitle="List of the students registered today"
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
                        <Link class="dropdown-item" to={`/school-students`}>
                          <i class="fa-solid fa-eye text-orange-peel"></i>
                          View All
                        </Link>
                      </div>
                    </div>
          </div>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Student Code</th>
                  <th>Registration Number</th>
                  <th>Student Group</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(studentsToday) && studentsToday.map((student, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{student.first_name} {student.last_name}</td>
                          <td>{student.student_code}</td>
                          <td>{student.reg_no?student.reg_no:"Not recorded"}</td>
                          <td>{student.group}</td>
                        </tr>
                      ))
                    }
                    {studentsToday === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No students registered today.
                          </td>
                        </tr>)}
              </tbody>
            </table>
            {loading && <Loader/>}
          </div>
        </div>
              </div></div></div> */}