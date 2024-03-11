import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {useContext} from "react";
// import ViewSchoolStudents from "./ViewSchoolStudents";
import AuthContext from "../../Context/AuthContext";
import ChangeStatus from "./ChangeStatus";
import useStateCallback from "../../util/customHooks/useStateCallback";
import UpdateStudent from "./UpdateStudent";
import {useParams} from "react-router-dom";
import ajaxStudent from "../../util/remote/ajaxStudent";
function ViewStudentProfile() {
  const {user} = useContext(AuthContext);
  const {id} = useParams();

  var school_id = user.school_user ? user.school_user.school.school_id : "";
  // getting student details ----------------------------
  const [studentDetails, setStudentDetails] = useState("");
  const getStudentDetails = async () => {
    var data = {
      student_id: id,
    };
    const server_response = await ajaxStudent.fetchStudentData(data);
    if (server_response.status === "OK") {
      setStudentDetails(server_response.details);
    } else {
      setStudentDetails("404");
    }
  };
  //  getting student's contacts--------------------------
  const [contacts, setContacts] = useState("");
  const getStudentContacts = async () => {
    var data = {
      student_id: id,
    };
    const server_response = await ajaxStudent.fetchStudentContacts(data);
    if (server_response.status === "OK") {
      setContacts(server_response.details);
    } else {
      setContacts("404");
    }
  };
  //  getting student's contacts--------------------------
  const [call_logs, setCall_logs] = useState("");
  const getStudentCall_logs = async () => {
    var data = {
      student_id: id,
      school_id: school_id,
    };
    const server_response = await ajaxStudent.fetchStudentCall_logs(data);
    if (server_response.status === "OK") {
      setCall_logs(server_response.details);
    } else {
      setCall_logs("404");
    }
  };

  useEffect(() => {
    getStudentDetails();
    getStudentContacts();
    getStudentCall_logs();
  }, []);

  // ----------------------handles the--change--status modal-------------
  const [ChangeStaus, setChangeStaus] = useStateCallback(false);
  const handle_status_updater = (id) => {
    setChangeStaus(false, () =>
      setChangeStaus(<ChangeStatus isOpen={true} student={id} />)
    );
  };

  // ----------------------handles the view -----students printable codeslipmodal----
  const [studentUpdater, setStudentUpdater] = useStateCallback(false);
  const handle_student_updater = (student) => {
    setStudentUpdater(false, () =>
      setStudentUpdater(<UpdateStudent isOpen={true} student={student} />)
    );
  };

  return (
    <AppContainer title="Students">
      <div className="row">
        {/* {ViewStudentSlip} */}
        {studentUpdater}
        {ChangeStaus}
        <div className="col-12">
          <div className="card height-auto">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="col-12">
                  <button
                    className=" mx-5 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                    onClick={() => handle_student_updater(1)}>
                    Update Student
                  </button>
                  <button
                    className=" mx-5 btn-fill-md radius-30 text-light bg-martini shadow-martini "
                    onClick={() => handle_status_updater(1)}>
                    Change Status
                  </button>
                </div>
                <div className="dropdown">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    ...
                  </a>
                </div>
              </div>
              <div className="single-info-details">
                <div className="item-img">
                  <img src="img/figure/student1.jpg" alt="student" />
                </div>
                <div className="item-content">
                  <div className="header-inline item-header">
                    <h3 className="text-dark-medium font-medium">
                      Student Names
                    </h3>
                  </div>

                  <div className="info-table table-responsive">
                    <table className="table text-nowrap">
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td className="font-medium text-dark-medium">
                            Jessia Rose
                          </td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td className="font-medium text-dark-medium">
                            Female
                          </td>
                        </tr>
                        <tr>
                          <td>Father Name:</td>
                          <td className="font-medium text-dark-medium">
                            Steve Jones
                          </td>
                        </tr>

                        <tr>
                          <td>Date Of Birth:</td>
                          <td className="font-medium text-dark-medium">
                            07.08.2016
                          </td>
                        </tr>

                        <tr>
                          <td>Roll:</td>
                          <td className="font-medium text-dark-medium">
                            10005
                          </td>
                        </tr>
                        <tr>
                          <td>Address:</td>
                          <td className="font-medium text-dark-medium">
                            House #10, Road #6, Australia
                          </td>
                        </tr>
                        <tr>
                          <td>Phone:</td>
                          <td className="font-medium text-dark-medium">
                            + 88 98568888418
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewStudentProfile;
