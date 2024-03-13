import React, {useContext, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import toast, {Toaster} from "react-hot-toast";
import SchoolContext from "../../Context/SchoolContext";
import Select from "react-select";
import ajaxCallStation from "../../util/remote/ajaxCallStation";
function AddCallStation() {
  const {schoolList} = useContext(SchoolContext);
  // console.log(schoolList);
  const [names, setNames] = useState("");
  const [code, setCode] = useState("");
  const [school, setSchool] = useState("");

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (names.length > 0 && code.length > 0) {
      var data = {
        station_name: names,
        station_code: code,
        school_id: school,
      };
      const server_response = await ajaxCallStation.CreateCallStation(data);
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
    <AppContainer title="Add new call station">
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Add New School User</h3>
            </div>
          </div>
          <Toaster />

          <form className="new-added-form" onSubmit={handleFormSubmission}>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-12 form-group">
                <label> call station_name *</label>
                <input
                  type="text"
                  placeholder="call station name"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-xl-12 col-lg-12 col-12 form-group">
                <label>call Station code *</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-xl-12 col-lg-12 col-12 form-group">
                <label>Select school *</label>
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
                  Save station
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppContainer>
  );
}

export default AddCallStation;
