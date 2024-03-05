import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxAccounts from "../../util/remote/ajaxAccounts";
import {Formik, Form, Field, ErrorMessage} from "formik";

function AddAccount() {
  const initialValues = {
    account_code: "",
    description: "",
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    // const server_response = await ajaxAccounts.createAccount(account_code,description);
    // if(server_response.status==="OK"){

    // }
    // Handle form submission logic here
    const data = JSON.stringify(values);
    console.log(data);
    // You can make API calls or perform other actions as needed

    // After handling submission, you can reset the form or perform other actions
    setSubmitting(false);
  };

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>Add New Account</h3>
          </div>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="new-added-form">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-6 form-group">
                <label>Account Code</label>
                <Field
                  type="text"
                  name="account_code"
                  // onChange={(e)=>}
                  placeholder=""
                  className="form-control"
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-6 form-group">
                <label>Description *</label>
                <Field
                  as="textarea" // Corrected from "text-area"
                  name="description"
                  className="select2 form-control"
                />
              </div>
              <div
                className="col-12 form-group mg-t-8"
                style={{float: "right"}}>
                <button // Corrected from "butto"
                  type="submit"
                  style={{float: "right"}}
                  className="col-lg-6 col-md-6 text-center btn-fill-lg btn-gradient-yellow btn-hover-bluedark mr-auto ml-5">
                  Save
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddAccount;
