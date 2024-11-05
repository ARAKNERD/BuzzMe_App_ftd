import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ajaxCard from "../../util/remote/ajaxCard";
import ActivateCard from "./ActivateCard";
import DeActivateCard from "./DeActivateCard";
import RegisterCard from "./RegisterCard";
import AttachCard from "./AttachCard";
import UpdateCardNumber from "./UpdateCardNumber";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ListCards() {
    const [cardList, setCardList] = useState([]);
    const [allCards, setAllCards] = useState(false);
    const [activeCards, setActiveCards] = useState(false);
    const [inactiveCards, setInactiveCards] = useState(false);
    const [unassignedCards, setUnassignedCards] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [query, setQuery] = useState("");
    const [page,setPage] = useState(1)
    const [meta,setMeta] = useState([])
    const [first, setFirst] = useState("");

    const getCards = async (currentPage) => {
      setLoading(true);
      const server_response = await ajaxCard.fetchCardList(currentPage);
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
        const server_response = await ajaxCard.searchCard(query,page);
        setLoading2(false);
        if (server_response.status === "OK") {
          setFirst(server_response.details.meta.offset_count);
          setMeta(server_response.details.meta.list_of_pages);
          setCardList(server_response.details.list || []);
        } else {
          setCardList([]);
        }
    };

    const getAllCards = async () => {
      const server_response = await ajaxCard.countAllCards();
      if (server_response.status === "OK") {
        //store results
        setAllCards(server_response.details);
      } else {
        //communicate error
        setAllCards("404");
      }
    };
    const getActiveCards = async () => {
      const server_response = await ajaxCard.countActiveCards();
      if (server_response.status === "OK") {
        //store results
        setActiveCards(server_response.details);
      } else {
        //communicate error
        setActiveCards("404");
      }
    };
    const getInactiveCards = async () => {
      const server_response = await ajaxCard.countInactiveCards();
      if (server_response.status === "OK") {
        //store results
        setInactiveCards(server_response.details);
      } else {
        //communicate error
        setInactiveCards("404");
      }
    };
    const getUnassignedCards = async () => {
      const server_response = await ajaxCard.countUnassignedCards();
      if (server_response.status === "OK") {
        //store results
        setUnassignedCards(server_response.details);
      } else {
        //communicate error
        setUnassignedCards("404");
      }
    };

    const exportToPDF = () => {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Card Number", "Student Number", "Status"];
      const data = cardList.map(item => [
        item.full_name,
        item.student?.full_name?item.student.full_name:"Not assigned",
        item.status==="1"?"Activated":item.status==="0"?"Unassigned":"De-activated"
      ]);
  
      pdf.autoTable({ head: [columns], body: data });
      pdf.save("cards_list.pdf");
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

    useEffect(() => {
      getAllCards();
      getActiveCards();
      getInactiveCards();
      getUnassignedCards();
    }, []);


  const updateStation=(e,item)=>{
    setModal(false, ()=>setModal(<AttachCard cardID={item.card_id} cardNumber={item.card_number} g={getCards} page={page} i={getActiveCards} j={getInactiveCards} k={getUnassignedCards} isOpen={true}/>))
  }
  const cardOn=(e,item)=>{
    setModal(false, ()=>setModal(<ActivateCard cardID={item.card_id} g={getCards} page={page} i={getActiveCards} j={getInactiveCards} isOpen={true}/>))
  }
  const cardOff=(e,item)=>{
    setModal(false, ()=>setModal(<DeActivateCard cardID={item.card_id} g={getCards} page={page} i={getActiveCards} j={getInactiveCards} isOpen={true}/>))
  }
  const updateCard=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateCardNumber cardID={item.card_id} cardNumber={item.card_number} g={getCards} page={page} isOpen={true}/>))
  }

  const refreshData = () =>{
    getCards(1);
  }

    return (
    <AppContainer title="Buzz Cards">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
        <div className="col-lg-4">
          <RegisterCard g={getCards} page={page} h={getAllCards} i={getUnassignedCards}/>
        </div>
        

        <div className="col-lg-8">
        <div className="row">
            <div class="col-lg-12">
							<div class="card custom-card " style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-my-blue">
              <div class="item-title mb-2" style={{color:"white"}}><b>SUMMARY</b></div>
								<div class="row" >
									<div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{allCards ? allCards.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Total Cards</p>
										</div>
									</div>
                                    <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{activeCards ? activeCards.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Active Cards</p>
										</div>
									</div>
									<div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{inactiveCards ? inactiveCards.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Inactive Cards</p>
										</div>
									</div>
                  <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{unassignedCards ? unassignedCards.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Unassigned Cards</p>
										</div>
									</div>
								</div></div>
							</div></div>
              <div class="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Buzz Cards"
                  subtitle="List of all the buzz cards"
                />
                <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                                            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                                        </div>
                                    </div>
              </div>
              <form className="mg-b-20">
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
              </form>
              <div className="border-top mt-3"></div>
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
                                <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => updateStation(e,item)}>
                                <i className="fa fa-square-plus mr-1"></i>
                                 Attach Student
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
              {/* <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Card Number</th>
                      <th>Student Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {cardSearch && Array.isArray(cardSearch) ? (
                      
                      cardSearch.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
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
                                onClick={(e) => updateStation(e,item)}>
                                <i className="fa fa-square-plus mr-1"></i>
                                 Attach Student
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
                   
                  ) :Array.isArray(cardList) && cardList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.card_number}</td>
                          <td>{item.student?.full_name?item.student.full_name:"Not assigned"}</td>
                          <td>{item.status==="1"?<span class="badge badge-success">Activated</span>
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
                                onClick={(e) => updateStation(e,item)}>
                                <i className="fa fa-square-plus  mr-1"></i>
                                 Attach Student
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
                      ))}
                      {cardList === "404" && (<tr>
                          <td colSpan="7" style={{textAlign: "center"}}>
                            No buzz cards registered yet.
                          </td>
                        </tr>)}
                        {cardSearch.length === 0 && (<tr>
                          <td colSpan="7" style={{textAlign: "center"}}>
                            No search result(s) found.
                          </td>
                        </tr>)}
                  </tbody>
                  <div
                    className="align-items-center justify-content-center pos-absolute"
                    style={{left: "50%"}}>
                    <button
                      className="btn btn-dark"
                      style={{borderRight: "1px solid yellow"}}
                      onClick={setPreviousPageNumber}>
                      <i className="fa fa-angle-left mr-2"></i> Prev
                    </button>
                    {Array.isArray(meta) &&
                      meta.map((item) =>
                        page === item ? (
                          <button
                            style={{borderRight: "1px solid yellow"}}
                            className="btn btn-primary">
                            {item}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => setPageNumber(e, item)}
                            style={{borderRight: "1px solid yellow"}}
                            className="btn btn-dark">
                            {item}
                          </button>
                        )
                      )}

                    <button
                      style={{borderRight: "1px solid yellow"}}
                      className="btn btn-dark"
                      onClick={setNextPageNumber}>
                      Next<i className="fa fa-angle-right ml-2"></i>
                    </button>
                  </div>
                </table>
                {loading && <Loader />}
                {loading2 && <Loader />}
              </div> */}
            </div>
          </div></div></div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListCards;
