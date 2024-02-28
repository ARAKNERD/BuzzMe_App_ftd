import { useState } from "react"
import { toast } from 'react-hot-toast';import ajaxParent from "../../util/remote/ajaxParent";
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
;

const UpdateParent=(props)=>{

    const [loading, setLoading] = useState(false)
    const [parentName,setParentName] =useState(props.parentName)
    const [userName,setUserName] =useState(props.username)
    const [mainContact,setMainContact] =useState(props.mainContact)
    const [alternativeContact,setAlternativeContact] =useState(props.alternativeContact)
    const [address,setAddress] =useState(props.address)
    const [nin,setNIN] =useState(props.nin)

    const handleUpdateParent = async(e) =>{
        e.preventDefault()
        if(props.parentID>0 ||parentName.length>0 || userName.length>0 || mainContact.length>0){
            setLoading(true)
            const server_response = await ajaxParent.updateParent(props.parentID,parentName,userName,mainContact,alternativeContact,address,nin);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
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
                    <button className="btn ripple btn-dark" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn ripple btn-success`} 
                        onClick={handleUpdateParent}>Save Changes</button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Update Parent Details"
            id="model-update-parent"
            size="md"
            footer={RenderFooter}
        >

        <div className="row">
            <div className="col-xl-6 col-lg-6 col-12 form-group">
               <label htmlFor="">Parent Name</label>
               <input type="text" value={parentName} onChange={(e)=>setParentName(e.target.value)} className="form-control"/>
            </div>
             <div className="col-xl-6 col-lg-6 col-12 form-group">
               <label htmlFor="">Username</label>
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className="form-control"/>
             </div>
             <div className="col-xl-6 col-lg-6 col-12 form-group">
                <label htmlFor="">Main Contact</label>
                <input type="text" value={mainContact} onChange={(e)=>setMainContact(e.target.value)} className="form-control"/>
            </div>
            <div className="col-xl-6 col-lg-6 col-12 form-group">
               <label htmlFor="">Alternative Contact</label>
                <input type="text" value={alternativeContact} onChange={(e)=>setAlternativeContact(e.target.value)} className="form-control"/>
            </div>
            <div className="col-xl-6 col-lg-6 col-12 form-group">
               <label htmlFor="">Address</label>
                <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
            </div>
            <div className="col-xl-6 col-lg-6 col-12 form-group">
              <label htmlFor="">NIN</label>
              <input type="text" value={nin} onChange={(e)=>setNIN(e.target.value)} className="form-control"/>
            </div>
        </div>
       
        </SystemModal>
    )
}

export default UpdateParent
