import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxStudent from "../../util/remote/ajaxStudent";
;

const TurnOffStudentRestrictions=(props)=>{

    const [loading, setLoading] = useState(false)
   
    const handleUpdate = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const server_response = await ajaxStudent.turnOffRestrictions(props.studentID);
        setLoading(false);
        if(server_response.status==="OK"){
            toast.success(server_response.message);
            props.g()
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
            title="Turn Off Call Restrictions"
            id="model-off-std-restrictions"
            size="md"
            footer={RenderFooter}
        >

        <div className="row">
        <div className="bg-white">
			    <div className="alert text-center">
				    <i className="fe fe-alert-circle fs-50 text-warning"></i>
			        <h3 className="mt-2 mb-1">Are you sure you want to turn off call restrictions?</h3>
				    <p className="mb-3 mb-3 tx-inverse">This student will now be able to make calls to anyone even outside his / her contacts.</p>
				</div>
			</div>
        </div>
       
        </SystemModal>
    )
}

export default TurnOffStudentRestrictions
