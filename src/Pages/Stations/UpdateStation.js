import { useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStation from "../../util/remote/ajaxStation";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";

const UpdateStation=(props)=>{

    const [loading, setLoading] = useState(false)
    const [stationNumber, setStationNumber] = useState(props.stationNumber);
    const [stationName, setStationName] = useState(props.stationName);
    const [startTime, setStartTime] = useState(props.startTime);
    const [endTime, setEndTime] = useState(props.endTime);

    const data={
        station_id: props.stationID,
        start_time: startTime,
        end_time: endTime,
        station_number: stationNumber,
        station_name: stationName
    }

    const handleUpdate = async(e) =>{
        e.preventDefault()
        if(stationName.length>0 || stationNumber.length>0){
            setLoading(true)
            const server_response = await ajaxStation.updateStation(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.g()
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
            title="Update Station Details"
            id="model-update-station"
            size="md"
            footer={RenderFooter}
        >

            <div className="mb-4 form-group border-1">
                <label htmlFor="">Station Name</label>
                <input onChange={(e)=>setStationName(e.target.value)} value={stationName} type="text" className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Station / IMEI Number</label>
                <input onChange={(e)=>setStationNumber(e.target.value)} value={stationNumber} type="text" className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Start Time</label>
                <input onChange={(e)=>setStartTime(e.target.value)} value={startTime} type="time" className="form-control"/>
            </div>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">End Time</label>
                <input onChange={(e)=>setEndTime(e.target.value)} value={endTime} type="time" className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default UpdateStation
