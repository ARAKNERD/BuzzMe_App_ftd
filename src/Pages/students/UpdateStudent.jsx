import React, {useContext, useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import StudentContext from "../../Context/StudentContext";
import AuthContext from "../../Context/AuthContext";
import SchoolContext from "../../Context/SchoolContext";
import ParentContext from "../../Context/ParentContext";
import Select from "react-select";
import ajaxStudent from "../../util/remote/ajaxStudent";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import SystemModal from "../../Components/Common/SystemModal";

function UpdateStudent(props) {
  const {getStudentList} = useContext(StudentContext);
  const {user} = useContext(AuthContext);
  const raw_data = props.student;
  var school_id = user.school_user ? user.school_user.school.school_id : "";

  const [groupList, setGroupList] = useState(false);
  const [group, setGroup] = useState(raw_data.group.group_id);
  const [regNo, setRegNo] = useState(raw_data.names);
  const [names, setNames] = useState(raw_data.reg_no);
  const [gender, setGender] = useState(raw_data.gender);
  const handleAdd = async (e) => {
    e.preventDefault();

    if (regNo.length > 0 && names.length > 0) {
      var data = {
        student_id: raw_data.id,
        group_id: group,
        reg_no: regNo,
        names: names,
        gender: gender,
      };

      const server_response = await ajaxStudent.updateStudent(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getStudentList();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
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

  const RenderFooter = (controls) => {
    return (
      <>
        <button
          type="submit"
          className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
          onClick={handleAdd}>
          Update
        </button>
        <button
          type="submit"
          className="btn-fill-lmd radius-30 text-light shadow-red bg-red"
          onClick={controls.close}>
          Close
        </button>
        {/* <button className="btn ripple btn-dark" type="button" 
        onClick={Print}>
          print image
        </button> */}
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="UPDATE STUDENT"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="card custom-card" style={{borderRadius: "10px"}}>
                <div className="card-body">
                  <div>
                    <h6 className="card-title mb-4">Update Student</h6>
                  </div>

                  <form method="post">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                        <label>Student Names*</label>
                        <input
                          type="text"
                          value={names}
                          style={{border: "1px solid grey"}}
                          placeholder="student's names"
                          onChange={(e) => setNames(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      {/* <div className=" col-md-6">
                        <label htmlFor="">School</label>
                        <Select
                          onChange={(e) => setSchool(e.school_id)}
                          getOptionLabel={(option) => option.school_name}
                          getOptionValue={(option) => option.school_id}
                          isSearchable
                          options={Array.isArray(schoolList) ? schoolList : []}
                          value={
                            Array.isArray(schoolList) &&
                            schoolList.find(
                              (value) => value.school_id === school
                            )
                          }
                        />
                      </div> */}
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
                        <label>Reg No</label>
                        <input
                          type="text"
                          value={regNo}
                          style={{border: "1px solid grey"}}
                          placeholder="student's registration number"
                          onChange={(e) => setRegNo(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                        <label>Student's gender</label>

                        <select
                          className="col-12 form-control"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}>
                          <option value={true}>Please gender*</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
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
      </SystemModal>
    </div>
  );
}

export default UpdateStudent;
