import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import {Link} from "react-router-dom";
import AddStudentSchoolGroup from "./AddStudentSchoolGroup";
import AuthContext from "../../Context/AuthContext";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import Loader from "../../Components/Common/Loader";
import SchoolContext from "../../Context/SchoolContext";
import UpdateGroupName from "./UpdateGroupName";
import useStateCallback from "../../util/customHooks/useStateCallback";

function SchoolStudentGroups() {
  const { schoolGroups, getGroups } = useContext(SchoolContext);
  const {user} = useContext(AuthContext);
  const [modal, setModal] = useStateCallback(false);

  const updateName=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateGroupName groupID={item.group_id} group_name={item.group_name} g={getGroups} isOpen={true}/>))
}

  return (
    <AppContainer title="Student Groups">
      {modal}
      <div className="row">
        <div className="col-lg-4">
          <AddStudentSchoolGroup g={getGroups}/>
        </div>
        <div className="col-lg-8">
          <div
            className="card custom-card"
            // style={{marginTop: "25px", borderRadius: "10px"}}
          >
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Student Groups List"
                  subtitle="List of all the student groups sorted according to the recently added"
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
                    <Link class="dropdown-item" onClick={getGroups}>
                      <i class="fas fa-redo-alt text-orange-peel"></i>Refresh
                    </Link>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th scope="col" className="">
                        No.
                      </th>
                      <th scope="col">Names</th>
                      <th scope="col">Actions</th>
                      <th scope="col">
                        Group <br /> codeslips{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(schoolGroups) && schoolGroups.map((item, key) => (
                        <tr key={key}>
                          <th scope="row">{key + 1}</th>
                          <td>{item.group_name}</td>
                          <td>
                            <Link
                              className="btn btn-info"
                              to={`view/${item.group_id}`}>
                              View Students
                            </Link>
                          </td>

                          <td>
                            <Link
                              className="btn btn-info"
                              to={`/students/student_card/null/${item.group_id}/${user.school}`}>
                              students codeslips
                            </Link>
                          </td>
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
                                onClick={(e) => updateName(e,item)}>
                                <i className="far fa-edit mr-1"></i>
                                 Change Group Name
                              </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                    {schoolGroups === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No groups registered in this school yet.
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

export default SchoolStudentGroups;
