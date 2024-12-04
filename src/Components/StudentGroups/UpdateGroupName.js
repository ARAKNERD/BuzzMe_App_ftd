import { useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";


const UpdateGroupName=(props)=>
{

  const [loading, setLoading] = useState(false)
  const [groupName, setGroupName] = useState(props.group_name)

  const data = 
  {
    group_id: props.groupID,
    group_name: groupName
  };

  const handleUpdate = async(e) =>
  {
    e.preventDefault()
    setLoading(true)
    const server_response = await ajaxStudentGroup.updateGroup(data);
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
          onClick={handleUpdate}>Save Changes<i class="fas fa-check mg-l-15"></i></button>
      </>
    }
  }

  return(
    <SystemModal
      title="Update Group Name"
      id="model-update-group"
      size="md"
      footer={RenderFooter}
    >

    <div className="row">
            <div className="col-xl-12 col-lg-12 col-12 form-group">
               <label htmlFor="">Group Name</label>
               <input type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)} className="form-control"/>
            </div>
        </div>
       
        </SystemModal>
    )
}

export default UpdateGroupName
