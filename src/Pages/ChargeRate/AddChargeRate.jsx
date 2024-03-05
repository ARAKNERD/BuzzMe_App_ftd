import React, { useContext, useState } from "react";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import RateContext from "../../Context/RateContext";
import { toast } from 'react-hot-toast';


function AddChargeRate() {

  const [rate,setRate] =useState("")
  const [type,setType] =useState("")
  const {getRateList} = useContext(RateContext);


  const data = {
    rate: rate,
    type: type,
  };

  const handleAdd = async(e) =>{
    e.preventDefault()

    if(rate.length>0 || type.length>0){
        const server_response = await ajaxChargeRate.createChargeRate(data);
        console.log(server_response)
        if(server_response.status==="OK"){
            
            toast.success(server_response.message)
            getRateList() 
            resetForm();
        }
        else{
            toast.error(server_response.message)
        } 
    }
    else{
        toast.error("Complete all fields and try again")
    }  
}

const resetForm = () => {
  setRate("")
  setType("")
};

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>Add New Rate</h3>
          </div>
        </div>
        <form onSubmit={(e)=>handleAdd(e)} method="post" class="new-added-form" >
                    <div className="row">
                        <div className="col-lg-6 col-12 form-group">
                            <label htmlFor="">Type</label>
                            <input type="text" value={type} onChange={(e)=>setType(e.target.value)} className="form-control"/>
                        </div>
                        <div className="col-lg-6 col-12 form-group">
                            <label htmlFor="">Rate</label>
                            <input type="text" value={rate} onChange={(e)=>setRate(e.target.value)} className="form-control"/>
                                    
                        </div>
                       </div>
                      <div className="mb-4">
                        <input type="submit" style={{float:"right"}} className="btn-fill-md text-light bg-dark-pastel-green" value="Save Charge Rate"/>   
                      </div>

                        </form>
      </div>
    </div>
  );
}

export default AddChargeRate;
