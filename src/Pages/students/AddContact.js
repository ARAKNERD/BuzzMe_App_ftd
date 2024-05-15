import { useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";

const AddContact=(props)=>{

    const [loading, setLoading] = useState(false)
    const [contactNumber,setContactNumber] =useState("")
    const [contactFirstName,setContactFirstName] =useState("")
    const [contactLastName,setContactLastName] =useState("")
    const [contactName,setContactName] =useState("")
    const [relationship,setRelationship] =useState("")

    const data={
        student_id: props.studentID,
        first_name: contactFirstName,
        last_name: contactLastName,
        main_contact: contactNumber,
        relationship: relationship
    }

    const handleAdd = async(e) =>{
        e.preventDefault()
        if(contactName.length>0 || contactNumber.length>0){
            setLoading(true)
            const server_response = await ajaxStudent.addContact(data);
            setLoading(false);
            if(server_response.status==="OK"){
                setContactFirstName("");
                setContactLastName("");
                setContactNumber("");
                setRelationship("");
                toast.success(server_response.message);
                props.g(props.studentID)
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
                        onClick={handleAdd}>Save Contact<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Register New Contact"
            id="model-new-contact"
            size="md"
            footer={RenderFooter}
        >

            <div className="mb-4 form-group border-1">
                <label htmlFor="">First Name <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setContactFirstName(e.target.value)} value={contactFirstName} type="text" placeholder="Enter first name of contact.." className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Last Name <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setContactLastName(e.target.value)} value={contactLastName} type="text" placeholder="Enter last name of contact.." className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Contact Number <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setContactNumber(e.target.value)} value={contactNumber} type="text" placeholder="Enter telephone number of contact.." className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Relationship <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setRelationship(e.target.value)} value={relationship} type="text" placeholder="Describe relationship with contact.." className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default AddContact
