import { useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxStation from "../../util/remote/ajaxStation";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxStudent from "../../util/remote/ajaxStudent";
import ajaxBank from "../../util/remote/ajaxBank";

const ActivateAccount=(props)=>{

    const [loading, setLoading] = useState(false)
    const [activationFee, setActivationFee] = useState(false)

    const [number, setNumber] = useState("");


    const handleUpdate = async(e) =>{
        e.preventDefault()
        if(number.length>0){
            setLoading(true)
            const server_response = await ajaxStudent.payActivationFee(props.userID, number);
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

    const getActivationFee = async () => {
        const server_response = await ajaxBank.fetchActivationFee(props.schoolID);
        if (server_response.status === "OK") {
            
            setActivationFee(server_response.details);
        }else {
            setActivationFee("404");
        }
    };

    useEffect(() => {
        getActivationFee();
      }, [props.schoolID]);
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleUpdate}>Activate<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Activate Account"
            id="model-pay-activation-fee"
            size="md"
            footer={RenderFooter}
        >
            <p>Activation Fee: <b>UGX. {activationFee}</b></p>
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Phone Number</label>
                <input onChange={(e)=>setNumber(e.target.value)} style={{border: "1px solid grey"}} value={number} type="text" className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default ActivateAccount
