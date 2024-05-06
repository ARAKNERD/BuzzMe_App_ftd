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
import ajaxCallStation from "../util/remote/ajaxCallStation";
import ajaxStation from "../util/remote/ajaxStation";
import SchoolContext from "../Context/SchoolContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {

  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const [studentsNumber, setStudentsNumber] = useState(false);
  const {user} = useContext(AuthContext);
  const [studentsToday, setStudentsToday] = useState(false);

  const {recentSchools} = useContext(SchoolContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [stationList, setStationList] = useState(false);
  const [limit, setLimit] = useState(3);


  const getStations = async () => {
    setLoading2(true);
    const server_response = await ajaxStation.fetchFewStations(user.school?user.school:"",limit);
    setLoading2(false);
    if (server_response.status === "OK") {
      setStationList(server_response.details);
    }else {
      setStationList("404");
    }
  };

  const getStudentsToday = async () => {
    var data = {
      school: user.school,
      group: "",
    };
    setLoading(true);
    const server_response = await ajaxStudent.fetchStudentsToday(data);
    setLoading(false);
    if (server_response.status === "OK") {
      setStudentsToday(server_response.details);
    } else {
      setStudentsToday("404");
    }
  };

  const getStudentsNumber = async () => {
    const server_response = await ajaxStudent.fetchStudentNumber(
      user.school ? user.school : ""
    );

    if (server_response.status === "OK") {
      //store results
      setStudentsNumber(server_response.details);
    } else {
      //communicate error
      setStudentsNumber("404");
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
    getSchoolsNumber();
    getStudentsToday();
  }, []);

  useEffect(() => {
    getStudentsNumber();
    getStations();
  }, [user.school ? user.school : ""]);

  return (
    <div>
      <AppContainer title={"Dashboard"}>
        <Toaster position="top-center" reverseOrder={false} />

        <RenderSecure code="ADMIN-VIEW">
          <div class="row gutters-20">
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="dashboard-summery-one mg-b-20">
                <div class="row align-items-center">
                  <div class="col-6">
                    <div class="item-icon bg-light-green ">
                      <img alt="avatar" src={process.env.PUBLIC_URL + "/assets/img/figure/school.png"}/>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="item-content">
                      <div class="item-title">Total Schools</div>
                      <div class="item-number"><span class="counter">{schoolsNumber ? schoolsNumber.total_p : "..."}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="dashboard-summery-one mg-b-20">
                <div class="row align-items-center">
                  <div class="col-6">
                    <div class="item-icon bg-light-red">
                      <FontAwesomeIcon icon={faMoneyBillTransfer} style={{fontSize: "44px", marginTop:20, color:"black"}} />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="item-content">
                      <div class="item-title">Airtime Balance</div>
                      <div class="item-number"><span class="counter" data-num="2250">00</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="dashboard-summery-one mg-b-20">
                <div class="row align-items-center">
                  <div class="col-6">
                    <div class="item-icon bg-light-yellow">
                      <FontAwesomeIcon icon={faArrowRightArrowLeft} style={{fontSize: "44px", marginTop:20, color:"orange"}} />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="item-content">
                      <div class="item-title">Airtime Used</div>
                      <div class="item-number"><span class="counter" data-num="5690">00</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
              <div class="dashboard-summery-one mg-b-20">
                <div class="row align-items-center">
                  <div class="col-6">
                    <div class="item-icon bg-light-red">
                      <img alt="avatar" src={process.env.PUBLIC_URL + "/assets/img/figure/customer-support.png"}/>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="item-content">
                      <div class="item-title">Calls Today</div>
                      <div class="item-number"><span></span><span class="counter" data-num="193000">00</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </RenderSecure>
        
        <RenderSecure code="SCHOOL-USER-VIEW">
        <div className="row">
          <div class="col-4-xxxl col-12">
                        <div class="card dashboard-card-ten">
                            <div class="card-body">
                                <div class="heading-layout1">
                                    <div class="item-title">
                                        <h3>Welcome!</h3>
                                    </div>
                                </div>
                                <div class="student-info">
                                    <div class="media media-none--xs">
                                        <div class="item-img">
                                        <img src={process.env.PUBLIC_URL + "/assets/img/figure/user55.png"} alt="School Admin"/>
                                        </div>
                                        <div class="media-body">
                                            <h3 class="item-title">{user.school_user?.names}</h3>
                                            <p>School Administrator</p>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                <table className="table mt-2 mw-100 color-span">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">School Name </span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className=""><b>{user.school_user?.school?.school_name}</b></span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">School E-mail</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className=""><b>{user.school_user?.school?.email}</b></span> </td>
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
                            <div class="dashboard-summery-one mg-b-20">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light-green ">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/students.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title">Students</div>
                                        <div class="item-number"><span class="counter">{studentsNumber ? studentsNumber.total_p : "..."}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light-green ">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/customer-support.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title">Calls Today</div>
                                        <div class="item-number"><span class="counter">00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light-yellow ">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/payment-method.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title">Airtime Loaded Today</div>
                                        <div class="item-number"><span class="counter">00</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="col-lg-6">
                            <div class="dashboard-summery-one mg-b-20">
                            <div class="row align-items-center">
                                <div class="col-6">
                                    <div class="item-icon bg-light-yellow ">
                                    <img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/commission.png"
                    }/>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="item-content">
                                        <div class="item-title">Airtime Commission</div>
                                        <div class="item-number"><span class="counter">00</span></div>
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
                          <td>{item.status==="1"?<span class="badge badge-success">Active</span>:
                          item.status==="0"?<span class="badge badge-warning">Inactive</span>:<span class="badge badge-danger">Off</span>}</td>

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
                          <td>{student.names}</td>
                          <td>{student.student_code}</td>
                          <td>{student.reg_no?student.reg_no:"Not recorded"}</td>
                          <td>{student.group?.group_name}</td>
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
        </RenderSecure>
        <div className="row gutters-20">
          <RenderSecure code="ADMIN-VIEW">
            <div className="col-lg-6">
              <div
                className="card custom-card"
                style={{marginTop: "25px", borderRadius: "10px"}}>
                <div className="card-body map-card">
                  <div class="heading-layout1 mg-b-25">
                    <TableHeader
                      title="Recently Registered Schools"
                      subtitle="List of schools that have been registered today"
                     
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
                        <Link class="dropdown-item" to={'/schools/view'}>
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
                  <th>No. </th>
                  <th>School Name</th>
                  <th>E-mail</th>
                  <th>District</th>
                </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(recentSchools) && recentSchools.map((item, key) => (
                            <tr key={key}>
                            <td>{key + 1}</td>
                            <td><Link
                                to={`/schools/view/profile/${item.school_id}`}>
                                {item.school_name}
                              </Link></td>
                            <td>{item.email}</td>
                            <td>{item.district?.district_name}</td>
                          </tr>
                          ))}
                        {recentSchools === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No schools registered today.
                          </td>
                        </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="card custom-card"
                style={{marginTop: "25px", borderRadius: "10px"}}>
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
                      {loading2 ? (
        <Loader/>
      ) : (
        Array.isArray(stationList) && stationList.map((item, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{item.station_name}</td>
              {user.school_user ? null : <td>{item.school?.school_name}</td>}
              <td>
                {item.status === "1" ? (
                  <span className="badge badge-success">Active</span>
                ) : item.status === "0" ? (
                  <span className="badge badge-warning">Inactive</span>
                ) : (
                  <span className="badge badge-danger">Off</span>
                )}
              </td>
            </tr>
          ))
      )}
      {stationList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No calling stations registered yet.
                          </td>
                        </tr>)}

                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </RenderSecure>
        </div>
        
        <RenderSecure code="ADMIN-VIEW">
        <div className="row gutters-20">
         
            <div className="col-lg-12">
              <div
                className="card custom-card"
                style={{marginTop: "25px", borderRadius: "10px"}}>
                <div className="card-body map-card">
                  <div class="heading-layout1 mg-b-25">
                    <TableHeader
                      title="Recent Transactions"
                      subtitle="List of recent transactions"
                     
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
                        <Link class="dropdown-item" to={'/'}>
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
                  <th>Date </th>
                  <th>Transaction ID</th>
                  <th>Student Number</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
                      </thead>
                      <tbody>
                        
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          
          
        </div></RenderSecure>
      </AppContainer>
    </div>
  );
}

export default Dashboard;
