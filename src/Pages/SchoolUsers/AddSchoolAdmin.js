import { useContext, useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import SchoolContext from "../../Context/SchoolContext";
import ajaxSchool from "../../util/remote/ajaxSchool";
import Select from "react-select";

const AddSchoolAdmin=(props)=>{

    const [loading, setLoading] = useState(false)
    const [names, setNames] = useState("")
    const [username, setUsername] = useState("")
    const {schoolList} = useContext(SchoolContext);
    const [school, setSchool] = useState("")

    const handleAdd = async (e) => {
      e.preventDefault();
  
      if (names.length > 0 || username.length >0) {
        const data = {
          names: names,
          username: username,
          school: school
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
      setNames("");
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
            <label htmlFor="">Names <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={names}
                      placeholder="Enter name of administrator.."
                      onChange={(e) => setNames(e.target.value)}
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
