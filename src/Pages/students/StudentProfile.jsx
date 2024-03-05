import React from "react";

import SystemModal from "../../Components/Common/SystemModal";
// import ajaxLaons from "../../util/remote/ajaxLaons";
function StudentProfile(props) {
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
        {/* <button className="btn ripple btn-dark" type="button" onClick={Print}>
          print image
        </button> */}
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="Students Profile"
        id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        {/* <Toaster /> */}
        <div className="" id="printablediv">
          <div className="card height-auto">
            <div className="card-body">
              <div className="single-info-details">
                <div className="item-content">
                  <div className="header-inline item-header">
                    <h3 className="text-dark-medium font-medium">
                      STUDENT NAMES
                    </h3>
                    <div className="header-elements">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-edit" />
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={Print}>
                            <i className="fas fa-print" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <table className="table table-bordered table-striped">
                        <tbody>
                          <tr>
                            <td>Name:</td>
                            <td className="font-medium text-dark-medium">
                              <i>student Name</i>
                            </td>
                          </tr>
                          <tr>
                            <td>student code:</td>
                            <td className="font-medium text-info">cdkff24f</td>
                          </tr>

                          <tr>
                            <td>date of birth:</td>
                            <td className="font-medium text-dark-medium">
                              12/12/1999
                            </td>
                          </tr>
                          <tr>
                            <td>Registration number:</td>
                            <td className="font-medium text-dark-medium">
                              #123532
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 mt-3">
                      <h3>students contacts</h3>
                      <table className="table table-bordered ">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Contact Holder</th>
                            <th>contact </th>
                            <th>Relationship </th>
                            <th>Contact status </th>
                            <th>change contact Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-medium text-dark-medium">#1</td>
                            <td className="font-medium text-dark-medium">
                              <i>parent</i>
                            </td>
                            <td className="font-medium text-info">
                              +25670343356
                            </td>
                            <td className="font-medium text-dark-medium">
                              mother
                            </td>
                            <td className="font-medium text-dark-medium">
                              <button className="btn btn-success">
                                status
                              </button>
                            </td>

                            <td className="font-medium text-dark-medium">
                              <button className="btn btn-success">
                                change
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SystemModal>
    </div>
  );
}

export default StudentProfile;
