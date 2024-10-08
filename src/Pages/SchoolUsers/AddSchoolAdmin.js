import { useContext, useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import SchoolContext from "../../Context/SchoolContext";
import ajaxSchool from "../../util/remote/ajaxSchool";
import Select from "react-select";

const AddSchoolAdmin=(props)=>{

    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const {schoolList} = useContext(SchoolContext);
    const [school, setSchool] = useState("")
    const [gender, setGender] = useState("")

    const handleAdd = async (e) => {
      e.preventDefault();
  
      if (firstName.length > 0 || username.length >0) {
        const data = {
          first_name: firstName,
          last_name: lastName,
          username: username,
          school: school,
          gender: gender
        };
        setLoading(true)
        const server_response = await ajaxSchool.createSchoolUser(data);
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
      setUsername("");
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
            title="Register School Administrator"
            id="model-register-sch-admin"
            size="md"
            footer={RenderFooter}
        >

          <div className="mb-4 col-12 form-group">
            <label htmlFor="">First Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Enter first name of school administrator.."
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                    />
            </div>
            <div className="mb-4 col-12 form-group">
            <label htmlFor="">Last Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Enter last name of school administrator.."
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
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

export default AddSchoolAdmin
