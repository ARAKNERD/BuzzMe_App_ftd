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
import Pagination from "../Common/Pagination";
import StudentCardSearchForm from "../Common/StudentCard/StudentCardSearchForm";
import PrintQRCode from "./PrintQRCode";

function AllCards() {
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
  const printQRCode=(e,item)=>{
    setModal(false, ()=>setModal(<PrintQRCode cardNumber={item.card_number} isOpen={true}/>))
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
      
      <StudentCardSearchForm searchTerm={query} setSearchTerm={setQuery} searchCards={searchCard} setCards={setCards} setPage={setPage} placeholder="Enter card number or name of student..."/>

      <div className="table-responsive">
        {loading || loading2 ? (
          <Loader />
        ) : (
          <table className="table display data-table text-nowrap"  style={{marginBottom:"80px"}}>
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
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={(e) => printQRCode(e,item)}>
                        <i className="fa fa-qrcode mr-1"></i>
                          Generate QR Code
                      </Link>
                      {item.student?<Link
                        className="dropdown-item"
                        to="#"
                        onClick={(e) => detachCard(e,item)}>
                        <i className="fa fa-link-slash mr-1" style={{color:"red"}}></i>
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

      <Pagination currentPage={page} totalPages={meta.length} onPageChange={handlePagination} />

    </>
  );
}

export default AllCards;
