import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxStation from "../../util/remote/ajaxStation";
;

const DeActivateStation=(props)=>{

    const [loading, setLoading] = useState(false)
    const data = {
        station_id: props.stationID,
      };

    const handleUpdate = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const server_response = await ajaxStation.deactivateStation(data);
        setLoading(false);
        if(server_response.status==="OK"){
            toast.success(server_response.message);
            props.g(props.school)
        }
        else{
            toast.error(server_response.message); 
        } 
    }
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn ripple btn-dark" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn ripple btn-success`} 
                        onClick={handleUpdate}>De-activate Station</button>
                    </>
        }
    }

    return(
        <SystemModal
            title="De-Activate Station"
            id="model-deactivate"
            size="md"
            footer={RenderFooter}
        >

        <div className="row">
        <div className="bg-white">
			    <div className="alert text-center">
				    <i className="fe fe-alert-circle fs-50 text-warning"></i>
			        <h3 className="mt-2 mb-1">Are you sure you want to de-activate this calling station?</h3>
				    <p className="mb-3 mb-3 tx-inverse">This station will not be able to make calls.</p>
				</div>
			</div>
        </div>
       
        </SystemModal>
    )
}

export default DeActivateStation
