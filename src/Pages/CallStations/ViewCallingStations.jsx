import React, {useEffect, useState} from "react";
import ajaxStudent from "../../util/remote/ajaxStudent";

import {Link} from "react-router-dom";

function ViewCallingStations(props) {
  useEffect(() => {
    getStudentList();
  }, []);
  const [studentList, setStudentList] = useState("");

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

  return (
    <div>
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

                  <th>student Profile</th>

                  <th>status</th>

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
                        <Link
                          className="btn btn-secondary"
                          to={`/students/profile/${student.id}`}>
                          Student Profile
                        </Link>
                      </td>

                      <td>
                        <button className="btn btn-success">Status</button>
                      </td>
                      <td></td>
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

export default ViewCallingStations;
