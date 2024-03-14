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
  console.log(studentDetails);
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
  //   console.log(contacts);
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
  //   console.log(call_logs);
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
  const handle_student_updater = (studentDetails) => {
    setStudentUpdater(false, () =>
      setStudentUpdater(
        <UpdateStudent isOpen={true} student={studentDetails} />
      )
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
                    onClick={() => handle_student_updater(studentDetails)}>
                    Update Student
                  </button>
                  <button
                    className=" mx-5 btn-fill-md radius-30 text-light bg-martini shadow-martini "
                    onClick={() => handle_status_updater(studentDetails)}>
                    Change Status
                  </button>
                </div>
              </div>
              <div className="single-info-details">
                <div className="item-content">
                  <div className="header-inline item-header">
                    <h3 className="text-dark-medium font-medium">
                      Student Names
                    </h3>
                  </div>
                  {/* const [group, setGroup] = useState(raw_data.group.group_id);
                  const [regNo, setRegNo] = useState(raw_data.names); const
                  [names, setNames] = useState(raw_data.reg_no); const [gender,
                  setGender] = useState(raw_data.gender); */}
                  <div className="info-table table-responsive">
                    <table className="table text-nowrap">
                      <tbody>
                        <tr>
                          <td>Name:</td>
                          <td className="font-medium text-dark-medium">
                            {studentDetails && studentDetails.names}
                          </td>
                        </tr>
                        <tr>
                          <td>Class Group:</td>
                          <td className="font-medium text-dark-medium">
                            {studentDetails && studentDetails.group.group_name}
                          </td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td className="font-medium text-dark-medium">
                            {studentDetails && studentDetails.gender}
                          </td>
                        </tr>

                        <tr>
                          <td>Date Of Birth:</td>
                          <td className="font-medium text-dark-medium">
                            {studentDetails && studentDetails.dob}
                          </td>
                        </tr>

                        <tr>
                          <td>Student code:</td>
                          <td className="font-medium text-dark-medium">
                            {studentDetails && studentDetails.student_code}
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
        {/* student contact s  */}
        {/*  */}
        <div className="col-12">
          <div className="card height-auto">
            <div className="card-body">
              <div className="card-body">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h3> Students Contacts</h3>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table display data-table text-nowrap">
                    <thead>
                      <tr>
                        <th>contact Holder</th>
                        <th>contact_number</th>
                        <th>relationShip</th>
                        <th>status</th>
                        <th>Change status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(contacts) &&
                        contacts.map((item, key) => (
                          <>
                            <tr key={key}>
                              <td>{item.contact_name}</td>
                              <td>{item.contact_number}</td>
                              <td>{item.relationship}</td>
                              <td>{item.status}</td>
                              <td>
                                <button className="btn btn-info">
                                  Change statusip
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* student call logs  */}
        <div className="col-12">
          <div className="card height-auto">
            <div className="card-body">
              <div className="card-body">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h3> Students Call logs</h3>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table display data-table text-nowrap">
                    <thead>
                      <tr>
                        <th>call_type</th>
                        <th>contact Holder</th>
                        <th>contact</th>
                        <th>relationship</th>
                        <th>rate</th>
                        <th>amount_charged</th>
                        <th>duration</th>

                        <th>station_name</th>
                        <th>station_code</th>
                        <th>date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(call_logs) &&
                        call_logs.map((item, key) => (
                          <>
                            {/* {     
            "station": {
                "station_id": "1",
                "station_name": "Luzirass1",
                "station_code": "Luz_001"
            },
            "duration": "1",
            "contact": {
                "contact_id": "1",
                "contact_name": "Kamya bridget",
                "contact_number": "256703433934",
                "relationship": "Guardian"
            },
           
            "created_at": {
                "long_date": "08 Mar 2024 at 01:21 pm",
                "short_date": "08 Mar 2024",
                "when": "Today at 01:21 pm",
                "time": "01:21 pm",
                "date": "Today",
                "weekday": "Friday",
                "db": "2024-03-08"
            } */}
                            <tr>
                              <td>{item.call_type}</td>
                              <td>{item.contact.contact_name}</td>
                              <td>{item.contact.contact_number}</td>
                              <td>{item.contact.relationship}</td>
                              <td>{item.rate.rate}</td>
                              <td>{item.amount}</td>
                              <td>{item.duration}</td>
                              <td>{item.station.station_name}</td>
                              <td>{item.station.station_code}</td>
                              <td>{item.created_at.long_date}</td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
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
