import React, { useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Formik,Form,Field,ErrorMessage } from "formik";
import ajaxSchool from "../../util/remote/ajaxSchool";

function AddSchool() {
  const initialValues = {
    schoolName:"",
    contact:"",
    email:"",
    region:"",
    district:"",
    lat:"",
    longitude:"",
    address:""
  }

  const handleSubmit = async(values, { setSubmitting }) => {

    // const server_response = await ajaxSchool.createSchool(school_name,contact,email,address,district,region,lat,lng, date_registered,registered_by);
    // if(server_response.status==="OK"){

    // }
    // Handle form submission logic here
    console.log(values);
    // You can make API calls or perform other actions as needed

    // After handling submission, you can reset the form or perform other actions
    setSubmitting(false);
}


  return(
    <AppContainer title={"Add School"}>
    <div className="card height-auto">
                    <div className="card-body">
                        <div className="heading-layout1">
                            <div className="item-title">
                                <h3>Add New School</h3>
                            </div>
                         
                        </div>
                        <Formik 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        >

                        <Form className="new-added-form">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>School Name *</label>
                                    <Field type="text"
                                    name="schoolName"
                                    // onChange={(e)=>}
                                    placeholder="" className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Contact *</label>
                                    <Field type="text" 
                                    name={"contact"}
                                    placeholder="" className="form-control"/>
                                </div>
                               
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>E-Mail</label>
                                    <Field type="email" placeholder="" name="email" className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Region *</label>
                                    <Field as="select" name="region" className="select2 form-control">
                                    <option value="">Please Select Region *</option>

                                    <option value="Northern">Northern</option>

                                    <option value="Central">Central</option>

                                    </Field>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>District *</label>
                                    <Field as="select" name="district" className="select2 form-control">
                                      <option value="">Please Select District *</option>
                                        <option value="1">Kampala</option>
                                        <option value="2">Gulu</option>
                                        <option value="3">Kapchorwa</option>
                                    </Field>
                                   
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Address</label>
                                    <Field type="text" name="address" placeholder="" className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Latitude</label>
                                    <Field type="text" name="lat" placeholder="" className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Longitude</label>
                                    <Field type="text" name="longitude" placeholder="" className="form-control"/>
                                </div>
                             
                                {/* <div className="col-lg-6 col-12 form-group mg-t-30">
                                    <label className="text-dark-medium">Upload Student Photo (150px X 150px)</label>
                                    <input type="file" className="form-control-file"/>
                                </div> */}
                                <div className="col-12 form-group mg-t-8" style={{float:'right'}}>
                                    <button type="submit" style={{float:'right'}} className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark mr-auto ml-5">Save</button>
                                    <button type="reset" style={{float:'right'}} className="btn-fill-lg bg-blue-dark btn-hover-yellow">Reset</button>
                                </div>
                            </div>
                        </Form>
                        </Formik>

                    </div>
                </div>
                </AppContainer>
  )
}

export default AddSchool;
