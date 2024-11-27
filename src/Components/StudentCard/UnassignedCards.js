import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "../Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ActivateCard from "./ActivateCard";
import DeActivateCard from "./DeActivateCard";
import AttachCard from "./AttachCard";
import UpdateCardNumber from "./UpdateCardNumber";
import CardContext from "../../Context/CardContext";
import Pagination from "../Common/Pagination";
import StudentCardSearchForm from "../Common/StudentCard/StudentCardSearchForm";

function UnassignedCards(props) {
  const [modal, setModal] = useStateCallback(false);
  const {getCards, getAssignedCards, getInactiveCards, page, assignedPage, unassignedPage, inactivePage, unassignedMeta, setUnassignedPage, unassignedFirst, unassignedQuery, setUnassignedQuery,
     loading, loading2, unassignedCardList, getUnassignedCards, searchUnassignedCard, countAssignedCards, countUnassignedCards, countInactiveCards} = useContext(CardContext);

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= unassignedMeta.length) {
      setUnassignedPage(newPage);
    }
  };

    const setCards = (e) => {
      e.preventDefault();
      setUnassignedQuery("");
      setUnassignedPage(1);
      getUnassignedCards(1);
    };
  
    useEffect(() => {
      if (unassignedQuery) {
        searchUnassignedCard();
      } else {
        getUnassignedCards(unassignedPage);
      }
    }, [unassignedPage]);


  const attachCard=(e,item)=>{
    setModal(false, ()=>setModal(<AttachCard cardID={item.card_id} cardNumber={item.card_number} getAllCards={getCards} getAssignedCards={getAssignedCards} getInactiveCards={getInactiveCards} 
      getUnassignedCards={getUnassignedCards} page={page} assignedPage={assignedPage} inactivePage={inactivePage} unassignedPage={unassignedPage} countAssignedCards={countAssignedCards} 
      countInactiveCards={countInactiveCards} countUnassignedCards={countUnassignedCards} isOpen={true}/>))
  }
  const cardOn=(e,item)=>{
    setModal(false, ()=>setModal(<ActivateCard cardID={item.card_id} countInactiveCards={countInactiveCards} page={page} inactivePage={inactivePage} getAllCards={getCards} getInactiveCards={getInactiveCards} isOpen={true}/>))
  }

  const cardOff=(e,item)=>{
    setModal(false, ()=>setModal(<DeActivateCard cardID={item.card_id} countInactiveCards={countInactiveCards} page={page} inactivePage={inactivePage} getAllCards={getCards} getInactiveCards={getInactiveCards} isOpen={true}/>))
  }
  const updateCard=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateCardNumber cardID={item.card_id} cardNumber={item.card_number} getAllCards={getCards} page={page} isOpen={true}/>))
  }

    return (
        <>
      {modal}
      
      <StudentCardSearchForm searchTerm={unassignedQuery} setSearchTerm={setUnassignedQuery} placeholder="Enter card number..." searchCards={searchUnassignedCard} setCards={setCards} setPage={setUnassignedPage}/>
        <div className="table-responsive">
{loading || loading2 ? (
<Loader /> // Show loader when loading or searching
) : (
<table className="table display data-table text-nowrap">
<thead>
<tr>
<th scope="col" className="wd-10p">No.</th>
<th>Card Number</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{unassignedCardList.length > 0 ? (
unassignedCardList.map((item, index) => (
  <tr key={index}>
    <th scope='row' style={{width:"5px"}}>{index + unassignedFirst + 1}</th>
    <td>{item.card_number}</td>
          <td><span class="badge badge-warning">Unassigned</span></td>
          <td>
            <div className="dropdown">
              <Link
                to="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false">
                <span className="flaticon-more-button-of-three-dots"></span>
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
               
              <Link
                className="dropdown-item"
                to="#"
                onClick={(e) => updateCard(e,item)}>
                <i className="fa fa-edit mr-1"></i>
                 Change Card Number
              </Link>
                <Link
                className="dropdown-item"
                to="#"
                onClick={(e) => attachCard(e,item)}>
                <i className="fa fa-square-plus mr-1"></i>
                 Attach Card
              </Link>
              {item.status==="1"?<Link
                className="dropdown-item"
                to="#"
                onClick={(e) => cardOff(e,item)}>
                <i className="fa fa-power-off mr-1" style={{color:"red"}}></i>
                 De-Activate Card
              </Link>:<Link
                className="dropdown-item"
                to="#"
                onClick={(e) => cardOn(e,item)}>
                <i className="fa fa-power-off mr-1" style={{color:"green"}}></i>
                Activate Card
              </Link>}</div>
            </div>
          </td>
  </tr>
))
) : (
<tr>
  <td colSpan="6" style={{ textAlign: "center" }}>
    No cards registered yet.
  </td>
</tr>
)}
</tbody>
</table>
)}
        </div>
        <Pagination currentPage={unassignedPage} totalPages={unassignedMeta.length} onPageChange={handlePagination}/>

         </>
  );
}

export default UnassignedCards;
