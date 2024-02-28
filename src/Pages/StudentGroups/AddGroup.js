import React, { useContext, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Toaster, toast } from 'react-hot-toast';
import SchoolContext from "../../Context/SchoolContext";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import StudentGroupContext from "../../Context/StudentGroupContext";
import Select from 'react-select'

function AddGroup() {
    const {schoolList} = useContext(SchoolContext);
    const {getGroupList} = useContext(StudentGroupContext);
    const [groupName,setGroupName] =useState("")
    const [school,setSchool] =useState("")


    const handleAdd = async(e) =>{
        e.preventDefault()
    
        if(groupName.length>0){
            const server_response = await ajaxStudentGroup.createGroup(groupName,school);
            if(server_response.status==="OK"){
                
                toast.success(server_response.message)
                getGroupList() 
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
      setGroupName("")
  };


  return (
    <AppContainer title="Add New Student Group">
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        
        <div className="row">
      <div className="col-lg-12 col-md-12">
              <div className="card custom-card" style={{borderRadius: "10px"}}>
                    <div className="card-body">
                        <div>
                            <h6 className="card-title mb-4">Add New Student Group</h6>
                        </div>

                        <form onSubmit={(e)=>handleAdd(e)} method="post" class="new-added-form" >
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">Group Name</label>
                                    <input type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)} className="form-control"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-12 form-group">
                                    <label htmlFor="">School</label>
                                    <Select
                                            onChange={(e)=>setSchool(e.school_id)}
                                            getOptionLabel ={(option)=>option.school_name}
                                            getOptionValue ={(option)=>option.school_id}
                                            isSearchable
                                            options={Array.isArray(schoolList) ? schoolList:[]}
                                            value={Array.isArray(schoolList) && schoolList.find(( value ) => value.school_id===school)}
                                        />
                                </div>
                               

                                
                            </div>
                            <div className="mb-4">
                                <input type="submit" style={{float:"right"}} className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark mr-auto ml-5" value="Save Student Group"/>
                                
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>	
        
  </AppContainer>

)
}

export default AddGroup;
