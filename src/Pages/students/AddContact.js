import { useContext, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStudent from "../../util/remote/ajaxStudent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import RelationshipContext from "../../Context/RelationshipContext";
import Select from "react-select";

const AddContact=(props)=>{

    const [loading, setLoading] = useState(false)
    const [contactNumber,setContactNumber] =useState("")
    const [contactFirstName,setContactFirstName] =useState("")
    const [contactLastName,setContactLastName] =useState("")
    const [relationship,setRelationship] =useState("")
    const [gender,setGender] =useState("")
    const {relationList} = useContext(RelationshipContext);


    const data={
        student_id: props.studentID,
        first_name: contactFirstName,
        last_name: contactLastName,
        main_contact: contactNumber,
        relationship: relationship,
        gender: gender
    }

    const handleAdd = async(e) =>{
        e.preventDefault()
        if(contactFirstName.length>0 || contactNumber.length>0){
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
                <input onChange={(e)=>setContactFirstName(e.target.value)} style={{border: "1px solid grey"}} value={contactFirstName} type="text" placeholder="Enter first name of contact.." className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Last Name <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setContactLastName(e.target.value)} style={{border: "1px solid grey"}} value={contactLastName} type="text" placeholder="Enter last name of contact.." className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label>Gender <span style={{color:"red"}}>*</span></label>
                 <select
                      className="col-12 form-control"
                      value={gender}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setGender(e.target.value)}>
                      <option value={true}>Select..</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                </select>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Contact Number <span style={{color:"red"}}>*</span></label>
                <input onChange={(e)=>setContactNumber(e.target.value)} style={{border: "1px solid grey"}} value={contactNumber} type="text" placeholder="Enter telephone number of contact.." className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Relationship to Student <span style={{color:"red"}}>*</span></label>

                <Select
                      onChange={(e) => setRelationship(e.id)}
                      getOptionLabel={(option) => option.relationship}
                      getOptionValue={(option) => option.id}
                      isSearchable
                      options={Array.isArray(relationList) ? relationList : []}
                      value={
                        Array.isArray(relationList) &&
                        relationList.find((value) => value.id === relationship)
                      }
                    />
            </div>
       
        </SystemModal>
    )
}

export default AddContact
