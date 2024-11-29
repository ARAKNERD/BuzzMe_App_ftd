import React, { useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Toaster} from 'react-hot-toast'
import AppContainer from "../../../Components/Structure/AppContainer";
import useStateCallback from '../../../util/customHooks/useStateCallback';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AttachStudent from '../../../Components/Parents/AdminProfile/AttachStudent';
import ContactContext from '../../../Context/ContactContext';
import ContactChildren from '../../../Components/Parents/ContactChildren';
import SummaryCount from '../../../Components/Parents/SummaryCount';
import ContactBioData from '../../../Components/Parents/ContactBioData';
import UserContacts from '../../../Components/Parents/UserContacts';
import ContactCallLogs from '../../../Components/Parents/ContactCallLogs';
import ContactTransactions from '../../../Components/Parents/ContactTransactions';
import Pagination from '../../../Components/Common/Pagination';

const ParentProfilePage = props => {

  const {contactProfile, contactUserId, contactWalletBalance, contactCount, setContactId, setContactUserId, userContacts, contactLogs, contactTransactions, loading3,
    contactChildren, transactionMeta, transactionPage, setTransactionPage, getUserContacts, countContactContacts, getContactChildren} = useContext(ContactContext);
  const {id, user_id} = useParams();
  const [modal, setModal] = useStateCallback(false);
  
  useEffect(() => {
    setContactId(id);
  }, [id, setContactId]);

  useEffect(() => {
    setContactUserId(user_id);
  }, [user_id, setContactUserId]);
    
  const handleModal2=()=>{
    setModal(false, ()=>setModal(<AttachStudent contactPhone={contactProfile.username} contactName={contactProfile.full_name} g={getContactChildren} h={getUserContacts} i={countContactContacts} isOpen={true}/>))
  }

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= transactionMeta.length) {
      setTransactionPage(newPage);
    }
  };

  return (
    <AppContainer title={"Contact Profile"} >
      <Toaster
          position="top-center"
          reverseOrder={false}
      />
      {modal}
        
      <section class="section profile">
        <div class="row">
          <div class="col-xl-4">
            <div class="col-lg-12">
              <div class="cards">
                <div class="card-body profile-card pt-4 d-flex flex-column gradient-my-blue">
                  <div class="main-img-user mb-2">
                    <img
                      alt="avatar"
                      style={{ height: "90px" }}
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/img/figure/user55.png"
                      }
                    />
                  </div>
                  <h3 style={{ color: "white" }}>
                    {contactProfile.full_name}
                  </h3>
                  <h5 style={{ color: "white" }}>{contactProfile.username}</h5>
                  
                </div>
              </div>
            </div>

            <ContactChildren children={contactChildren} handleModal2={handleModal2} getContactChildren={getContactChildren} user_id={contactUserId}/>
          </div>

          <div className="col-xl-8">
            <div className="row">
              <SummaryCount contactCount={contactCount} walletBalance={contactWalletBalance}/>

              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body pt-3">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills" className="flex-row mb-1">
                            <Nav.Item>
                              <Nav.Link size="sm" eventKey="first">
                                Contact Bio-Data{" "}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link size="sm" eventKey="second">
                                Contacts{" "}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link size="sm" eventKey="third">
                                Call Logs{" "}
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link size="sm" eventKey="fourth">
                                Transactions{" "}
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>

                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">

                              <ContactBioData contactProfile={contactProfile}/>
                              
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">

                              <UserContacts contactList={userContacts}/>

                            </Tab.Pane>

                            <Tab.Pane eventKey="third">

                              <ContactCallLogs logsList={contactLogs}/>
                              
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">

                              <ContactTransactions walletTransactions={contactTransactions} loading3={loading3}/>
                              <Pagination currentPage={transactionPage} totalPages={transactionMeta.length} onPageChange={handlePagination}/>
                              
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </AppContainer>
  )
}

export default ParentProfilePage;