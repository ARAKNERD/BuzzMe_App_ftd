import React, { useState } from 'react'
import AppContainer from "../../Components/Structure/AppContainer";
import { Formik,Form,Field,ErrorMessage } from "formik";
import ajaxSchool from "../../util/remote/ajaxSchool";


function UpdateSchoolUser() {
 
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

  const [school_id,setSchoolID] = useState("")
  const [schoolName,setSchoolName] = useState("")
  const [contact,setContact] = useState("")
  const [email,setEmail] = useState("")
  const [region,setRegion] = useState("")
  const [district,setDistrict] = useState("")
  const [lat,setLat] = useState("")
  const [longitude,setLongitude] = useState("")
  const [address,setAddress] = useState("")


      const handleSubmit = async(values, { setSubmitting }) => {
    
        // const server_response = await ajaxSchool.updateSchool(school_id,school_name,contact,email,address,district,region,lat,lng, date_registered,registered_by);
        // if(server_response.status==="OK"){
    
        // }
        // Handle form submission logic here
        console.log(values);
        // You can make API calls or perform other actions as needed
    
        // After handling submission, you can reset the form or perform other actions
        setSubmitting(false);
    }



  return (
    <AppContainer title={"Update School User"}>
        <div className="card height-auto">
                    <div className="card-body">
                        <div className="heading-layout1">
                            <div className="item-title">
                                <h3>Update School User</h3>
                            </div>
                         
                        </div>
                        <Formik 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        >

                        <Form className="new-added-form">
                        <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Name *</label>
                                    <Field type="text"
                                    name="name"
                                    // onChange={(e)=>}
                                    placeholder="" className="form-control"/>
                                </div>
                                {/* <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Contact *</label>
                                    <Field type="text" 
                                    name={"contact"}
                                    placeholder="" className="form-control"/>
                                </div> */}
                               
                                <div className="col-xl-6 col-lg-6 col-6 form-group">
                                    <label>Username</label>
                                    <Field type="text" placeholder="" name="username" className="form-control"/>
                                </div>
                                {/* <div className="col-lg-6 col-12 form-group mg-t-30">
                                    <label className="text-dark-medium">Upload Student Photo (150px X 150px)</label>
                                    <input type="file" className="form-control-file"/>
                                </div> */}
                                <div className="col-12 form-group mg-t-8" style={{float:'right'}}>
                                    <button type="submit" style={{float:'right'}} className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark mr-auto ml-5">Update</button>
                                    {/* <button type="reset" style={{float:'right'}} className="btn-fill-lg bg-blue-dark btn-hover-yellow">Reset</button> */}
                                </div>
                          
                        </Form>
                        </Formik>

                    </div>
                </div>
    </AppContainer>
  )
}

export default UpdateSchoolUser