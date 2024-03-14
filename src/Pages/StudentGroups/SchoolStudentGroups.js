import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import {Link} from "react-router-dom";
import AddStudentSchoolGroup from "./AddStudentSchoolGroup";
import AuthContext from "../../Context/AuthContext";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import Loader from "../../Components/Common/Loader";

function SchoolStudentGroups() {
  const [groupList, setGroupList] = useState(false);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const getGroups = async () => {
    setLoading(true);
    const server_response = await ajaxStudentGroup.fetchGroupList(
      user.school_user?.school?.school_id
    );
    setLoading(false);
    if (server_response.status === "OK") {
      setGroupList(server_response.details);
    }
  };

  useEffect(() => {
    getGroups();
  }, [user.school_user?.school.school_id]);

  return (
    <AppContainer title="Student Groups">
      <div className="row">
        <div className="col-lg-4">
          <AddStudentSchoolGroup />
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
                    {Array.isArray(groupList) && groupList.length > 0 ? (
                      groupList.map((item, key) => (
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

                          {/* <Link
                            className="btn btn-info"
                            to={`/students/student_card/:id?/${item.group_id}`}>
                            students codeslips
                          </Link> */}

                          <td>
                            <Link
                              className="btn btn-info"
                              to={`/students/student_card/null/${item.group_id}`}>
                              students codeslips
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" style={{textAlign: "center"}}>
                          No class groups registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default SchoolStudentGroups;
