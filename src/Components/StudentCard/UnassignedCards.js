import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "../Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ActivateCard from "./ActivateCard";
import DeActivateCard from "./DeActivateCard";
import AttachCard from "./AttachCard";
import UpdateCardNumber from "./UpdateCardNumber";
import CardContext from "../../Context/CardContext";

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
      
        <form className="mg-t-10">
            <div className="row gutters-8">
              <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <input
                  type="text"
                  value={unassignedQuery} onChange={(e) => {
                    setUnassignedQuery(e.target.value);
                    if (e.target.value === '') {
                      setCards(e);
                    }
                  }}
                  placeholder="Search for card name..."
                  style={{border: "1px solid grey"}}

                  className="form-control"
                />
              </div>
              <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <button
                  type="submit"
                  onClick={(e) => searchUnassignedCard(e)}
                  className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                  SEARCH
                </button>
               
              </div>
            </div>
        </form>
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
        <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={unassignedPage === 1} onClick={() => handlePagination(unassignedPage - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(unassignedMeta) && unassignedMeta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${unassignedPage === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={unassignedPage === unassignedMeta.length} onClick={() => handlePagination(unassignedPage + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
        </div>
         </>
  );
}

export default UnassignedCards;
