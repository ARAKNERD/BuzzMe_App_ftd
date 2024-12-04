import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../Components/Structure/AppContainer.js";
import {Toaster} from "react-hot-toast";
import RegisterCard from "../Components/StudentCard/RegisterCard.js";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AssignedCards from "../Components/StudentCard/AssignedCards.js";
import UnassignedCards from "../Components/StudentCard/UnassignedCards.js";
import InactiveCards from "../Components/StudentCard/InactiveCards.js";
import CardContext from "../Context/CardContext.js";
import AllCards from "../Components/StudentCard/AllCards.js";
import { Link } from "react-router-dom";

function CardsPage() {
  const {page, unassignedPage, allCardsCount, inactiveCardsCount, unassignedCardsCount, assignedCardsCount, getCards, getUnassignedCards, countAllCards, 
        countUnassignedCards, countAssignedCards, countInactiveCards} = useContext(CardContext);

  useEffect(() => {
    countAssignedCards();
    countAllCards();
    countInactiveCards();
    countUnassignedCards();
  }, []);
  
  return (
    <AppContainer title="Buzz Cards">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="row">
        <div className="col-lg-12 col-md-12">
                  <div className="pl-20" style={{float: "right"}}>
                      <Link to={`/cards/print`}>
                      <button
                          type="button"
                          className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-dodger-blue">
                          <i className="fa-solid fa-qrcode" /> Generate QR Codes
                      </button>
                      </Link>
                     
                  </div>
        </div>
        <div className="col-lg-4">
          <RegisterCard getAllCards={getCards} page={page} countAllCards={countAllCards} countUnassignedCards={countUnassignedCards} 
                        getUnassignedCards={getUnassignedCards} unassignedPage={unassignedPage}/>
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
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{allCardsCount ? allCardsCount.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Total Cards</p>
										</div>
									</div>

                  <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{assignedCardsCount ? assignedCardsCount.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Assigned Cards</p>
										</div>
									</div>

                  <div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{unassignedCardsCount ? unassignedCardsCount.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Unassigned Cards</p>
										</div>
									</div>

									<div class="col-xl-3 col-lg-12 col-sm-6 pr-0 pl-0">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{inactiveCardsCount ? inactiveCardsCount.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Inactive Cards</p>
										</div>
									</div>

                  
								</div>
              </div>
							</div>
            </div>

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
                        <AllCards/>
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <AssignedCards/>

                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <UnassignedCards/>
                    
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <InactiveCards/>
                    
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
                </Tab.Container> 
              
            </div>
          </div>
        </div></div>
        </div>
      </div>
    </AppContainer>
  );
}

export default CardsPage;