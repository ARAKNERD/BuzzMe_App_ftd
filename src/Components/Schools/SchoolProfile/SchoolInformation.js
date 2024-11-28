import React, { useContext, useState } from "react";
import TurnOnCallRestrictions from "../TurnOnCallRestrictions";
import TurnOffCallRestrictions from "../TurnOffCallRestrictions";
import ajaxSchool from "../../../util/remote/ajaxSchool";
import toast from "react-hot-toast";
import DistrictContext from "../../../Context/DistrictContext";
import Select from 'react-select'
import useStateCallback from "../../../util/customHooks/useStateCallback";

function SchoolInformation({schoolProfile, getSchoolProfile, schoolId}) {
    const {districtList} = useContext(DistrictContext);
    const [modal, setModal] = useStateCallback(false);

    const [school_id,setSchoolID] = useState("")
    const [schoolName,setSchoolName] = useState("")
    const [contact,setContact] = useState("")
    const [email,setEmail] = useState("")
    const [district,setDistrict] = useState("")
    const [address,setAddress] = useState("")
    const [loading5,setLoading5] = useState(false)

    const [active,setActive] = useState(false)
    const handleActive = ()=> setActive(true)
    const handleInActive = ()=> setActive(false)

    const setSchoolUpdate = () =>{
        handleActive()
        setSchoolName(schoolProfile.school_name)
        setContact(schoolProfile.contact)
        setEmail(schoolProfile.email)
        setDistrict(schoolProfile.district_id)
        setAddress(schoolProfile.address)
        setSchoolID(schoolProfile.school_id)
    }
    
    const handleUpdate = async(event) => {

        event.preventDefault()
        var data = {
        school_name: schoolName,
        contact: contact,
        email: email,
        district: district,
        address: address,
        school_id: schoolId
        };
        setLoading5(true)
        const server_response = await ajaxSchool.updateSchool(data)
        setLoading5(false)
        if(server_response.status === "OK"){
            toast.success(server_response.message)
            getSchoolProfile()
            handleInActive()
        }
    };

    const restrictionsOn=()=>{
        setModal(false, ()=>setModal(<TurnOnCallRestrictions schoolID={schoolId} g={getSchoolProfile} isOpen={true}/>))
      
    }
    
      
    const restrictionsOff=()=>{
        setModal(false, ()=>setModal(<TurnOffCallRestrictions schoolID={schoolId} g={getSchoolProfile} isOpen={true}/>))
      
    }

    return (
        <>
            {modal}
            <div class="col-lg-12">
                <div class="cards">
                    <div class="card-body profile-card pt-4 d-flex flex-column gradient-my-blue">

                        <h3 style={{color:"white"}}>{schoolProfile.school_name?schoolProfile.school_name:"..."}</h3>
                        <h5 style={{color:"white"}}>{schoolProfile.district?schoolProfile.district:"..."}</h5>
                        <div class="social-links mt-2 align-items-center ">
                            {active?
                                <a href="#" onClick={handleInActive} className="btn btn-danger mr-3"><i className="fe fe-x"></i>Back</a>
                                :
                                <a href="#" onClick={setSchoolUpdate} className="btn btn-warning mr-3"><i className="far fa-edit mr-1"></i>Update Details</a>
                            }
                            {schoolProfile.is_restricted === "0"?
                                <a href="#" onClick={restrictionsOn} className="btn btn-warning mr-2"><i className="fa fa-power-off mr-1" style={{color:"green"}}></i>Turn On Call Restrictions</a>
                                :
                                <a href="#" onClick={restrictionsOff} className="btn btn-warning mr-2"><i className="fa fa-power-off mr-1" style={{color:"red"}}></i>Turn Off Call Restrictions</a>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="cards pt-3">
                    <div class="card-body profile-card pt-4 d-flex flex-column">
                        {active?
                            <>
                                <div className="box-header  border-0 pd-0">
                                    <div className="box-title fs-20 font-w600"> Update School Information</div>
                                </div>

                                <br/>

                                <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <div className="row row-sm">
                                            <div className="col-sm-12">
                                                    <label htmlFor="">School Name:<span style={{color:"red"}}>*</span></label>
                                                    <input type="text" value={schoolName} style={{border: "1px solid grey"}} onChange={(e)=>setSchoolName(e.target.value)} className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row row-sm">
                                            <div className="col-sm-6">
                                                <label htmlFor="">Contact:<span style={{color:"red"}}>*</span></label>
                                                <input type="text" value={contact} style={{border: "1px solid grey"}} onChange={(e)=>setContact(e.target.value)} className="form-control"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="">Email:<span style={{color:"red"}}>*</span></label>
                                                <input type="text" defaultValue={email} style={{border: "1px solid grey"}} onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row row-sm">
                                            <div className="col-sm-6">
                                                <label htmlFor="">Address:<span style={{color:"red"}}>*</span></label>
                                                <input type="text" defaultValue={address} style={{border: "1px solid grey"}} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="">District:<span style={{color:"red"}}>*</span></label>
                                                <Select
                                                    onChange={(e)=>setDistrict(e.district_id)}
                                                    getOptionLabel ={(option)=>option.district_name}
                                                    getOptionValue ={(option)=>option.district_id}
                                                    isSearchable
                                                    options={districtList}
                                                    defaultValue={Array.isArray(districtList) && districtList.find(( value ) => value.district_id===district)}
                                                />
                                            </div>   
                                        </div>
                                    </div>
                                                       
                                    {loading5 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Updating...</button>)}
                                    {!loading5 && <button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue">Update School Details</button>}
                                </form>
                            </>
                        :
                            <>
                                <div className="box-header  border-0 pd-0">
                                    <div className="box-title fs-20 font-w600">School Information</div>
                                </div>
                                <table className="table mb-0 mw-100 color-span">
                                  {schoolProfile && <tbody>
                                    <tr>
                                          <td className="py-2 px-0"> <span className="w-50">School Name </span> </td>
                                          <td>:</td>
                                          <td className="py-2 px-0"> <span className="">{schoolProfile.school_name}</span> </td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 px-0"> <span className="w-50">Contact</span> </td>
                                          <td>:</td>
                                          <td className="py-2 px-0"> <span className="">{schoolProfile.contact}</span> </td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 px-0"> <span className="w-50">Email</span> </td>
                                          <td>:</td>
                                          <td className="py-2 px-0"> <span className="">{schoolProfile.email}</span> </td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 px-0"> <span className="w-50">Address</span> </td>
                                          <td>:</td>
                                          <td className="py-2 px-0"> <span className="">{schoolProfile.address}</span> </td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 px-0"> <span className="w-50">District</span> </td>
                                          <td>:</td>
                                          <td className="py-2 px-0"> <span className="">{schoolProfile.district}</span> </td>
                                      </tr>
                                      
                                      <tr>
                                          <td className="py-2 px-0"> <span className="w-50">Call Security</span> </td>
                                          <td>:</td>
                                          <td className="py-2 px-0"> <span className="">{schoolProfile.is_restricted ==="0"?<span class="badge badge-success">Unrestricted</span>:<span class="badge badge-danger">Restricted</span>}</span> </td>
                                      </tr>
                                      
                                  </tbody>}
                                </table>
                            </>
                        }
                    </div>
                </div>
            </div>

        </>
        
    );
}

export default SchoolInformation;
