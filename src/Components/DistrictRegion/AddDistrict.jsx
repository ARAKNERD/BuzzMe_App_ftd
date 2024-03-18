import React, {useContext, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import Select from "react-select";
import RegionContext from "../../Context/RegionContext";
import ajaxDistrict from "../../util/remote/ajaxDistrict";
import DistrictContext from "../../Context/DistrictContext";

function AddDistrict() {
  const {regionList} = useContext(RegionContext);
  const {getDistrictList} = useContext(DistrictContext);
  const [districtName, setDistrictName] = useState("");
  const [region, setRegion] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (districtName.length > 0) {
      const data = {
        district_name: districtName,
        region: region,
      };
      const server_response = await ajaxDistrict.createDistrict(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getDistrictList();
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setDistrictName("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <br />
        <br />
        <br />
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Add New District</h5>
                <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>
              </div>

              <form
                onSubmit={(e) => handleAdd(e)}
                method="post"
                class="new-added-form">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-2 radius-30">
                    <label htmlFor="">District Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                      className=" colo-12 form-control"
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-2">
                    <label htmlFor="">Region <span style={{color:"red"}}>*</span></label>
                    <Select
                      onChange={(e) => setRegion(e.region_id)}
                      getOptionLabel={(option) => option.region_name}
                      getOptionValue={(option) => option.region_id}
                      isSearchable
                      options={Array.isArray(regionList) ? regionList : []}
                      value={
                        Array.isArray(regionList) &&
                        regionList.find((value) => value.region_id === region)
                      }
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5 ">
                  <button
                    type="submit"
                    className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                    Save District
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDistrict;
