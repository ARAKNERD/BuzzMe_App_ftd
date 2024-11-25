import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "../Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ActivateCard from "./ActivateCard";
import DeActivateCard from "./DeActivateCard";
import UpdateCardNumber from "./UpdateCardNumber";
import CardContext from "../../Context/CardContext";
import AttachCard from "./AttachCard";
import DetachCard from "./DetachCard";

function AllCards(props) {
    const {cardList, meta, page, assignedPage, inactivePage, unassignedPage, query, first, loading, loading2, setPage, getCards,
        getAssignedCards, getInactiveCards, getUnassignedCards, searchCard, setQuery, countAssignedCards, countInactiveCards, countUnassignedCards} = useContext(CardContext);
    const [modal, setModal] = useStateCallback(false);
  
    const handlePagination = (newPage) => {
      if (newPage > 0 && newPage <= meta.length) {
        setPage(newPage);
      }
    };

    const setCards = (e) => {
      e.preventDefault();
      setQuery("");
      setPage(1);
      getCards(1);
    };

    const assignCard=(e,item)=>{
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
    const cardOff=(e,item)=>{
        setModal(false, ()=>setModal(<DeActivateCard cardID={item.card_id} countInactiveCards={countInactiveCards} page={page} inactivePage={inactivePage} getAllCards={getCards} getInactiveCards={getInactiveCards} isOpen={true}/>))
    }
    const updateCard=(e,item)=>{
        setModal(false, ()=>setModal(<UpdateCardNumber cardID={item.card_id} cardNumber={item.card_number} getAllCards={getCards} page={page} isOpen={true}/>))
    }

    useEffect(() => {
        if (query) {
          searchCard();
        } else {
          getCards(page);
        }
    }, [page]);

    return (
        <>
      {modal}
      
        <form className="mg-t-10">
            <div className="row gutters-8">
              <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <input
                  type="text"
                  value={query} onChange={(e) => {
                    setQuery(e.target.value);
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
                  onClick={(e) => searchCard(e)}
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
{cardList.length > 0 ? (
cardList.map((item, index) => (
  <tr key={index}>
    <th scope='row' style={{width:"5px"}}>{index + first + 1}</th>
    <td>{item.card_number}</td>
          <td>{item.student?.full_name?item.student.full_name:"Not assigned"}</td>
          <td>{item.status==="1"?<span class="badge badge-success">Activated</span>
          :item.status==="0"?<span class="badge badge-warning">Unassigned</span>
          :<span class="badge badge-danger">De-activated</span>}</td>

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
                onClick={(e) => assignCard(e,item)}>
                <i className="fa fa-square-plus mr-1" style={{color:"green"}}></i>
                Attach Card
              </Link>}
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
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={page === 1} onClick={() => handlePagination(page - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(meta) && meta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${page === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={page === meta.length} onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
        </div>
         </>
  );
}

export default AllCards;
