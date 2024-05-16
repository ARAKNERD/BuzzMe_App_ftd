import { useContext, useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxSchool from "../../util/remote/ajaxSchool";
import SchoolContext from "../../Context/SchoolContext";
import Select from "react-select";

const AddBoothAssistant=(props)=>{

    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [contact, setContact] = useState("")
    const {schoolList} = useContext(SchoolContext);
    const [school, setSchool] = useState("")


    const handleAdd = async (e) => {
      e.preventDefault();
  
      if (firstName.length > 0 || contact.length >0) {
        const data = {
          first_name: firstName,
          last_name: lastName,
          contact: contact,
          school: school
        };
        setLoading(true)
        const server_response = await ajaxSchool.createBoothAssistant(data);
        setLoading(false)
        if (server_response.status === "OK") {
          toast.success(server_response.message, {duration: 5000});
          props.g();
          resetForm();
        } else {
          toast.error(server_response.message);
        }
      } else {
        toast.error("Complete all fields and try again");
      }
    };

    const resetForm = () => {
      setFirstName("");
      setLastName("");
      setContact("");
    };
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleAdd}>Register Assistant<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Register Booth Assistant"
            id="model-register-booth-asst"
            size="md"
            footer={RenderFooter}
        >

          <div className="mb-4 col-12 form-group">
            <label htmlFor="">First Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Enter first name of booth assistant.."
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
            <label htmlFor="">Last Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Enter last name of booth assistant.."
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
            <label htmlFor="">Contact <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={contact}
                      placeholder="Enter contact.."
                      onChange={(e) => setContact(e.target.value)}
                      className=" colo-12 form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
            <label htmlFor="">School <span style={{color:"red"}}>*</span></label>
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
            </div>
       
        </SystemModal>
    )
}

export default AddBoothAssistant
