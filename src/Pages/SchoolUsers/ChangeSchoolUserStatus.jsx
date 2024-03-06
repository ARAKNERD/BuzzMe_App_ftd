import React from "react";
import SystemModal from "../../Components/Common/SystemModal";

function ChangeSchoolUserStatus() {
  const RenderFooter = (controls) => {
    return (
      <>
        <button
          type="submit"
          className="btn-fill-lmd  radius-30 text-light shadow-dark-pastel-green bg-dark-pastel-green">
          Save
        </button>
        <button
          type="submit"
          className="btn-fill-lmd radius-30 text-light shadow-red bg-red"
          onClick={controls.close}>
          Close
        </button>
        {/* <button className="btn ripple btn-dark" type="button" 
        onClick={Print}>
          print image
        </button> */}
      </>
    );
  };

  return (
    <div>
      <SystemModal
        title="Change School User Status"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        {/* <Toaster /> */}
        <div className="" id="printablediv">
          <form className="new-added-form">
            <div className="row">
              <div className=" col-lg-12 col-lg-12 form-group">
                <label>Select status</label>
                <select className="form-control">
                  <option value="0">Please Select</option>
                  <option value="1">activate</option>
                  <option value="2">Inactivate</option>
                </select>
              </div>

              <div className="col-12 form-group mg-t-8"></div>
            </div>
          </form>
        </div>
      </SystemModal>
    </div>
  );
}

export default ChangeSchoolUserStatus;
