import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";

import SystemModal from "../Common/SystemModal";
import Select from "react-select";

function AddDistrict() {
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
          type="submit"
          className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">
          Save
        </button>
        <button
          type="reset"
          className="btn-fill-lg bg-blue-dark btn-hover-yellow">
          Reset
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
        {/* <Toaster /> */}
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
                  <input type="text" placeholder="" className="form-control" />
                </div>
                <div className="col-12-xxxl col-lg-6 col-12 form-group">
                  <label htmlFor="">Region</label>
                  <Select
                  // onChange={(e) => setSchool(e.school_id)}
                  // getOptionLabel={(option) => option.school_name}
                  // getOptionValue={(option) => option.school_id}
                  // isSearchable
                  // options={Array.isArray(schoolList) ? schoolList : []}
                  // value={
                  //   Array.isArray(schoolList) &&
                  //   schoolList.find((value) => value.school_id === school)
                  // }
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

export default AddDistrict;
