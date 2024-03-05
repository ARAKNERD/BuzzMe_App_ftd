import React, {useState} from "react";
import SystemModal from "../../Components/Common/SystemModal";
import {Formik, Form, Field, ErrorMessage} from "formik";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";

function UpdateChargeRate(props) {
  var charge_details = props.id;
  const initialValues = {
    rate: "",
    type: "",
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    // const server_response = await ajaxChargeRate.updateChargeRate(rate_id,rate,type);
    // if(server_response.status==="OK"){

    // }
    // Handle form submission logic here
    console.log(values);
    // You can make API calls or perform other actions as needed

    // After handling submission, you can reset the form or perform other actions
    setSubmitting(false);
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
        <button
          className="btn ripple btn-dark"
          type="button"
          // onClick={}
        >
          save changes
        </button>
      </>
    );
  };
  return (
    <div>
      <SystemModal
        title="update charge rate"
        // id="model-update-cross"
        size="lg "
        footer={RenderFooter}>
        {/* <Toaster /> */}
        <div className="card height-auto col-lg-12">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Update charge Rate</h3>
              </div>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="new-added-form">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-6 form-group">
                    <label>Rate</label>
                    <Field
                      type="text"
                      name="rate"
                      // onChange={(e)=>}
                      placeholder=""
                      className="form-control"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-6 form-group">
                    <label>Type *</label>
                    <Field
                      as="select"
                      name="type"
                      className="select2 form-control">
                      <option value="">Please Select A Type *</option>
                    </Field>
                  </div>

                  <div
                    className="col-12 form-group mg-t-8"
                    style={{float: "right"}}>
                    <button
                      type="submit"
                      style={{float: "right"}}
                      className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark mr-auto ml-5">
                      Save
                    </button>
                    <button
                      type="reset"
                      style={{float: "right"}}
                      className="btn-fill-lg bg-blue-dark btn-hover-yellow">
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </SystemModal>
    </div>
  );
}

export default UpdateChargeRate;
