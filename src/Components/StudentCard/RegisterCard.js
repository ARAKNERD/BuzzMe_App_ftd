import React, {useContext, useState} from "react";
import {toast} from "react-hot-toast";
import ajaxCard from "../../util/remote/ajaxCard";

function RegisterCard(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false)


  const data = {
    card_number: cardNumber
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (cardNumber.length > 0) {
      setLoading(true)
      const server_response = await ajaxCard.createCard(data);
      setLoading(false)
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        props.countAllCards()
        props.countUnassignedCards()
        props.getAllCards(props.page)
        props.getUnassignedCards(props.unassignedPage)

        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setCardNumber("");
  };

  return (
    <div className="card height-auto">
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h5 style={{marginBottom:0}}>Add New Buzz Card</h5>
            
          </div>
        </div>
        <form
          onSubmit={(e) => handleAdd(e)}
          method="post"
          class="new-added-form">
          <div className="row">
            <div className="col-lg-12 col-12 mt-1 form-group">
              <label htmlFor="">Card Number <span style={{color:"red"}}>*</span></label>
              <input
                type="text"
                placeholder="Enter number of buzz card.."
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="mt-5">
          {loading && (<button type="submit" style={{float: "right"}} className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Registering...</button>)}
            {!loading && <button
              type="submit"
              className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
              Register Buzz Card
            </button>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterCard;
