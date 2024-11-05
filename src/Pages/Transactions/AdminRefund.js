import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxBank from "../../util/remote/ajaxBank";


const AdminRefund=(props)=>{
    const [loading, setLoading] = useState(false)
    const [amount,setAmount] =useState("")
    const [pass, setPass] = useState("")

    const handleRefund = async(e) =>{
        e.preventDefault()
        if (pass.length > 0) {
            setLoading(true)
            const server_response = await ajaxBank.initiateAdminRefund(pass, props.userID, amount);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                setPass("")
                setAmount("")
                props.g();
                props.h(props.page);
            }
            else{
                toast.error(server_response.message); 
            }
        } else {
            toast.error("Please enter your password!");
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
                        onClick={handleRefund}>Initiate Refund<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Payment Refund"
            id="model-refund-pay"
            size="md"
            footer={RenderFooter}
        >
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Amount</label>
                <input onChange={(e)=>setAmount(e.target.value)} style={{border: "1px solid grey"}} placeholder="Enter amount to refund..." value={amount} type="number" className="form-control"/>
            </div>

            <div className="mb-4 form-group border-1">
                <label htmlFor="">Admin Password</label>
                <input onChange={(e)=>setPass(e.target.value)} style={{border: "1px solid grey"}} placeholder="Enter administrator password..." value={pass} type="password" className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default AdminRefund
