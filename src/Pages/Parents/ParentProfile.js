import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import AppContainer from "../../Components/Structure/AppContainer";
import Loader from '../../Components/Common/Loader';
import TableHeader from '../../Components/Common/TableHeader';
import ajaxParent from '../../util/remote/ajaxParent';
import useStateCallback from '../../util/customHooks/useStateCallback';
import AddStudentParent from './AddStudentParent';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ajaxCallStation from '../../util/remote/ajaxCallStation';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ajaxBank from '../../util/remote/ajaxBank';
import DeleteAccount from '../DeleteAccount';

const ParentProfile = props => {
    const [parentProfile, setParentProfile] = useState(false);
    const {id, user_id} = useParams();
    const [children, setChildren] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const [contactCount, setContactCount] = useState(false);
    const [contactList, setContactList] = useState(false);
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const [loading3,setLoading3] = useState(false)

    const [loading4,setLoading4] = useState(false)
    const [loading5,setLoading5] = useState(false)
    const [walletBalance, setWalletBalance] = useState(false);
    const [walletTransactions, setWalletTransactions] = useState(false);

    const [logsList, setLogsList] = useState(false);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState("");

    const getParentProfile =async()=>{
        
        setLoading(true)
        const server_response = await ajaxParent.fetchParentInfo(id);
        setLoading(false)
        if(server_response.status==="OK"){
            //store results
            setParentProfile(server_response.details);
        }else{
            //communicate error
            setParentProfile("404");
        }
    }

    const getChildren =async()=>{
        setLoading2(true)
        const server_response = await ajaxParent.fetchChildren(id);
        setLoading2(false)
        if(server_response.status==="OK"){
            setChildren(server_response.details);
        }else{
            //communicate error
            setChildren("404");
        }
    }

    const getParentContacts =async()=>{
      setLoading4(true)
      const server_response = await ajaxParent.listParentContacts(user_id);
      setLoading4(false)
      if(server_response.status==="OK"){
          setContactList(server_response.details);
      }else{
          //communicate error
          setContactList("404");
      }
  }
  const getParentLogs =async()=>{
    setLoading5(true)
    const server_response = await ajaxCallStation.listUserCallLogs(user_id);
    setLoading5(false)
    if(server_response.status==="OK"){
        setLogsList(server_response.details);
    }else{
        //communicate error
        setLogsList("404");
    }
}


    const countUserContacts =async()=>{
        const server_response = await ajaxParent.countUserContacts(user_id);
        if(server_response.status==="OK"){
            setContactCount(server_response.details);
        }else{
            //communicate error
            setContactCount("404");
        }
    }

    const getParentBalance = async () => {
      const server_response = await ajaxBank.fetchStudentWalletBalance(user_id);
      if (server_response.status === "OK") {
        //store results
        setWalletBalance(server_response.details);
      } else {
        //communicate error
        setWalletBalance(false);
      }
    };

    const getWalletTransactions = async () => {
      setLoading3(true);
      const server_response = await ajaxBank.fetchUserWalletTransactions(
        user_id,
        page
      );
      setLoading3(false);
      if (server_response.status === "OK") {
        setMeta(server_response.details.meta.list_of_pages);
        setWalletTransactions(server_response.details.list);
      } else {
        //communicate error
        setWalletTransactions("404");
      }
    };

    const setNextPageNumber = () => {
      if (meta.length === page) {
      } else {
        setPage(page + 1);
      }
    };
  
    const setPreviousPageNumber = () => {
      if (page === 1) {
      } else {
        setPage(page - 1);
      }
    };
    const setPageNumber = (e, item) => {
      setPage(item);
    };
    useEffect(()=>{
        getChildren();
        getParentProfile(id);
      
    }, [id])
    useEffect(() => {
      getWalletTransactions();
    }, [user_id, page]);
    useEffect(() => {
        countUserContacts();
        getParentContacts();
        getParentLogs();
        getParentBalance();
      }, [user_id]);
    const handleModal2=()=>{
        setModal(false, ()=>setModal(<AddStudentParent parentID={id} g={getChildren} isOpen={true}/>))
    }
  
 
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
            <div className="row">
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
                      {parentProfile.full_name}
                    </h3>
                    <h5 style={{ color: "white" }}>{parentProfile.username}</h5>
                    
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="cards pt-3">
                  <div class="card-body profile-card pt-4 d-flex flex-column">
                  <TableHeader
                            title="Students"
                            viewButton={
                                <a href="#" onClick={handleModal2} className="btn btn-info" style={{float:"right"}}>Attach Student</a>
                               
                            } 
                           
                                
                        />
                    <div class="user-manager scroll-widget border-top">
									<div class="table-responsive">
										<table class="table mg-b-0">
                   
											<tbody>
                      {Array.isArray(children) && children.map((item, key) => (
												<tr key={key}>
													<td class="bd-t-0">
														<div class="main-img-user"><img alt="avatar" style={{ height: "50px" }} src={
                          process.env.PUBLIC_URL +
                          "/assets/img/figure/user55.png"
                        }/></div>
													</td>
													<td class="bd-t-0">
														<h6 class="mg-b-0">{item.student.full_name}</h6><small class="tx-11 tx-gray-500">{item.student?.school}</small>
													</td>
													
												</tr>
                      ))}
                                        {children === "404" && (<tr>
                          <td colSpan="2" style={{textAlign: "center"}}>
                            No students attached to this contact yet.
                          </td>
                        </tr>)}
										

											</tbody>
										</table>
                    {loading2 && <Loader />}

									</div>
								</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="row">
              <div class="col-lg-12">
                <div
                  class="card custom-card "
                  style={{ paddingBottom: "10px" }}
                >
                  <div className="card-body map-card gradient-orange-peel">
                    <div class="item-title mb-2" style={{ color: "white" }}>
                      <b>SUMMARY</b>
                    </div>
                    <div class="row">
                      <div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
                        <div class="text-center">
                          <h2
                            class="mb-1 number-font"
                            style={{ color: "white" }}
                          >
                            <span class="counter">
                              {contactCount ? contactCount.total_p : "..."}
                            </span>
                          </h2>
                          <p class="mb-0 text-light"> Contacts</p>
                        </div>
                      </div>
                     
                      <div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0">
                        <div class="text-center">
                          <h2
                            class="mb-1 number-font"
                            style={{ color: "white" }}
                          >
                            <span class="counter">
                              <small>UGX. </small>
                              {walletBalance? walletBalance:"..."}
                            </span>
                          </h2>
                          <p class="mb-0 text-light"> Wallet Balance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body pt-3">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
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
                              
                                  <table className="table mb-0 mw-100 color-span">
                                    {parentProfile && (
                                      <tbody>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Names{" "}
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {parentProfile.full_name}
                                            </span>{" "}
                                          </td>
                                        </tr>

                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Username
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {parentProfile.username}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              Address
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {parentProfile.address}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="w-50">
                                              NIN
                                            </span>{" "}
                                          </td>
                                          <td>:</td>
                                          <td className="py-2 px-0">
                                            {" "}
                                            <span className="">
                                              {parentProfile.nin}
                                            </span>{" "}
                                          </td>
                                        </tr>
                                       
                                      </tbody>
                                    )}
                                  </table>
                                  {loading && <Loader />}
                                
                              
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <TableHeader
                                subtitle="List of all the contacts"
                                // viewButton={
                                //   <a
                                //     href="#"
                                //     onClick={handleModal3}
                                //     className="btn btn-info"
                                //     style={{ float: "right" }}
                                //   >
                                //     Add Contact
                                //   </a>
                                // }
                              />

                              <div className="table-responsive">
                                <table
                                  className="table table-hover text-nowrap mg-b-0"
                                  id="second"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col">No.</th>
                                      <th scope="col"> Names</th>
                                      <th scope="col"> Contact Number</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(contactList) &&
                                      contactList.map((item, key) => (
                                        <tr key={key}>
                                          <th scope="row">{key + 1}</th>
                                          <td>{item.contact_name}</td>
                                          <td>{item.contact?.username}</td>
                                        </tr>
                                      ))}
                                    {contactList === "404" && (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          style={{ textAlign: "center" }}
                                        >
                                          No contacts added to this parent yet.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                {loading4 && <Loader />}
                              </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                              <div className="border-top mt-1"></div>
                              <div className="table-responsive">
                                <table
                                  className="table table-hover text-nowrap mg-b-0"
                                  id="seventh"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col">Date & Time</th>
                                      <th scope="col">Contact</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(logsList) &&
                                      logsList.map((item, key) => (
                                        <tr key={key}>
                                          
                                          <td>
                                          <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="refresh-tooltip">
                            {item.type}
                          </Tooltip>
                        }
                      >{item.type ===
                                            "missed" ? (
                                              <i
                                                className="fe fe-phone-missed"
                                                style={{
                                                  color: "red",
                                                  paddingRight: "10px",
                                                }}
                                              ></i>
                                            ) : item.type ===
                                            "sent" ? (
                                              <i
                                                className="fe fe-phone-outgoing"
                                                style={{
                                                  color: "green",
                                                  paddingRight: "10px",
                                                }}
                                              ></i>
                                            ):(
                                              <i
                                                className="fe fe-phone-incoming"
                                                style={{
                                                  color: "green",
                                                  paddingRight: "10px",
                                                }}
                                              ></i>
                                            )}</OverlayTrigger>{" "}
                                            {item.call_time}
                                          </td>

                                          <td className="text-dark">
                                            {item.name}
                                            <br />
                                            <small>{item.number}</small>
                                          </td>
                                        </tr>
                                      ))}
                                    
                                    {logsList === "404" && (
                                      <tr>
                                        <td
                                          colSpan="4"
                                          style={{ textAlign: "center" }}
                                        >
                                          No call logs for this contact yet.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                                {loading5 && <Loader />}
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                              <div className="border-top mt-1"></div>
                              <div className="table-responsive">
                                <table
                                  className="table table-hover text-nowrap mg-b-0"
                                  id="seventh"
                                >
                                  <thead>
                                  <tr>
                                      <th>Transaction Date</th>
                                      <th>Amount</th>
                                      <th>Cost Details</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {Array.isArray(walletTransactions) &&
                                      walletTransactions.map((item, key) => (
                                        <tr key={key}>
                                          <td>
                                            {item.created_at?.short_date}
                                            <br />
                                            <small>
                                              {item.created_at?.time}
                                            </small>
                                          </td>
                                         
                                          <td>
                                            <span class="badge bg-teal">
                                            {item.account === "BUZZTIME LOAD"?<i
                                                class="fa fa-circle-arrow-up text-teal fs-9px fa-fw me-5px"
                                                style={{ color: "#28a745" }}
                                              ></i>:<i
                                              class="fa fa-circle-arrow-down text-teal fs-9px fa-fw me-5px"
                                              style={{ color: "#dc3545" }}
                                            ></i>}</span>
                                              UGX.{" "}
                                              {item.account === "BUZZTIME LOAD"
                                                ? item.cash_in
                                                : item.cash_out}
                                            
                                          </td>
                                          <td>
                                            <span class="badge badge-primary">
                                              {item.account}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    {walletTransactions === "404" && (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          style={{ textAlign: "center" }}
                                        >
                                          No transactions involving this contact
                                          yet.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                  <div
                                    className="align-items-center justify-content-center pos-absolute"
                                    style={{ left: "50%" }}
                                  >
                                    <button
                                      className="btn btn-dark"
                                      style={{
                                        borderRight: "1px solid yellow",
                                      }}
                                      onClick={setPreviousPageNumber}
                                    >
                                      <i className="fa fa-angle-left mr-2"></i>{" "}
                                      Prev
                                    </button>
                                    {Array.isArray(meta) &&
                                      meta.map((item) =>
                                        page === item ? (
                                          <button
                                            style={{
                                              borderRight: "1px solid yellow",
                                            }}
                                            className="btn btn-primary"
                                          >
                                            {item}
                                          </button>
                                        ) : (
                                          <button
                                            onClick={(e) =>
                                              setPageNumber(e, item)
                                            }
                                            style={{
                                              borderRight: "1px solid yellow",
                                            }}
                                            className="btn btn-dark"
                                          >
                                            {item}
                                          </button>
                                        )
                                      )}

                                    <button
                                      style={{
                                        borderRight: "1px solid yellow",
                                      }}
                                      className="btn btn-dark"
                                      onClick={setNextPageNumber}
                                    >
                                      Next
                                      <i className="fa fa-angle-right ml-2"></i>
                                    </button>
                                  </div>
                                </table>
                                {loading3 && <Loader />}
                              </div>
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

export default ParentProfile;