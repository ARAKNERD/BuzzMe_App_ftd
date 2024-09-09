import React, {useState} from "react";
import {toast} from "react-hot-toast";
import ajaxStation from "../../util/remote/ajaxStation";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";

const AddStation=(props)=>{

    const [loading, setLoading] = useState(false)
    const [stationName, setStationName] = useState("")
    const data = {
      station_name: stationName
    };
    const handleAdd = async (e) => {
      e.preventDefault();
  
      if (stationName.length > 0) {
        setLoading(true)
        const server_response = await ajaxStation.createStation(data);
        setLoading(false)
        if (server_response.status === "OK") {
          toast.success(server_response.message);
          props.g()
          props.h()
          resetForm();
        } else {
          toast.error(server_response.message);
        }
      } else {
        toast.error("Complete all fields and try again");
      }
    };

    const resetForm = () => {
      setStationName("");
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
                        onClick={handleAdd}>Register Station<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Register New Station"
            id="model-register-station"
            size="md"
            footer={RenderFooter}
        >

          <div className="mb-4 col-12 form-group">
            <label htmlFor="">Station / Booth Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={stationName}
                      placeholder="Enter name of calling station.."
                      onChange={(e) => setStationName(e.target.value)}
                      className="form-control"
                    />
            </div>
       
        </SystemModal>
    )
}

export default AddStation
