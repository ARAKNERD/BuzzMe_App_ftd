import React, { useState } from "react";
import AppContainer from '../../Components/Structure/AppContainer'
import { Formik,Form,Field,ErrorMessage } from "formik";
import ajaxSchool from "../../util/remote/ajaxSchool";

function AddContacts() {
    const initialValues = {
        contactName:"",
        contact:"",
        relationship:""
      }
    
      const handleSubmit = async(values, { setSubmitting }) => {
    
        // const server_response = await ajaxSchool.createStudentContact(contactName,contact,relationship);
        // if(server_response.status==="OK"){
    
        // }
        // Handle form submission logic here
        console.log(values);
        // You can make API calls or perform other actions as needed
    
        // After handling submission, you can reset the form or perform other actions
        setSubmitting(false);
    }
    
    
      return(
        <AppContainer title={"Add Contact"}>
        <div className="card height-auto">
                        <div className="card-body">
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h3>Add New Contact</h3>
                                </div>
                             
                            </div>
                            <Formik 
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            >
    
                            <Form className="new-added-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-6 form-group">
                                        <label>Contact Name *</label>
                                        <Field type="text"
                                        name="contactName"
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
                                        <label>Relationship</label>
                                        <Field type="text" placeholder="" name="relationship" className="form-control"/>
                                    </div>
                                   
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

export default AddContacts