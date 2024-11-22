import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ajaxCard from "../../util/remote/ajaxCard";
import ActivateCard from "./ActivateCard";
import DeActivateCard from "./DeActivateCard";
import UpdateCardNumber from "./UpdateCardNumber";
import DetachCard from "./DetachCard";
import AttachCard from "./AttachCard";

function UnassignedCards(props) {
    const [cardList, setCardList] = useState([]);
    const [modal, setModal] = useStateCallback(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [query, setQuery] = useState("");
    const [page,setPage] = useState(1)
    const [meta,setMeta] = useState([])
    const [first, setFirst] = useState("");

    const getCards = async (currentPage) => {
      setLoading(true);
      const server_response = await ajaxCard.fetchUnassignedCardList(currentPage);
      setLoading(false);
      if (server_response.status === "OK") {
        setFirst(server_response.details.meta.offset_count);
        setMeta(server_response.details.meta.list_of_pages);
        setCardList(server_response.details.list || []);
      } else {
        setCardList([]);
      }
    };

    const searchCard = async (e) => {
      if (e) {
        e.preventDefault();
      }
        setLoading2(true);
        const server_response = await ajaxCard.searchUnassignedCard(query,page);
        setLoading2(false);
        if (server_response.status === "OK") {
          setFirst(server_response.details.meta.offset_count);
          setMeta(server_response.details.meta.list_of_pages);
          setCardList(server_response.details.list || []);
        } else {
          setCardList([]);
        }
    };
  
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
  
    useEffect(() => {
      if (query) {
        searchCard();
      } else {
        getCards(page);
      }
    }, [page]);


  const attachCard=(e,item)=>{
    setModal(false, ()=>setModal(<AttachCard cardID={item.card_id} cardNumber={item.card_number} g={props.g} page={page} i={props.i} j={props.j} k={props.k} isOpen={true}/>))
  }
  const cardOn=(e,item)=>{
    setModal(false, ()=>setModal(<ActivateCard cardID={item.card_id} g={props.g} page={page} i={props.i} j={props.j} isOpen={true}/>))
  }
  const cardOff=(e,item)=>{
    setModal(false, ()=>setModal(<DeActivateCard cardID={item.card_id} g={props.g} page={page} i={props.i} j={props.j} isOpen={true}/>))
  }
  const updateCard=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateCardNumber cardID={item.card_id} cardNumber={item.card_number} g={props.g} page={page} isOpen={true}/>))
  }

  const refreshData = () =>{
    getCards(1);
  }

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
                  placeholder="Search for card name..."
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
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page - 1)}>
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
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
        </div>
         </>
  );
}

export default UnassignedCards;
