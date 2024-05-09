import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxSchool from "../../util/remote/ajaxSchool";
;

const TurnOnStaffLogin=(props)=>{

    const [loading, setLoading] = useState(false)
    const data = {
        school_id: props.schoolID,
      };

    const handleUpdate = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const server_response = await ajaxSchool.turnOnStaffLogin(data);
        setLoading(false);
        if(server_response.status==="OK"){
            toast.success(server_response.message);
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
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleUpdate}>Confirm<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Turn On Staff Login"
            id="model-off"
            size="md"
            footer={RenderFooter}
        >

        <div className="row">
        <div className="bg-white">
			    <div className="alert text-center">
				    <i className="fe fe-alert-circle fs-50 text-warning"></i>
			        <h3 className="mt-2 mb-1">Are you sure you want to turn on Staff Login?</h3>
				    <p className="mb-3 mb-3 tx-inverse">Staff will now be able to login from phone booth.</p>
				</div>
			</div>
        </div>
       
        </SystemModal>
    )
}

export default TurnOnStaffLogin
