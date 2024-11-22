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
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AssignedCards from "./AssignedCards";
import UnassignedCards from "./UnassignedCards.js";
import InactiveCards from "./InactiveCards.js";

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
      console.log(server_response.details.list)
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
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row mb-1">
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="first">
                      All Cards{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="second">
                      Assigned Cards{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="third">
                      Unassigned Cards{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="fourth">
                      Inactive Cards{" "}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
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
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                  <AssignedCards g={getCards} page={page} h={getAllCards} i={getActiveCards} j={getInactiveCards} k={getUnassignedCards}/>

                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                  <UnassignedCards g={getCards} page={page} h={getAllCards} i={getActiveCards} j={getInactiveCards} k={getUnassignedCards}/>
                 
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                  <InactiveCards g={getCards} page={page} h={getAllCards} i={getActiveCards} j={getInactiveCards} k={getUnassignedCards}/>
                 
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> 
              
            </div>
          </div></div></div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListCards;
{/* <div class="heading-layout1 mg-b-25">
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
</div> */}