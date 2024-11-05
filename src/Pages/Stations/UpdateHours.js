import { useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStation from "../../util/remote/ajaxStation";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";

const UpdateHours=(props)=>{

    const [loading, setLoading] = useState(false)
    const [startTime, setStartTime] = useState(props.startTime);
    const [endTime, setEndTime] = useState(props.endTime);

    const data={
        station_id: props.stationID,
        start_time: startTime,
        end_time: endTime
    }

    const handleUpdate = async(e) =>{
        e.preventDefault()
        if(startTime.length>0 || endTime.length>0){
            setLoading(true)
            const server_response = await ajaxStation.updateHours(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.g(props.page)
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
                        onClick={handleUpdate}>Save Changes<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Update Station Active Hours"
            id="model-update-hours"
            size="md"
            footer={RenderFooter}
        >

            <div className="mb-4 form-group border-1">
                <label htmlFor="">Start Time</label>
                <input onChange={(e)=>setStartTime(e.target.value)} style={{border: "1px solid grey"}} value={startTime} type="time" className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">End Time</label>
                <input onChange={(e)=>setEndTime(e.target.value)} style={{border: "1px solid grey"}} value={endTime} type="time" className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default UpdateHours
