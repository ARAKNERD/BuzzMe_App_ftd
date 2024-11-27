import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import Loader from "../Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ActivateCard from "./ActivateCard";
import DetachCard from "./DetachCard";
import DeActivateCard from "./DeActivateCard";
import UpdateCardNumber from "./UpdateCardNumber";
import CardContext from "../../Context/CardContext";
import Pagination from "../Common/Pagination";
import StudentCardSearchForm from "../Common/StudentCard/StudentCardSearchForm";

function AssignedCards(props) {
    const [modal, setModal] = useStateCallback(false);
    const {assignedPage, page, inactivePage, unassignedPage, assignedMeta, setAssignedPage, assignedFirst, assignedQuery, setAssignedQuery, loading, loading2, assignedCardList, getAssignedCards, getCards, getInactiveCards, getUnassignedCards, searchAssignedCard, countAssignedCards,
      countUnassignedCards, countInactiveCards} = useContext(CardContext);

    const handlePagination = (newPage) => {
      if (newPage > 0 && newPage <= assignedMeta.length) {
        setAssignedPage(newPage);
      }
    };

    const setCards = (e) => {
      e.preventDefault();
      setAssignedQuery("");
      setAssignedPage(1);
      getAssignedCards(1);
    };
  
    useEffect(() => {
      if (assignedQuery) {
        searchAssignedCard();
      } else {
        getAssignedCards(assignedPage);
      }
    }, [assignedPage]);


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

    return (
        <>
      {modal}
      
        <StudentCardSearchForm searchTerm={assignedQuery} setSearchTerm={setAssignedQuery} searchCards={searchAssignedCard} setCards={setCards} setPage={setAssignedPage} placeholder="Enter card number or name of student..."/>
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
            {assignedCardList.length > 0 ? (
            assignedCardList.map((item, index) => (
              <tr key={index}>
                <th scope='row' style={{width:"5px"}}>{index + assignedFirst + 1}</th>
                <td>{item.card_number}</td>
                      <td>{item.student?.full_name?item.student.full_name:"Not assigned"}</td>
                      <td>{item.status==="1"?<span class="badge badge-success">Assigned</span>
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
                            onClick={(e) => detachCard(e,item)}>
                            <i className="fa fa-square-plus mr-1"></i>
                            Detach Card
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
        <Pagination currentPage={assignedPage} totalPages={assignedMeta.length} onPageChange={handlePagination}/>

         </>
  );
}

export default AssignedCards;
