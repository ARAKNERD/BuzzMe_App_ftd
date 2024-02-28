import React, { useContext, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Toaster, toast } from 'react-hot-toast';
import StudentContext from "../../Context/StudentContext";
import ajaxStudent from "../../util/remote/ajaxStudent";
import Select from 'react-select'
import ParentContext from "../../Context/ParentContext";
import SchoolContext from "../../Context/SchoolContext";
import StudentGroupContext from "../../Context/StudentGroupContext";

function AddStudent() {
    const {getStudentList} = useContext(StudentContext);
    const {parentList} = useContext(ParentContext);
    const {schoolList} = useContext(SchoolContext);
    const {groupList} = useContext(StudentGroupContext);
    const [group,setGroup] =useState("")
    const [school,setSchool] =useState("")
    const [parent,setParent] =useState("")
    const [regNo,setRegNo] =useState("")
    const [password,setPassword] =useState("")
    const [names,setNames] =useState("")

    const handleAdd = async(e) =>{
        e.preventDefault()
    
        if(regNo.length>0 || names.length>0){
            const server_response = await ajaxStudent.createStudent(group,school,parent,regNo,password,names);
            if(server_response.status==="OK"){
                
                toast.success(server_response.message)
                getStudentList() 
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
      setNames("")
      setPassword("")
      setRegNo("")
  };


  return (
    <AppContainer title="Add New Student">
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        
        <div className="row">
      <div className="col-lg-12 col-md-12">
              <div className="card custom-card" style={{borderRadius: "10px"}}>
                    <div className="card-body">
                        <div>
                            <h6 className="card-title mb-4">Add New Student</h6>
                        </div>

                        <form onSubmit={(e)=>handleAdd(e)} method="post">
                            <div className="row">
                                <div className="mb-4 col-md-6">
                                    <label htmlFor="">Student Names</label>
                                    <input type="text" value={names} onChange={(e)=>setNames(e.target.value)} className="form-control"/>
                                </div>
                                <div className="mb-4 col-md-6">
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
                                <div className="mb-4 col-md-6">
                                    <label htmlFor="">Student Group</label>
                                    <Select
                                            onChange={(e)=>setGroup(e.group_id)}
                                            getOptionLabel ={(option)=>option.group_name}
                                            getOptionValue ={(option)=>option.group_id}
                                            isSearchable
                                            options={Array.isArray(groupList) ? groupList:[]}
                                            value={Array.isArray(groupList) && groupList.find(( value ) => value.group_id===group)}
                                        />
                                    
                                </div>
                                <div className="mb-4 col-md-6">
                                    <label htmlFor="">Reg No</label>
                                    <input type="text" value={regNo} onChange={(e)=>setRegNo(e.target.value)} className="form-control"/>
                                </div>
                                <div className="mb-4 col-md-6">
                                    <label htmlFor="">Password</label>
                                    <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control"/>
                                </div>
                                <div className="mb-4 col-md-6">
                                    <label htmlFor="">Parent</label>
                                    <Select
                                            onChange={(e)=>setParent(e.parent_id)}
                                            getOptionLabel ={(option)=>option.parent_name}
                                            getOptionValue ={(option)=>option.parent_id}
                                            isSearchable
                                            options={Array.isArray(parentList) ? parentList:[]}
                                            value={Array.isArray(parentList) && parentList.find(( value ) => value.parent_id===parent)}
                                        />
                                    
                                </div>

                                
                            </div>
                            <div className="mb-4">
                                <input type="submit" style={{float:"right"}} className="btn btn-success" value="Save Student Details"/>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>	
        
  </AppContainer>

)
}

export default AddStudent;
