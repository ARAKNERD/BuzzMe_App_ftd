import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";


const UpdateChargeRate=(props)=>
{

  const [loading, setLoading] = useState(false)
  const [rate, setRate] = useState(props.rate)
  const [type, setType] = useState(props.type)

  const data = 
  {
    rate_id: props.rateID,
    rate: rate,
    type: type
  };

  const handleUpdate = async(e) =>
  {
    e.preventDefault()
    setLoading(true)
    const server_response = await ajaxChargeRate.updateChargeRate(data);
    setLoading(false);
    if(server_response.status==="OK"){
      toast.success(server_response.message);
      props.g();
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
          onClick={handleUpdate}>Save Changes</button>
      </>
    }
  }

  return(
    <SystemModal
      title="Update Charge Rate"
      id="model-update-ratee"
      size="md"
      footer={RenderFooter}
    >

    <div className="row">
            <div className="col-xl-6 col-lg-6 col-12 form-group">
               <label htmlFor="">Type</label>
               <input type="text" value={type} onChange={(e)=>setType(e.target.value)} className="form-control"/>
            </div>
             <div className="col-xl-6 col-lg-6 col-12 form-group">
               <label htmlFor="">Rate</label>
                <input type="text" value={rate} onChange={(e)=>setRate(e.target.value)} className="form-control"/>
             </div>
        </div>
       
        </SystemModal>
    )
}

export default UpdateChargeRate
