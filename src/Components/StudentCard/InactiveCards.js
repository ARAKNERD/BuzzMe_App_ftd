import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "../Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import DetachCard from "./DetachCard";
import ActivateCard from "./ActivateCard";
import UpdateCardNumber from "./UpdateCardNumber";
import CardContext from "../../Context/CardContext";
import AttachCard from "./AttachCard";

function InactiveCards(props) {
  const [modal, setModal] = useStateCallback(false);
  const {unassignedPage, assignedPage, page, inactivePage,  inactiveMeta, setInactivePage, inactiveFirst, inactiveQuery, setInactiveQuery, loading, loading2, inactiveCardList, getInactiveCards, getCards,
    getUnassignedCards, getAssignedCards, searchInactiveCard, countUnassignedCards, countInactiveCards, countAssignedCards} = useContext(CardContext);
  
  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= inactiveMeta.length) {
      setInactivePage(newPage);
    }
  };

    const setCards = (e) => {
      e.preventDefault();
      setInactiveQuery("");
      setInactivePage(1);
      getInactiveCards(1);
    };
  
    useEffect(() => {
      if (inactiveQuery) {
        searchInactiveCard();
      } else {
        getInactiveCards(inactivePage);
      }
    }, [inactivePage]);

  const attachCard=(e,item)=>{
      setModal(false, ()=>setModal(<AttachCard cardID={item.card_id} cardNumber={item.card_number} getAllCards={getCards} getAssignedCards={getAssignedCards} getInactiveCards={getInactiveCards} 
        getUnassignedCards={getUnassignedCards} page={page} assignedPage={assignedPage} inactivePage={inactivePage} unassignedPage={unassignedPage} countAssignedCards={countAssignedCards} 
        countInactiveCards={countInactiveCards} countUnassignedCards={countUnassignedCards} isOpen={true}/>))
  }

  const detachCard=(e,item)=>{
    setModal(false, ()=>setModal(<DetachCard cardID={item.card_id} getAllCards={getCards} getAssignedCards={getAssignedCards} getInactiveCards={getInactiveCards} 
        getUnassignedCards={getUnassignedCards} page={page} assignedPage={assignedPage} inactivePage={inactivePage} unassignedPage={unassignedPage} countAssignedCards={countAssignedCards} 
        countInactiveCards={countInactiveCards} countUnassignedCards={countUnassignedCards} isOpen={true}/>))
  }

  const cardOn=(e,item)=>{
    setModal(false, ()=>setModal(<ActivateCard cardID={item.card_id} countInactiveCards={countInactiveCards} page={page} inactivePage={inactivePage} getAllCards={getCards} getInactiveCards={getInactiveCards} isOpen={true}/>))
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
                  value={inactiveQuery} onChange={(e) => {
                    setInactiveQuery(e.target.value);
                    if (e.target.value === '') {
                      setCards(e);
                    }
                  }}
                  placeholder="Search for card name or student name..."
                  style={{border: "1px solid grey"}}

                  className="form-control"
                />
              </div>
              <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <button
                  type="submit"
                  onClick={(e) => searchInactiveCard(e)}
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
<th>Student Name</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{inactiveCardList.length > 0 ? (
inactiveCardList.map((item, index) => (
  <tr key={index}>
    <th scope='row' style={{width:"5px"}}>{index + inactiveFirst + 1}</th>
    <td>{item.card_number}</td>
          <td>{item.student?.full_name?item.student.full_name:"Not assigned"}</td>
          <td><span class="badge badge-danger">Inactive</span></td>
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
              {item.student?<Link
                className="dropdown-item"
                to="#"
                onClick={(e) => detachCard(e,item)}>
                <i className="fa fa-square-plus mr-1" style={{color:"red"}}></i>
                 De-Attach Card
              </Link>:<Link
                className="dropdown-item"
                to="#"
                onClick={(e) => attachCard(e,item)}>
                <i className="fa fa-square-plus mr-1" style={{color:"green"}}></i>
                Attach Card
              </Link>}
              <Link
                className="dropdown-item"
                to="#"
                onClick={(e) => cardOn(e,item)}>
                <i className="fa fa-power-off mr-1" style={{color:"green"}}></i>
                Activate Card
              </Link></div>
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
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={inactivePage === 1} onClick={() => handlePagination(inactivePage - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(inactiveMeta) && inactiveMeta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${inactivePage === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={inactivePage === inactiveMeta.length} onClick={() => handlePagination(inactivePage + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
        </div>
         </>
  );
}

export default InactiveCards;
