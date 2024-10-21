import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AllTransactions from "./AllTransactions";
import AccountActivations from "./AccountActivations";
import BuzztimeLoadTransactions from "./BuzztimeLoadTransactions";
import CallTransactions from "./CallTransactions";
import MessageTransactions from "./MessageTransactions";
import MMTransactions from "./MMTransactions";

function TransactionsPage() {
 
  return (
    <AppContainer title="Transactions">

        <div className="row">
            <div className="col-lg-12 col-md-12 mt-3">
                <div className="card height-auto">
                    <div className="card-body">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={12}>
                                    <Nav variant="pills" className="flex-row mb-1">
                                        <Nav.Item>
                                            <Nav.Link size="sm" eventKey="first">
                                            All Invoices{" "}
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link size="sm" eventKey="second">
                                            Mobile Money Transactions{" "}
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link size="sm" eventKey="third">
                                            Account Activations{" "}
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link size="sm" eventKey="fourth">
                                            Buzz Time Load{" "}
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link size="sm" eventKey="fifth">
                                            Phone Charges{" "}
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link size="sm" eventKey="sixth">
                                            Message Charges{" "}
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>

                                <Col sm={12}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <AllTransactions/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <MMTransactions/> 
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <AccountActivations/> 
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="fourth">
                                            <BuzztimeLoadTransactions/> 
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="fifth">
                                            <CallTransactions/> 
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="sixth">
                                            <MessageTransactions/> 
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>  
      
                    </div>
                </div>
            </div>
        </div>
     
    </AppContainer>
  );
}

export default TransactionsPage;