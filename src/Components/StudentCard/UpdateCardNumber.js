import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import ajaxCard from "../../util/remote/ajaxCard";


const UpdateCardNumber=(props)=>{
    const [loading, setLoading] = useState(false)
    const [cardNumber,setCardNumber] =useState(props.cardNumber)

    const data={
        card_number: cardNumber,
        card_id: props.cardID,
    }

    

    const handleUpdate = async(e) =>{
        e.preventDefault()
        if (cardNumber.length > 0) {
            setLoading(true)
            const server_response = await ajaxCard.updateCard(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.getAllCards(props.page);
                
            }
            else{
                toast.error(server_response.message); 
            }
        } else {
            toast.error("Please enter the card number!");
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
                        onClick={handleUpdate}>Update Card Number<i class="fas fa-check mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Update Card Number"
            id="model-update-cardNo"
            size="md"
            footer={RenderFooter}
        >
            <div className="mb-4 form-group border-1">
                <label htmlFor="">Card Number</label>
                <input onChange={(e)=>setCardNumber(e.target.value)} style={{border: "1px solid grey"}} value={cardNumber} type="text" className="form-control"/>
            </div>
       
        </SystemModal>
    )
}

export default UpdateCardNumber
