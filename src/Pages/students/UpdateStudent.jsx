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
function ImageModal(props) {
  const {getStudentList} = useContext(StudentContext);
  // var school_id = user.school_user ? school_user.school.school_id : "";
  var school_id = 1;

  const [groupList, setGroupList] = useState(false);
  const {user} = useContext(AuthContext);
  const [group, setGroup] = useState("");
  // const [school, setSchool] = useState("");
  const [parent, setParent] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");
  const [dob, setDOb] = useState("");
  // var school_id = user.school_user ? school_user.school.school_id : "";
  var school_id = 1;

  const handleAdd = async (e) => {
    e.preventDefault();

    if (regNo.length > 0 || names.length > 0) {
      var data = {
        group: group,
        school: school_id,
        parent: parent,
        reg_no: regNo,
        password: password,
        names: names,
      };

      const server_response = await ajaxStudent.createStudent(data);
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
        <div className="col-4 form-group mg-t-8">
          <button
            style={{float: "right"}}
            type="submit"
            className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
            onClick={controls.close}>
            Close
          </button>
        </div>

        <div className="col-4 form-group mg-t-8">
          <button
            style={{float: "right"}}
            type="submit"
            className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">
            Save changes
          </button>
        </div>
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

                  <form onSubmit={(e) => handleAdd(e)} method="post">
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
                        <label>Date of birth</label>
                        <input
                          type="text"
                          value={dob}
                          style={{border: "1px solid grey"}}
                          placeholder="student's registration number"
                          onChange={(e) => setDOb(e.target.value)}
                          className="form-control"
                        />
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

export default ImageModal;
