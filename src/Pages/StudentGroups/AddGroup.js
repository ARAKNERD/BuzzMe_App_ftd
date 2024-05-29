import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";

const AddGroup=(props)=>{

    const [loading, setLoading] = useState(false)
    const [groupName,setGroupName] =useState("")

    const handleAdd = async(e) =>{
        e.preventDefault()
        if(groupName.length>0){
            setLoading(true)
            const server_response = await ajaxStudentGroup.createGroup(groupName,props.schoolID);
            setLoading(false);
            if(server_response.status==="OK"){
                setGroupName("");
                toast.success(server_response.message);
                props.g(props.schoolID)
            }
            else{
                toast.error(server_response.message); 
            }
        }
        else{
            toast.error("Please enter all fields!")
        }  
    }
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleAdd}>Save Group<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Register New Group"
            id="model-new-st-group"
            size="md"
            footer={RenderFooter}
        >

            <div className="mb-4 form-group border-1">
                <label htmlFor="">Group Name <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setGroupName(e.target.value)} style={{border: "1px solid grey"}} value={groupName} type="text" placeholder="Enter group name.." className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default AddGroup
