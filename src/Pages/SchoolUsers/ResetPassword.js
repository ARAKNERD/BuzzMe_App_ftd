import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxUser from "../../util/remote/ajaxUser";
;

const ResetPassword=(props)=>{

    const [loading, setLoading] = useState(false)
    const data = {
        account_id: props.accountID,
      };

    const handleUpdate = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const server_response = await ajaxUser.resetUserPassword(data);
        console.log(server_response)
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
                    <button className="btn ripple btn-dark" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn ripple btn-success`} 
                        onClick={handleUpdate}>Confirm Re-set</button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Reset Password"
            id="model-reset-pass"
            size="md"
            footer={RenderFooter}
        >

        <div className="row">
        <div className="bg-white">
			    <div className="alert text-center">
				    <i className="fe fe-alert-circle fs-50 text-warning"></i>
			        <h3 className="mt-2 mb-1">Are you sure you want to re-set this user's password?</h3>
				    <p className="mb-3 mb-3 tx-inverse">Password will be re-set to 1234.</p>
				</div>
			</div>
        </div>
       
        </SystemModal>
    )
}

export default ResetPassword
