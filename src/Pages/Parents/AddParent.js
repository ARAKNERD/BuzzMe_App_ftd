import React, { useContext, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ParentContext from "../../Context/ParentContext";
import ajaxParent from "../../util/remote/ajaxParent";
import { Toaster, toast } from 'react-hot-toast';

function AddParent() {
    const {getParentList} = useContext(ParentContext);
    const [parentName,setParentName] =useState("")
    const [userName,setUserName] =useState("")
    const [mainContact,setMainContact] =useState("")
    const [alternativeContact,setAlternativeContact] =useState("")
    const [address,setAddress] =useState("")
    const [NIN,setNIN] =useState("")

    const handleAdd = async(e) =>{
        e.preventDefault()
    
        if(parentName.length>0 || address.length>0 || mainContact.length>0 || userName.length>0 || NIN.length>0){
            const server_response = await ajaxParent.createParent(parentName,userName,mainContact,alternativeContact,address,NIN);
            if(server_response.status==="OK"){
                
                toast.success(server_response.message)
                getParentList() 
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

    const resetForm = () => {
      setParentName("")
      setUserName("")
      setNIN("")
      setAddress("")
      setMainContact("")
      setAlternativeContact("")
  };


  return (
    <AppContainer title="Add New Parent">
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        
        <div className="row">
      <div className="col-lg-12 col-md-12">
              <div className="card custom-card" style={{borderRadius: "10px"}}>
                    <div className="card-body">
                        <div>
                            <h6 className="card-title mb-4">Add New Parent</h6>
                        </div>

                        <form onSubmit={(e)=>handleAdd(e)} method="post" class="new-added-form" >
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">Parent Name</label>
                                    <input type="text" value={parentName} onChange={(e)=>setParentName(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">Username</label>
                                    <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">Main Contact</label>
                                    <input type="text" value={mainContact} onChange={(e)=>setMainContact(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">Alternative Contact</label>
                                    <input type="text" value={alternativeContact} onChange={(e)=>setAlternativeContact(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">Address</label>
                                    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">NIN</label>
                                    <input type="text" value={NIN} onChange={(e)=>setNIN(e.target.value)} className="form-control"/>
                                </div>

                                
                            </div>
                            <div className="mb-4">
                                <input type="submit" style={{float:"right"}} className="btn btn-success" value="Save Parent Details"/>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>	
        
  </AppContainer>

)
}

export default AddParent;
