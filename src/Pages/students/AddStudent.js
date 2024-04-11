import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Toaster, toast} from "react-hot-toast";
import AuthContext from "../../Context/AuthContext";
import ajaxStudent from "../../util/remote/ajaxStudent";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import TableHeader from "../../Components/Common/TableHeader";
import Select from "react-select";
import {Link} from "react-router-dom";

function AddStudent(props) {
  const {user} = useContext(AuthContext);
  const [groupList, setGroupList] = useState(false);
  const [studentsToday, setStudentsToday] = useState(false);
  const [group, setGroup] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");
  const [names, setNames] = useState("");
  var school_id = user.school_user?.school?.school_id;

  const getStudentsToday = async () => {
    var data = {
      school: school_id,
      group: "",
    };
    const server_response = await ajaxStudent.fetchStudentsToday(data);
    if (server_response.status === "OK") {
      setStudentsToday(server_response.details);
    } else {
      setStudentsToday("404");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (names.length > 0 && gender.length > 0) {
      var data = {
        group: group,
        school: school_id,
        reg_no: regNo,
        names: names,
        gender: gender,
      };

      const server_response = await ajaxStudent.createStudent(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getStudentsToday();
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Please fill in the required fields");
    }
  };

  

  const resetForm = () => {
    setNames("");
    setRegNo("");
  };

  const getGroups = async () => {
    const server_response = await ajaxStudentGroup.fetchGroupList(
      school_id
    );

    if (server_response.status === "OK") {
      setGroupList(server_response.details);
    }
  };

  useEffect(() => {
    getGroups();
  }, [school_id]);
  return (
    <AppContainer title="Add Student">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="pl-20" style={{float: "right"}}>
            <Link to={`/students/import`}>
              <button
                type="button"
                className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-dodger-blue">
                <i className="fa-solid fa-plus" /> Import Students
              </button>
            </Link>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Register New Student</h5>
            <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>

              </div>

              <form onSubmit={(e) => handleAdd(e)} method="post">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Student Names <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={names}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter name of student.."
                      onChange={(e) => setNames(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <label htmlFor="">Student Group <span style={{color:"red"}}>*</span></label>
                    <Select
                      onChange={(e) => setGroup(e.group_id)}
                      getOptionLabel={(option) => option.group_name}
                      getOptionValue={(option) => option.group_id}
                      isSearchable
                      options={Array.isArray(groupList) ? groupList : []}
                      value={
                        Array.isArray(groupList) &&
                        groupList.find((value) => value.group_id === group)
                      }
                    />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Registration Number </label>
                    <input
                      type="text"
                      value={regNo}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter registration number of student.."
                      onChange={(e) => setRegNo(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Gender <span style={{color:"red"}}>*</span></label>

                    <select
                      className="col-12 form-control"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}>
                      <option value={true}>Select..</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 form-group mg-t-8">
                  <button
                    style={{float: "right"}}
                    type="submit"
                    className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                    Save Student Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-12 col-md-12">
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
          <TableHeader
                  title="Recently Registered Students"
                  subtitle="List of the students registered today"
                />
          </div>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Student Code</th>
                  <th>Registration Number</th>
                  <th>Student Group</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(studentsToday) && studentsToday.length > 0 ? (
                      studentsToday.map((student, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{student.names}</td>
                          <td>{student.student_code}</td>
                          <td>{student.reg_no?student.reg_no:"Not recorded"}</td>
                          <td>{student.group?.group_name}</td>
                        </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="5" style={{textAlign:"center"}}>No students registered today.</td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
        </div>
      </div></div></div>
    </AppContainer>
  );
}

export default AddStudent;
