import React, {useContext, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxSchool from "../../util/remote/ajaxSchool";
import toast, {Toaster} from "react-hot-toast";
import SchoolContext from "../../Context/SchoolContext";
import Select from "react-select";

function AdminAddSchoolUser() {
  const {schoolList} = useContext(SchoolContext);
  const [names, setNames] = useState("");
  const [Username, setUsername] = useState("");
  const [school, setSchool] = useState("");

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (names.length > 0 && Username.length > 0) {
      var data = {
        names: names,
        username: Username,
        school: school,
      };
      const server_response = await ajaxSchool.createSchoolUser(data);
      if (server_response.status === "OK") {
        // getDistrictList();
        toast.success(server_response.message);
        // resetForm();
      } else {
        toast.error(server_response.message);
        toast.error(server_response.details.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  return (
    <AppContainer title="Register School Administrator">
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h5 style={{marginBottom:0}}>Add School Administrator</h5>
              <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>
            </div>
          </div>
          <Toaster />

          <form className="new-added-form" onSubmit={handleFormSubmission}>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-12 mt-1 form-group">
                <label> Names <span style={{color:"red"}}>*</span></label>
                <input
                  type="text"
                  placeholder="Enter name of the school administrator.."
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-xl-12 col-lg-12 col-12 form-group">
                <label>Username <span style={{color:"red"}}>*</span></label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-xl-12 col-lg-12 col-12 form-group">
                <label>Select School: <span style={{color:"red"}}>*</span></label>
                <Select
                  onChange={(e) => setSchool(e.school_id)}
                  getOptionLabel={(option) => option.school_name}
                  getOptionValue={(option) => option.school_id}
                  isSearchable
                  options={Array.isArray(schoolList) ? schoolList : []}
                  value={
                    Array.isArray(schoolList) &&
                    schoolList.find((value) => value.school_id === school)
                  }
                />
              </div>

              <div className="col-12 form-group mg-t-8">
                <button
                  type="submit"
                  className="btn-fill-lmd radius-30 text-light shadow-dark-pastel-green bg-dodger-blue">
                  Save User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppContainer>
  );
}

export default AdminAddSchoolUser;
