import React, {useContext, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";

import SystemModal from "../Common/SystemModal";
import Select from "react-select";
import RegionContext from "../../Context/RegionContext";
import toast, {Toaster} from "react-hot-toast";
import ajaxDistrict from "../../util/remote/ajaxDistrict";
import DistrictContext from "../../Context/DistrictContext";

function AddDistrict() {
  const {regionList} = useContext(DistrictContext);
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const {getDistrictList} = useContext(DistrictContext);

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (region.length > 0 && district.length > 0) {
      var data = {
        district_name: district,
        region: region,
      };
      const server_response = await ajaxDistrict.createDistrict(data);
      if (server_response.status === "OK") {
        getDistrictList();
        toast.success(server_response.message);
        resetForm();
      } else {
        toast.error(server_response.message);
        toast.error(server_response.details.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    // setRegion("");
    setDistrict("");
  };

  const RenderFooter = (controls) => {
    return (
      <>
        <button
          type="submit"
          className="btn-fill-lmd radius-30 text-light shadow-dark-pastel-red bg-dark-pastel-green"
          onClick={controls.close}>
          Close
        </button>
        <button
          onClick={(e) => handleFormSubmission(e)}
          className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">
          Save
        </button>
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="Add district to the system"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        <Toaster />
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Add District</h3>
              </div>
            </div>
            <form className="new-added-form">
              <div className="row">
                <div className="col-12-xxxl col-lg-6 col-12 form-group">
                  <label>Subject Name *</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder=""
                    className="form-control"
                  />
                </div>
                <div className="col-12-xxxl col-lg-6 col-12 form-group">
                  <label htmlFor="">Region</label>
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
            </form>
          </div>
        </div>
      </SystemModal>
    </div>
  );
}

export default AddDistrict;
