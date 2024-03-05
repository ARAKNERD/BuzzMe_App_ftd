import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxSchool from "../../util/remote/ajaxSchool";
import SchoolContext from "../../Context/SchoolContext";
import RegionContext from "../../Context/RegionContext";
import AdminContext from "../../Context/AdminContext";
import Select from 'react-select'
import { Toaster, toast } from 'react-hot-toast';
import ajaxDistrict from "../../util/remote/ajaxDistrict";

function AddSchool() {

    const {getSchoolList} = useContext(SchoolContext);
    const {regionList} = useContext(RegionContext);
    const {adminList} = useContext(AdminContext);
    const [contact,setContact] =useState("")
    const [districtList, setDistrictList] = useState(false)
    const [schoolName,setSchoolName] =useState("")
    const [email,setEmail] =useState("")
    const [address,setAddress] =useState("")
    const [district,setDistrict] =useState("")
    const [region,setRegion] =useState("")
    const [dateRegistered,setDateRegistered] =useState("")
    const [registeredBy,setRegisteredBy] =useState("")

    const data = {
        school_name: schoolName,
        contact: contact,
        email: email,
        address: address,
        district: district,
        region: region,
        date_registered: dateRegistered,
        registered_by: registeredBy
    };

    const data2 = {
        region: region
    };

    

    const handleAdd = async(e) =>{
        e.preventDefault()
    
        if(schoolName.length>0 || contact.length>0){
            const server_response = await ajaxSchool.createSchool(data);
            if(server_response.status==="OK"){
                
                toast.success(server_response.message)
                getSchoolList() 
                resetForm();
            }
            else{
                toast.error(server_response.message)
            } 
        }
        else{
            toast.error("Complete all fields and try again")
        }  
    }

    const getDistrictList = async() =>{
        const server_response = await ajaxDistrict.fetchDistrictListPerRegion(data2);
        console.log(server_response)
        if(server_response.status==="OK"){
                
            setDistrictList(server_response.details)
        }
    }

    const resetForm = () => {
      setSchoolName("")
      setContact("")
      setEmail("")
      setAddress("")
      setDateRegistered("")
    };

    useEffect(() => {
        getDistrictList()
      }, [data2])


  return(
    <AppContainer title={"Add School"}>
         <Toaster
            position="top-center"
            reverseOrder={false}
        />

        <div className="card height-auto">
            <div className="card-body">
                <div className="heading-layout1">
                    <div className="item-title">
                        <h3>Add New School</h3>
                    </div>       
                </div>
                <form onSubmit={(e)=>handleAdd(e)} method="post" class="new-added-form" >
                    <div className="row">
                        <div className="col-lg-6 col-12 form-group">
                            <label htmlFor="">School Name</label>
                            <input type="text" value={schoolName} onChange={(e)=>setSchoolName(e.target.value)} className="form-control"/>
                        </div>
                        <div className="col-lg-6 col-12 form-group">
                            <label htmlFor="">Contact</label>
                            <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="form-control"/>
                                    
                                </div>
                                <div className="col-lg-6 col-12 form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
                                    
                                </div>
                                <div className="col-lg-6 col-12 form-group">
                                    <label htmlFor="">Address</label>
                                    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-lg-6 col-12 form-group">
                                    <label htmlFor="">Region</label>
                                    <Select
                                            onChange={(e)=>setRegion(e.region_id)}
                                            getOptionLabel ={(option)=>option.region_name}
                                            getOptionValue ={(option)=>option.region_id}
                                            isSearchable
                                            options={Array.isArray(regionList) ? regionList:[]}
                                            value={Array.isArray(regionList) && regionList.find(( value ) => value.region_id===region)}
                                        />
                                </div>
                                {region ? (<div className="col-lg-6 col-12 form-group">
                                    <label htmlFor="">District</label>
                                    <Select
                                            onChange={(e)=>setDistrict(e.district_id)}
                                            getOptionLabel ={(option)=>option.district_name}
                                            getOptionValue ={(option)=>option.district_id}
                                            isSearchable
                                            options={Array.isArray(districtList) ? districtList:[]}
                                            value={Array.isArray(districtList) && districtList.find(( value ) => value.district_id===district)}
                                        />
                                </div>):""}
                                
                                <div className="col-lg-6 col-12 form-group">
                                    <label htmlFor="">Date Registered</label>
                                    <input type="date" value={dateRegistered} onChange={(e)=>setDateRegistered(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-lg-6 col-12 form-group">
                                    <label htmlFor="">Registered By</label>
                                    <Select
                                            onChange={(e)=>setRegisteredBy(e.id)}
                                            getOptionLabel ={(option)=>option.names}
                                            getOptionValue ={(option)=>option.id}
                                            isSearchable
                                            options={Array.isArray(adminList) ? adminList:[]}
                                            value={Array.isArray(adminList) && adminList.find(( value ) => value.id===registeredBy)}
                                        />
                                </div>

                                
                            </div>
                            <div className="mb-4">
                                <input type="submit" style={{float:"right"}} className="btn-fill-md text-light bg-dark-pastel-green" value="Save School Details"/>
                                {/* <button type="button" class="btn-fill-md text-light bg-dark-pastel-green">Success</button> */}
                            </div>

                        </form>

                    </div>
                </div>
                </AppContainer>
  )
}

export default AddSchool;
