import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import Select from "react-select";
import RateContext from "../../../Context/RateContext";
import SchoolContext from "../../../Context/SchoolContext";
import ajaxChargeRate from "../../../util/remote/ajaxChargeRate";

function AddChargeRate(props) {
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  const [school, setSchool] = useState("");
  const [category, setCategory] = useState("");
  const {getRateList, typeList, getSchoolRates, getTypeList} = useContext(RateContext);
  const {schoolList} = useContext(SchoolContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    getTypeList();
}, []);

  const data = {
    rate: rate,
    type: type,
  };

  const data2 = {
    rate: rate,
    type: type,
    school: school
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if(category ==="Default"){
      if (rate.length > 0 || type.length > 0) {
        setLoading(true)
        const server_response = await ajaxChargeRate.createChargeRate(data);
        setLoading(false)
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
    }else{
      if (rate.length > 0 || type.length > 0) {
        setLoading2(true)
        const server_response = await ajaxChargeRate.createSchoolRate(data2);
        setLoading2(false)
        if (server_response.status === "OK") {
          toast.success(server_response.message);
          getSchoolRates();
          resetForm();
        } else {
          toast.error(server_response.message);
        }
      } else {
        toast.error("Complete all fields and try again");
      }
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
              <label htmlFor="">Rate Category <span style={{color:"red"}}>*</span> </label>
              <select className="col-12 form-control" value={category} style={{border: "1px solid grey"}} onChange={(e) => setCategory(e.target.value)}>
                <option value={true}>Select...</option>
                <option value="Default">Default Rate</option>
                <option value="School">School Rate</option>
              </select>
            </div>
            <div className="col-lg-12 col-12 form-group">
              <label htmlFor="">Communication / Charge Type <span style={{color:"red"}}>*</span> </label>
              <Select
                onChange={(e) => setType(e.type)}
                getOptionLabel={(option) => option.type}
                getOptionValue={(option) => option.type}
                isSearchable
                options={Array.isArray(typeList) ? typeList : []}
                value={
                  Array.isArray(typeList) &&
                  typeList.find((value) => value.type === type)}
              />
            </div>
            {category === "Default"? "" :<div className="col-lg-12 col-12 form-group">
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
            </div>}
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
          <div className="mt-5">
          {loading2 && (<button type="submit" className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Saving...</button>)}
            {!loading2 && <button
              type="submit"
              className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
              Save Charge Rate
            </button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChargeRate;
