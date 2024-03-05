import React, {useState} from "react";
import SystemModal from "../../Components/Common/SystemModal";

function StudentCodeSlip(props) {
  const Print = () => {
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    window.print();
    window.location.reload();
    document.body.innerHTML = originalContents;
  };
  const RenderFooter = (controls) => {
    return (
      <>
        <button
          className="btn ripple btn-dark"
          type="button"
          onClick={controls.close}>
          Close
        </button>
        <button className="btn ripple btn-dark" type="button" onClick={Print}>
          print
        </button>
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="Image_review"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        {/* <Toaster /> */}
        <div className="" id="printablediv">
          <div className="mb-4">Student_codeSlip</div>
        </div>
      </SystemModal>
    </div>
  );
}

export default StudentCodeSlip;
