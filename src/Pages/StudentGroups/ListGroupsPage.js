import React, { useContext, useEffect} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import { Link } from "react-router-dom";
import AddStudentSchoolGroup from "../../Components/StudentGroups/AddStudentSchoolGroup";
import SchoolContext from "../../Context/SchoolContext";
import useStateCallback from "../../util/customHooks/useStateCallback";
import UpdateGroupName from "../../Components/StudentGroups/UpdateGroupName";

function ListGroupsPage() {
  const { schoolGroups, getGroups, schoolDetails, setSchoolId } = useContext(SchoolContext);
  const [modal, setModal] = useStateCallback(false);

  useEffect(() => {
    setSchoolId(schoolDetails.school_id);
  }, [schoolDetails.school_id, setSchoolId]);

  const updateName = (e, item) => {
    setModal(false, () =>
      setModal(
        <UpdateGroupName
          groupID={item.group_id}
          group_name={item.group_name}
          g={getGroups}
          isOpen={true}
        />
      )
    );
  };

  return (
    <AppContainer title="Student Groups">
      {modal}
      <div className="row">
        <div className="col-lg-4">
          <AddStudentSchoolGroup g={getGroups} schoolID={schoolDetails.school_id} />
        </div>
        <div className="col-lg-8">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Student Groups List"
                  subtitle="List of all the student groups sorted according to the recently added"
                />
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
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
                      <th scope="col">Students List</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(schoolGroups) &&
                      schoolGroups.map((item, key) => (
                        <tr key={key}>
                          <th scope="row">{key + 1}</th>
                          <td>{item.group_name}</td>
                          <td>
                            <Link
                              className="btn btn-info"
                              to={`view/${item.group_id}`}
                            >
                              View Students
                            </Link>
                          </td>
                          <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span className="flaticon-more-button-of-three-dots"></span>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => updateName(e, item)}
                                >
                                  <i className="far fa-edit mr-1"></i>
                                  Change Group Name
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {schoolGroups === "404" && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          No groups registered in this school yet.
                        </td>
                      </tr>
                    )}
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

export default ListGroupsPage;
