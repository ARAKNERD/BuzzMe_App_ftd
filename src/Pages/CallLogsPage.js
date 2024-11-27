import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AppContainer from "../Components/Structure/AppContainer";
import ZegoLogs from "../Components/CallLogs/ZegoLogs";
import TwilioLogs from "../Components/CallLogs/TwilioLogs";
import { Toaster } from "react-hot-toast";

function CallLogsPage() {

  return (
    <AppContainer title="Call Logs">
    <Toaster position="top-center" reverseOrder={false} />
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
                          Buzz to Buzz Calls{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link size="sm" eventKey="second">
                          Buzz to Other Networks{" "}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Col sm={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <ZegoLogs/>
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <TwilioLogs/>
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

export default CallLogsPage;
