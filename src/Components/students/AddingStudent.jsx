import React, {useContext, useEffect, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import StudentContext from "../../Context/StudentContext";
import ajaxStudent from "../../util/remote/ajaxStudent";
import Select from "react-select";
import {Link} from "react-router-dom";
import SchoolContext from "../../Context/SchoolContext";
import AuthContext from "../../Context/AuthContext";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";

function AddingStudent() {
  const {getStudentList} = useContext(StudentContext);
  // const {schoolList} = useContext(SchoolContext);

  const [groupList, setGroupList] = useState(false);
  const {user} = useContext(AuthContext);
  const [group, setGroup] = useState("");
  // const [school, setSchool] = useState("");
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");

  const [names, setNames] = useState("");

  var school_id = user.school_user ? user.school_user.school.school_id : "";

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
        getStudentList();
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
      user.school_user?.school?.school_id
    );

    if (server_response.status === "OK") {
      setGroupList(server_response.details);
    }
  };

  useEffect(() => {
    getGroups();
  }, [user.school_user?.school?.school_id]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12">
          {/* <AddChargeRate /> */}
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
                <h6 className="card-title mb-4">Register New Student</h6>
              </div>

              <form onSubmit={(e) => handleAdd(e)} method="post">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Student Names*</label>
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
                    <label htmlFor="">Student Group</label>
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
                    <label>Registration No</label>
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
                    <label>Gender*</label>

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
                {/* <div className="mb-4">
                  <input
                    type="submit"
                    style={{float: "right"}}
                    className="btn btn-success"
                    value="Save Student Details"
                  />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddingStudent;
