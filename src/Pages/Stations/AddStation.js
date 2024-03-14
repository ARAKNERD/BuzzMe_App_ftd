import React, {useContext, useState} from "react";
import {toast} from "react-hot-toast";
import SchoolContext from "../../Context/SchoolContext";
import ajaxStation from "../../util/remote/ajaxStation";
import Select from "react-select";
import StationContext from "../../Context/StationContext";

function AddStation() {
  const [stationCode, setStationCode] = useState("");
  const [stationName, setStationName] = useState("");
  const [school, setSchool] = useState("");
  const {schoolList} = useContext(SchoolContext);
  const {getStationList} = useContext(StationContext);

  const data = {
    station_code: stationCode,
    station_name: stationName,
    school_id: school,
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (stationCode.length > 0 || stationName.length > 0) {
      const server_response = await ajaxStation.createStation(data);
      // console.log(server_response)
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getStationList();
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setStationCode("");
    setStationName("");
  };

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>Add New Calling Station</h3>
          </div>
        </div>
        <form
          onSubmit={(e) => handleAdd(e)}
          method="post"
          class="new-added-form">
          <div className="row">
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Station Code</label>
              <input
                type="text"
                value={stationCode}
                onChange={(e) => setStationCode(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-xl-12 col-lg-12 form-group">
                <label htmlFor="">School</label>
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
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5 ">
            <button
              type="submit"
              className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
              Save Calling Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStation;
