import React, {useContext, useEffect, useState} from "react";
import ajaxStudent from "../../util/remote/ajaxStudent";
import AuthContext from "../../Context/AuthContext";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ViewStudentsContacts from "./ViewStudentsContacts";
import StudentCodeSlip from "./StudentCodeSlip";
import UpdateStudent from "./UpdateStudent";
import ChangeStatus from "./ChangeStatus";
import StudentProfil from "./StudentProfile";

function ViewSchoolStudents() {
  const {user} = useContext(AuthContext);
  useEffect(() => {
    getStudentList();
  }, []);
  const [studentList, setStudentList] = useState("");
  // var school_id = user.school_user ? user.school_user.school.school_id : "";
  var school_id = 1;
  const getStudentList = async () => {
    var data = {
      school_id: school_id,
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
              <div className="col-11-xxxl col-xl-9 col-lg-9 col-9 form-group">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSchoolStudents;
