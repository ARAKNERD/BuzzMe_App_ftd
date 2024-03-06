import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import {useContext} from "react";
import StudentContext from "../../Context/StudentContext";
import ajaxStudent from "../../util/remote/ajaxStudent";
import AuthContext from "../../Context/AuthContext";

import useStateCallback from "../../util/customHooks/useStateCallback";
import ViewStudentsContacts from "./ViewStudentsContacts";
import StudentCodeSlip from "./StudentCodeSlip";
import UpdateStudent from "./UpdateStudent";
import ChangeStatus from "./ChangeStatus";
import StudentProfil from "./StudentProfile";
function ViewStudents() {
  // const {studentList} = useContext(StudentContext);
  const {user} = useContext(AuthContext);
  useEffect(() => {
    getStudentList();
  }, []);
  const [studentList, setStudentList] = useState("");
  var school_id = user.school_user ? user.school_user.school.school_id : "";

  const getStudentList = async () => {
    var data = {
      school_id: school_id,
    };
    const server_response = await ajaxStudent.fetchStudentList(data);
    if (server_response.status === "OK") {
      //store results
      setStudentList(server_response.details);
    } else {
      //communicate error
      setStudentList("404");
    }
  };

  // ----------------------handles the view -----students contacts
  const [ViewContacts, setViewContacts] = useStateCallback(false);
  const handle_view_contact = (id) => {
    setViewContacts(false, () =>
      setViewContacts(<ViewStudentsContacts isOpen={true} id={id} />)
    );
  };
  // ----------------------handles the view -----students printable codeslip -modal
  const [ViewStudentSlip, setViewStudentSlip] = useStateCallback(false);
  const handle_view_slip = (id) => {
    setViewStudentSlip(false, () =>
      setViewStudentSlip(<StudentCodeSlip isOpen={true} id={id} />)
    );
  };
  // ----------------------handles the view -----students printable codeslipmodal----
  const [studentUpdater, setStudentUpdater] = useStateCallback(false);
  const handle_student_updater = (id) => {
    setStudentUpdater(false, () =>
      setStudentUpdater(<UpdateStudent isOpen={true} id={id} />)
    );
  };
  // ----------------------handles the--change--status modal-------------
  const [ChangeStaus, setChangeStaus] = useStateCallback(false);
  const handle_status_updater = (id) => {
    setChangeStaus(false, () =>
      setChangeStaus(<ChangeStatus isOpen={true} id={id} />)
    );
  };
  // ----------------------handles the--student--profile--modal-------------
  const [StudentProfile, setStudentProfile] = useStateCallback(false);
  const handle_student_profile = (id) => {
    setStudentProfile(false, () =>
      setStudentProfile(<StudentProfil isOpen={true} id={id} />)
    );
  };
  return (
    <AppContainer title="Students">
      <div className="col-lg-12">
        {StudentProfile}
        {ViewContacts}
        {ViewStudentSlip}
        {studentUpdater}
        {ChangeStaus}
        <div
          className="card custom-card"
          style={{marginTop: "25px", borderRadius: "10px"}}>
          <div className="card-body map-card">
            <TableHeader
              title="Students List"
              subtitle="List of all the students sorted according to the recently added"
            />
            <div className="border-top mt-3"></div>
            <div className="table-responsive">
              <table className="table display data-table text-nowrap">
                <thead>
                  <tr>
                    <th>StudentsID</th>
                    <th>Name</th>
                    <th>Student's code</th>
                    <th>reG_no</th>
                    <th>Date of birh</th>

                    <th>contacts</th>
                    <th>
                      student code <br /> slip
                    </th>
                    <th>student Profile</th>
                    <th>Update</th>
                    <th>status</th>
                    <th>change status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#223</td>
                    <td>mumbere Andrew</td>
                    <td className=" text-center text-primary">cd4252</td>
                    <td>38939635</td>
                    <td>12/12/1967 </td>

                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handle_view_contact(1)}>
                        view contacts
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handle_view_slip(1)}>
                        code slip
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handle_student_profile(1)}>
                        student Profile
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handle_student_updater(1)}>
                        Update student
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-success"> status</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handle_status_updater(1)}>
                        change status
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {!studentList && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewStudents;
