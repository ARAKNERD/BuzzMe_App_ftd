import React, {useState} from "react";
import SystemModal from "../Common/SystemModal";
// import toast, {Toaster} from "react-hot-toast";
import dictionary from "../../util/dictionary";
// import ajaxLaons from "../../util/remote/ajaxLaons";
function ImageModal(props) {
  const {getStudentList} = useContext(StudentContext);
  const {parentList} = useContext(ParentContext);
  const {schoolList} = useContext(SchoolContext);
  const [groupList, setGroupList] = useState(false);
  const {user} = useContext(AuthContext);
  const [group, setGroup] = useState("");
  const [school, setSchool] = useState("");
  const [parent, setParent] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (regNo.length > 0 || names.length > 0) {
      var data = {
        group: group,
        school: school,
        parent: parent,
        reg_no: regNo,
        password: password,
        names: names,
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
      toast.error("Complete all fields and try again");
    }
  };
  useEffect(() => {
    getGroups();
  }, [user.school_user?.school?.school_id]);

  const RenderFooter = (controls) => {
    return (
      <>
        <button
          className="btn ripple btn-dark"
          type="button"
          onClick={controls.close}>
          Close
        </button>
        <button
          className="btn ripple btn-dark"
          type="button"
          onClick={handleAdd}>
          save changes
        </button>
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="Image_review"
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
                    <h6 className="card-title mb-4">Add New Student</h6>
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

                      <div className=" col-md-6">
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

                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <label htmlFor="">Parent</label>
                        <Select
                          onChange={(e) => setParent(e.parent_id)}
                          getOptionLabel={(option) => option.parent_name}
                          getOptionValue={(option) => option.parent_id}
                          isSearchable
                          options={Array.isArray(parentList) ? parentList : []}
                          value={
                            Array.isArray(parentList) &&
                            parentList.find(
                              (value) => value.parent_id === parent
                            )
                          }
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                        <label htmlFor="">Password</label>
                        <input
                          type="password"
                          value={password}
                          style={{border: "1px solid grey"}}
                          placeholder="student's intial pass code"
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-12 form-group mg-t-8">
                      <button
                        style={{float: "right"}}
                        type="submit"
                        className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">
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
      </SystemModal>
    </div>
  );
}

export default ImageModal;
