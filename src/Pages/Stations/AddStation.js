import React, {useContext, useState} from "react";
import {toast} from "react-hot-toast";
import ajaxStation from "../../util/remote/ajaxStation";

function AddStation(props) {
  const [stationName, setStationName] = useState("");
  const [loading, setLoading] = useState(false)


  const data = {
    station_name: stationName
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (stationName.length > 0) {
      setLoading(true)
      const server_response = await ajaxStation.createStation(data);
      setLoading(false)
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
    setStationName("");
  };

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h5 style={{marginBottom:0}}>Add New Calling Station</h5>
            
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
          </div>
          <div className="mt-5">
          {loading && (<button type="submit" style={{float: "right"}} className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Saving...</button>)}
            {!loading && <button
              type="submit"
              className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
              Save Calling Station
            </button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStation;
