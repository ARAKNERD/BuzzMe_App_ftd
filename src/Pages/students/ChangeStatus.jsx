import React from "react";
import SystemModal from "../../Components/Common/SystemModal";

function ChangeStatus() {
  const RenderFooter = (controls) => {
    return (
      <>
        <button
          className="btn ripple btn-dark"
          type="button"
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
        title="View students contacts"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        {/* <Toaster /> */}
        <div className="" id="printablediv">
          ChangeStatus
        </div>
      </SystemModal>
    </div>
  );
}

export default ChangeStatus;
