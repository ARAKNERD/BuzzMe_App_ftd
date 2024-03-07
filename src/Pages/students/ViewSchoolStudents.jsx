import React, {useEffect, useState} from "react";
import ajaxStudent from "../../util/remote/ajaxStudent";

import useStateCallback from "../../util/customHooks/useStateCallback";
import ViewStudentsContacts from "./ViewStudentsContacts";
import StudentCodeSlip from "./StudentCodeSlip";
import UpdateStudent from "./UpdateStudent";
import ChangeStatus from "./ChangeStatus";
import StudentProfil from "./StudentProfile";

function ViewSchoolStudents(props) {
  useEffect(() => {
    getStudentList();
  }, []);
  const [studentList, setStudentList] = useState("");
  const [studentLists, setStudentLists] = useState("404");

  const getStudentList = async () => {
    var data = {
      school: props.school,
      date_added: props.date_added,
      group: props.group_id,
    };
    const server_response = await ajaxStudent.fetchStudentList(data);
    if (server_response.status === "OK") {
      setStudentList(server_response.details);
    } else {
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
  const handle_student_updater = (student) => {
    setStudentUpdater(false, () =>
      setStudentUpdater(<UpdateStudent isOpen={true} student={student} />)
    );
  };
  // ----------------------handles the--change--status modal-------------
  const [ChangeStaus, setChangeStaus] = useStateCallback(false);
  const handle_status_updater = (id) => {
    setChangeStaus(false, () =>
      setChangeStaus(<ChangeStatus isOpen={true} student={id} />)
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
    <div>
      {StudentProfile}
      {ViewContacts}
      {ViewStudentSlip}
      {studentUpdater}
      {ChangeStaus}
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>All Students Data</h3>
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

          <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-xl-9 col-lg-9 col-9 form-group">
                {/* <Select
                  onChange={(e) => setParent(e.parent_id)}
                  getOptionLabel={(option) => option.parent_name}
                  getOptionValue={(option) => option.parent_id}
                  isSearchable
                  options={Array.isArray(parentList) ? parentList : []}
                  value={
                    Array.isArray(parentList) &&
                    parentList.find((value) => value.parent_id === parent)
                  }
                /> */}
              </div>
              <div className="col-1-xxxl col-xl-3 col-lg-3 col-3 form-group">
                <button
                  type="submit"
                  className="fw-btn-fill btn-gradient-yellow">
                  SEARCH
                </button>
              </div>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>School_name</th>
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
                {Array.isArray(studentList) &&
                  studentList.map((student, key) => (
                    <tr key={key}>
                      <td>{student.id}</td>
                      <td>{student.names}</td>
                      <td>{student.school.school_name}</td>
                      <td className="text-center text-dark">
                        {student.student_code}
                      </td>
                      <td className="text-center text-primary">
                        {student.reg_no}
                      </td>

                      <td>{student.dob}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handle_view_contact(student.id)}>
                          View Contacts
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handle_view_slip(student.id)}>
                          Code Slip
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handle_student_profile(student.id)}>
                          Student Profile
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handle_student_updater(student)}>
                          Update Student
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-success">Status</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handle_status_updater(student.id)}>
                          Change Status
                        </button>
                      </td>
                    </tr>
                  ))}

                {studentList === "404" ? (
                  <tr>
                    <td colSpan="13" className="text-center text-info">
                      No data found
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSchoolStudents;
