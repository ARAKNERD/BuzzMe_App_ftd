import { useContext, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStation from "../../util/remote/ajaxStation";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import SchoolContext from "../../Context/SchoolContext";
import Select from "react-select";


const UpdateStation=(props)=>{

    const [loading, setLoading] = useState(false)
    const [stationName, setStationName] = useState(props.stationName);
    const [school, setSchool] = useState(props.schoolName);
    const {schoolList} = useContext(SchoolContext);

    const data={
        station_id: props.stationID,
        school_id: school,
        station_name: stationName
    }

    const handleUpdate = async(e) =>{
        e.preventDefault()
        if(stationName.length>0){
            setLoading(true)
            const server_response = await ajaxStation.updateStation(data);
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
                <label htmlFor="">School</label>
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

export default UpdateStation
