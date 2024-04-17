import React, {useContext, useState} from "react";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import RateContext from "../../Context/RateContext";
import {toast} from "react-hot-toast";

function AddChargeRate() {
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  const {getRateList} = useContext(RateContext);

  const data = {
    rate: rate,
    type: type,
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (rate.length > 0 || type.length > 0) {
      const server_response = await ajaxChargeRate.createChargeRate(data);
      // console.log(server_response)
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getRateList();
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setRate("");
    setType("");
  };

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h5 style={{marginBottom:0}}>Add New Charge Rate</h5>
            <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>
          </div>
        </div>
        <form
          onSubmit={(e) => handleAdd(e)}
          method="post"
          class="new-added-form">
          <div className="row">
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Charge Type <span style={{color:"red"}}>*</span> </label>
              <select
                      className="col-12 form-control"
                      value={type}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setType(e.target.value)}>
                      <option value={true}>Select..</option>
                      <option value="SMS">Message / SMS</option>
                      <option value="CALL">Phone Call</option>
                    </select>
            </div>
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Cost <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                placeholder="Enter cost of each message or call.."
                value={rate}
                style={{border: "1px solid grey"}}
                onChange={(e) => setRate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5 ">
            <button
              type="submit"
              className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
              Save Charge Rate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChargeRate;
