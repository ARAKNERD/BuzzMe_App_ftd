import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import Loader from "../Common/Loader";
import SystemModal from "../Common/SystemModal";
import Select from "react-select";
import SchoolContext from "../../Context/SchoolContext";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";

const CreateTransfer=(props)=>{

    const [loading, setLoading] = useState(false)
    const [school,setSchool] =useState("")
    const [group,setGroup] =useState("")
    const {schoolList} = useContext(SchoolContext);

    const [groupList, setGroupList] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault(); 
        if(group>0){
            setLoading(true)
            const server_response = await ajaxStudent.transferStudent(props.studentID, props.roleID==="3"?props.schoolID:school, group);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.g(e)
            }
            else{
                toast.error(server_response.message); 
            }
        }
        else{
            toast.error("Please select a student group!")
        }  
    }

    const getGroups = async () => {
        const server_response = await ajaxStudentGroup.fetchGroupList(props.roleID==="3"?props.schoolID:school, group);
      
        if (server_response.status === "OK") {
          setGroupList(server_response.details);
        } else {
          setGroupList([]);
        }
      };
    
      useEffect(() => {
        getGroups();
      }, [props.roleID==="3"?props.schoolID:school, group]);
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleSubmit}>Confirm Transfer<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Complete Student Transfer"
            id="model-new-stdent-transfer"
            size="md"
            footer={RenderFooter}
        >

            {props.roleID === "3"?<>
            <label htmlFor="">New School <span style={{color:"red"}}>*</span></label>
            <p><b>{props.schoolName}</b></p></>
            
            
            :<div className="mb-4 form-group border-1">
                <label htmlFor="">New School <span style={{color:"red"}}>*</span></label>
                <Select
                      onChange={(e) => setSchool(e.school_id)}
                      getOptionLabel={(option) => option.school_name}
                      getOptionValue={(option) => option.school_id}
                      isSearchable
                      options={Array.isArray(schoolList) ? schoolList : []}
                      value={
                        Array.isArray(schoolList) &&
                        schoolList.find((value) => value.school_id === school)
                      }
                    />
            </div>}
           
            <div className="mb-4 form-group border-1">
                <label htmlFor="">New Group <span style={{color:"red"}}>*</span></label>

                <Select
                      onChange={(e) => setGroup(e.group_id)}
                      getOptionLabel={(option) => option.group_name}
                      getOptionValue={(option) => option.group_id}
                      isSearchable
                      options={Array.isArray(groupList) ? groupList : []}
                      value={
                        Array.isArray(groupList) &&
                        groupList.find((value) => value.group_id === group)
                      }
                    />
            </div>
       
        </SystemModal>
    )
}

export default CreateTransfer
