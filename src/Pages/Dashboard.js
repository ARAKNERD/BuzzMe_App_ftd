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

function Dashboard() {
  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const [studentsNumber, setStudentsNumber] = useState(false);
  const [parentsNumber, setParentsNumber] = useState(false);
  const {user} = useContext(AuthContext);
  const {recentSchools, getRecentSchools} = useContext(SchoolContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [stationList, setStationList] = useState(false);
  const [limit, setLimit] = useState(5);

  const getStations = async () => {
    setLoading2(true);
    const server_response = await ajaxStation.fetchFewStations(user.school_user?user.school_user?.school.school_id:"",limit);
    setLoading2(false);
    if (server_response.status === "OK") {
      setStationList(server_response.details);
    }
  };

  const getStudentsNumber = async () => {
    const server_response = await ajaxStudent.fetchStudentNumber(
      user.school_user ? user.school_user.school?.school_id : ""
    );

    if (server_response.status === "OK") {
      //store results
      setStudentsNumber(server_response.details);
    } else {
      //communicate error
      setStudentsNumber("404");
    }
  };
  // fetches  call stations count
  const [callStations, setCallStations] = useState("");
  const getcall_stations_sNumber = async () => {
    const server_response = await ajaxCallStation.callStation_count(user.school_user ? user.school_user.school?.school_id : "");

    if (server_response.status === "OK") {
      //store results
      setCallStations(server_response.details);
    } else {
      //communicate error
      setCallStations("404");
    }
  };

  const getParentsNumber = async () => {
    const server_response = await ajaxParent.countParents(
    );

    if (server_response.status === "OK") {
      //store results
      setParentsNumber(server_response.details);
    } else {
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
    getSchoolsNumber();
  }, []);

  useEffect(() => {
    getStudentsNumber();
    getcall_stations_sNumber();
    getStations();
  }, [user.school_user ? user.school_user.school.school_id : ""]);

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
          <div class="col-sm-12 col-md-3">
							<div class="card custom-card">
								<div class="card-body">
									<div>
										<h5>Schools</h5>
										<h2><span class="fs-30 mr-2">{schoolsNumber ? schoolsNumber.total_p : "..."}</span></h2>
										<span class="text-muted">The number of schools registered to use the Buzz App.</span>
									</div>
								</div>
							</div>
						</div>
          </RenderSecure>
          <div class="col-sm-12 col-md-3">
							<div class="card custom-card">
								<div class="card-body">
									<div>
										<h5>Calling Stations</h5>
										<h2><span class="fs-30 mr-2">{callStations ? callStations.total_p : "..."}</span></h2>
										<span class="text-muted">The number of call stations installed within the school(s).</span>
									</div>
								</div>
							</div>
						</div>
            <div class="col-sm-12 col-md-3">
							<div class="card custom-card">
								<div class="card-body">
									<div>
										<h5>Students</h5>
										<h2><span class="fs-30 mr-2">{studentsNumber ? studentsNumber.total_p : "..."}</span></h2>
										<span class="text-muted">The number of students using the Buzz App.</span>
									</div>
								</div>
							</div>
						</div>
          <div class="col-sm-12 col-md-3">
							<div class="card custom-card">
								<div class="card-body">
									<div>
										<h5>Parents</h5>
										<h2><span class="fs-30 mr-2">{parentsNumber ? parentsNumber.total_p : "..."}</span></h2>
										<span class="text-muted">The number of parents using the Buzz App.</span>
									</div>
								</div>
							</div>
						</div>
        </div>
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
                        {Array.isArray(recentSchools) &&
                        recentSchools.length > 0 ? (
                          recentSchools.map((item, key) => (
                            <tr key={key}>
                            <td>{key + 1}</td>
                            <td><Link
                                to={`/schools/view/profile/${item.school_id}`}>
                                {item.school_name}
                              </Link></td>
                            <td>{item.email}</td>
                            <td>{item.district?.district_name}</td>
                          </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" style={{textAlign: "center"}}>
                              No schools registered today.
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
                        {Array.isArray(stationList) &&
                        stationList.length > 0 ? (
                          stationList.map((item, key) => (
                            <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.station_name}</td>
                          {user.school_user?"":<td>{item.school?.school_name}</td>}
                          <td>{item.status==="1"?<span class="badge badge-success">Active</span>:<span class="badge badge-danger">Offline</span>}</td>

                        </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{textAlign: "center"}}>
                              No calling stations registered.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {loading2 && <Loader/>}

                  </div>
                </div>
              </div>
            </div>
        </div>
      </AppContainer>
    </div>
  );
}

export default Dashboard;
