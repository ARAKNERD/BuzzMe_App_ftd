import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../Common/Loader";
import SystemModal from "../Common/SystemModal";
import ajaxUser from "../../util/remote/ajaxUser";

const ChangePassword=(props)=>{

    const [loading, setLoading] = useState(false)
    const [old_password,setOldPassword] =useState("")
    const [new_password,setNewPassword] =useState("")

    const data={
        account_id: props.accountID,
        old_secure_string: old_password,
        new_secure_string: new_password
    }

    const handleUpdatePassword = async(e) =>{
        e.preventDefault()
        if(old_password.length>0 || new_password.length>0){
            setLoading(true)
            const server_response = await ajaxUser.changePassword(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                setOldPassword("");
                setNewPassword("");
                
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
                    onClick={handleUpdatePassword}>Save New Password<i class="fas fa-check mg-l-15"></i>
                </button>
            </>
        }
    }

    return(
        <SystemModal
            title="Change Password"
            id="model-new-pass"
            size="md"
            footer={RenderFooter}
        >
            <div className="row">
                <div className="col-xl-12 col-lg-12 col-12 form-group">
                    <label htmlFor="">Enter Current Password</label>
                    <input onChange={(e)=>setOldPassword(e.target.value)} style={{border: "1px solid grey"}} value={old_password} type="password" className="form-control"/>
                </div>
                <div className="col-xl-12 col-lg-12 col-12 form-group">
                    <label htmlFor="">Set New Password</label>
                    <input onChange={(e)=>setNewPassword(e.target.value)} style={{border: "1px solid grey"}} value={new_password} type="password" className="form-control"/>
                </div>
            </div>
       
        </SystemModal>
    )
}

export default ChangePassword
