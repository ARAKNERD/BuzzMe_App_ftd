import React, {useContext, useState} from "react";
import {toast} from "react-hot-toast";
import SchoolContext from "../../Context/SchoolContext";
import ajaxStation from "../../util/remote/ajaxStation";
import Select from "react-select";

function AddStation(props) {
  const [stationCode, setStationCode] = useState("");
  const [stationName, setStationName] = useState("");
  const [school, setSchool] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const {schoolList} = useContext(SchoolContext);

  const data = {
    station_number: stationCode,
    station_name: stationName,
    school_id: school,
    start_time: startTime,
    end_time: endTime
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (stationCode.length > 0 || stationName.length > 0) {
      const server_response = await ajaxStation.createStation(data);
      // console.log(server_response)
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        props.g()
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
    setEndTime("");
    setStartTime("");
  };

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h5 style={{marginBottom:0}}>Add New Calling Station</h5>
            <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>
          </div>
        </div>
        <form
          onSubmit={(e) => handleAdd(e)}
          method="post"
          class="new-added-form">
          <div className="row">
            <div className="col-lg-12 col-12 mt-1 form-group">
              <label htmlFor="">Name <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                placeholder="Enter name of calling station.."
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Station / IMEI Number <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                value={stationCode}
                placeholder="Enter IMEI number of station.."
                onChange={(e) => setStationCode(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-xl-12 col-lg-12 form-group">
                <label htmlFor="">School <span style={{color:"red"}}>*</span></label>
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
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Start Time <span style={{color:"red"}}>*</span></label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">End Time <span style={{color:"red"}}>*</span></label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-control"
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
