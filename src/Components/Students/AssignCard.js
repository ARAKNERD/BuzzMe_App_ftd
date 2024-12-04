import { useContext, useEffect, useState } from "react"
import { toast } from 'react-hot-toast';
import ajaxCard from "../../util/remote/ajaxCard";
import Loader from "../Common/Loader";
import SystemModal from "../Common/SystemModal";
import TableHeader from "../Common/TableHeader";


const AssignCard=(props)=>{
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [card,setCard] =useState("")
    const [cardNumber,setCardNumber] =useState("")
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [cardSearch, setCardSearch] = useState(null);

    const [active1,setActive1] = useState(false)
    const handleActive1 = ()=> setActive1(true)
    const handleInActive1 = ()=> setActive1(false)

    const data={
        student_id: props.studentID,
        card_id: card,
    }

    const setDetails = (e,item) =>{
        e.preventDefault()
        handleActive1()
        setCard(item.card_id)
        setCardNumber(item.card_number)
        
    }

    const backPage = (e) =>{
        e.preventDefault()
        handleInActive1()
    }

    const setCards = (e) => {
        e.preventDefault();
        setCardSearch(false);
        setQuery("");
      };

    const searchCard = async (e) => {
        if (e) {
          e.preventDefault();
        }
          setLoading2(true);
          const server_response = await ajaxCard.searchCard(query,page);
          setLoading2(false);
          if (server_response.status === "OK") {
            if (server_response.details.length === 0) {
              setCardSearch([]);
            } else {
              setCardSearch(server_response.details.list);
            }
          } else {
            setCardSearch("404");
          }
    };

    const handleAdd = async(e) =>{
        e.preventDefault()
        if (card.length > 0) {
            setLoading(true)
            const server_response = await ajaxCard.attachCard(data);
            setLoading(false);
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                props.g();
            }
            else{
                toast.error(server_response.message); 
            }
        } else {
            toast.error("Please select a student!");
          } 
    }
    

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    {active1 &&<button 
                        type="button" 
                        className={`btn-fill-md text-light bg-dodger-blue`} 
                        onClick={handleAdd}>Assign Card<i class="fas fa-check mg-l-15"></i></button>}
                    </>
        }
    }

    return(
        <SystemModal
            title="Assign Card"
            id="model-assign-card-to-student"
            size="lg"
            footer={RenderFooter}
        >

{active1?<><div className="pl-20">
    <a href="#" onClick={backPage}  className="btn btn-info mr-2"><i className="far fa-circle-left mr-1"></i>Card Search</a>
          </div>
              <div className="rfid_card_body">
              
                <div class="rfid_card">
	                <div class="rfid_card__info">
		                <div class="rfid_card__logo">Buzz Time Card</div>
		                    <div class="rfid_card__number">
			                    <span class="rfid_card__digit-group">{cardNumber}</span>
		                    </div>
		                    <div class="rfid_card__name">{props.fullName}</div>
		                   
	</div>
	
</div>
              </div></>:<><div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                          setCards(e);
                        }
                      }}
                      placeholder="Search for card number..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchCard(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                  </div>
                </div>
                
                <div className="card-body map-card">
                        <TableHeader
                            title="Search Result(s)"
                                
                        />
                        <div className="border-top mt-3"></div>                    
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col"> Card Number</th>
                                        <th scope="col"> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(cardSearch) && cardSearch.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{key+1}</th>
                                                <td>{item.card_number}</td>
                                                <td><button type="button" onClick={(e)=>setDetails(e,item)} className={`btn-fill-md text-light bg-dodger-blue`} 
                                                >Select <i class="fas fa-check"></i></button></td>
                                            </tr>
                                        ))}
                                        {cardSearch === "404" && (<tr>
                          <td colSpan="3" style={{textAlign: "center"}}>
                            No search result(s) found.
                          </td>
                        </tr>)}
                                </tbody>
                            </table>
                            {loading2 && <Loader/>}
                        </div>
                              
                    </div></>}
       
        </SystemModal>
    )
}

export default AssignCard
