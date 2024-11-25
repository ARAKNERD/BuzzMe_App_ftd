import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxAdmin from "../../util/remote/ajaxAdmin";

const AddAdmin=(props)=>{

    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")

    const handleAdd = async (e) => {
      e.preventDefault();
  
      if (firstName.length > 0 ||lastName.length > 0|| username.length >0) {
        const data = {
          first_name: firstName,
          last_name: lastName,
          username: username,
          gender: gender
        };
        setLoading(true)
        const server_response = await ajaxAdmin.createAdmin(data);
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
      setUsername("");
      setFirstName("");
      setLastName("");
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
                        onClick={handleAdd}>Register Admin<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Register Administrator"
            id="model-register-admin"
            size="md"
            footer={RenderFooter}
        >

          <div className="mb-4 col-12 form-group">
            <label htmlFor="">First Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Enter first name of administrator.."
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
            <label htmlFor="">Last Name<span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Enter last name of administrator.."
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
            <label htmlFor="">Username <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={username}
                      placeholder="Enter username.."
                      onChange={(e) => setUsername(e.target.value)}
                      className=" colo-12 form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
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
       
        </SystemModal>
    )
}

export default AddAdmin
