import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";

const AddChargeType=(props)=>{

  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("")

  const data = {
    type: type
  };

  const handleAdd = async(e) =>
  {
    e.preventDefault()
    setLoading(true)
    const server_response = await ajaxChargeRate.createChargeType(data);
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
        <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
        <button 
          type="button" 
          className={`btn-fill-md text-light bg-dodger-blue`} 
          onClick={handleAdd}>Save Charge Type<i class="fas fa-check mg-l-15"></i></button>
      </>
    }
  }

  return(
    <SystemModal
      title="Add Charge Type"
      id="model-add-type"
      size="md"
      footer={RenderFooter}
    >

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-12 form-group">
          <label htmlFor="">Type <span style={{color:"red"}}>*</span></label>
          <input type="text" value={type} style={{border: "1px solid grey"}} placeholder="Enter name of charge type.." onChange={(e)=>setType(e.target.value)} className="form-control"/>
        </div>
      </div>
       
    </SystemModal>
  )
}

export default AddChargeType
