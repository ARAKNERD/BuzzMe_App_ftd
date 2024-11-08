import { useContext, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxParent from "../../util/remote/ajaxParent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import Select from "react-select";
import RelationshipContext from "../../Context/RelationshipContext";


const AddStudentContact=(props)=>{

    const [loading, setLoading] = useState(false)
    const [contactPhone,setContactPhone] =useState("")
    const [contactName,setContactName] =useState("")
    const [relationship,setRelationship] =useState("")
    const {relationList} = useContext(RelationshipContext);

    const data={
        user_id: props.userID,
        contact_phone: contactPhone,
        contact_name: contactName, 
        relationship: relationship
    }

    const handleAdd = async(e) =>{
        e.preventDefault()
        if (relationship.length > 0) {
            setLoading(true)
            const server_response = await ajaxParent.addStudentContactByAdmin(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.h();
                props.j();
            }
            else{
                toast.error(server_response.message); 
            }
        } else {
            toast.error("Please select the relationship to the student!");
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
                        onClick={handleAdd}>Attach Contact<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Attach Parent / Contact"
            id="model-attach-guardian"
            size="md"
            footer={RenderFooter}
        >

        <div className="mb-4 col-12 form-group">
          <label htmlFor="">Contact Name <span style={{color:"red"}}>*</span></label>
          <input
            type="text"
            value={contactName}
            placeholder="Enter name of contact.."
            onChange={(e) => setContactName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-4 col-12 form-group">
          <label htmlFor="">Contact Phone <span style={{color:"red"}}>*</span></label>
          <input
            type="text"
            value={contactPhone}
            placeholder="Enter phone number.."
            onChange={(e) => setContactPhone(e.target.value)}
            className="form-control"
          />
        </div>
       
        <div className="mb-4 form-group border-1">
          <label htmlFor="">Relationship</label>
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

export default AddStudentContact
