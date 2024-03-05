import React, {useContext, useState} from "react";
import AppContainer from "../Structure/AppContainer";

import SystemModal from "../Common/SystemModal";
import Select from "react-select";
import toast, {Toaster} from "react-hot-toast";
import ajaxRegion from "../../util/remote/ajaxRegion";

import RegionContext from "../../Context/RegionContext";

function AddRegion() {
  const {getRegionList} = useContext(RegionContext);

  const [region, setRegion] = useState();

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (region.length > 0) {
      var data = {
        region_name: region,
      };
      const server_response = await ajaxRegion.createRegion(data);
      if (server_response.status === "OK") {
        getRegionList();
        toast.success(server_response.message);
        resetForm();
      } else {
        toast.error(server_response.message);
        // toast.error(server_response.details.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setRegion("");
  };

  const RenderFooter = (controls) => {
    return (
      <>
        <button
          className="btn-fill-lmd radius-30 text-light shadow-dark-pastel-red bg-dark-pastel-green"
          onClick={controls.close}>
          Close
        </button>
        <button
          type="submit"
          className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark"
          onClick={(e) => handleFormSubmission(e)}>
          Save
        </button>
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="Add region to the system"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        <Toaster />
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Add Region</h3>
              </div>
            </div>
            <form className="new-added-form">
              <div className="row">
                <div className="col-12-xxxl col-lg-6 col-12 form-group">
                  <label>Region Name *</label>
                  <input
                    type="text"
                    placeholder="geographical name of the region you want to add"
                    value={region}
                    className="form-control"
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </div>

                <div className="col-12 form-group mg-t-8">
                  <button
                    type="submit"
                    className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">
                    Save
                  </button>
                  <button
                    type="reset"
                    className="btn-fill-lg bg-blue-dark btn-hover-yellow">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </SystemModal>
    </div>
  );
}

export default AddRegion;
