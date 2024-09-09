import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import AddChargeRate from "./AddChargeRate";
import useStateCallback from "../../util/customHooks/useStateCallback";
import UpdateChargeRate from "./UpdateChargeRate";
import {Toaster, toast} from "react-hot-toast";
import RateContext from "../../Context/RateContext";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import UpdateSchoolRate from "./UpdateSchoolRate";
import DeleteSchoolRate from "./DeleteSchoolRate";
import AddChargeType from "./AddChargeType";

function ChargeRates() {
  const {rateList, getRateList} = useContext(RateContext);
  const {getTypeList} = useContext(RateContext);
  const [schoolRates, setSchoolRates] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshData = () =>{
    getRateList();
    getSchoolRates();
    getTypeList();
  }

  const getSchoolRates = async () => {
    setLoading(true)
    const server_response = await ajaxChargeRate.fetchSchoolRateList();
    setLoading(false)
    if (server_response.status === "OK") {
      setSchoolRates(server_response.details);
    }else {
      setSchoolRates("404");
    }
  };

  useEffect(() => {
    getSchoolRates();
  }, []);

  const [modal, setModal] = useStateCallback(false);

  const handleUpdate=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateChargeRate rateID={item.rate_id} g={getRateList} isOpen={true} rate={item.rate} type={item.type}/>))
  }

  const handleUpdate2=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateSchoolRate rateID={item.rate_id} g={getSchoolRates} isOpen={true} rate={item.rate} type={item.type}/>))
  }

  const handleDelete2=(e,item)=>{
    setModal(false, ()=>setModal(<DeleteSchoolRate rateID={item.rate_id} g={getSchoolRates} isOpen={true}/>))
  }
  const handleAdd=(e,item)=>{
    setModal(false, ()=>setModal(<AddChargeType g={getTypeList} isOpen={true}/>))
  }

  return (
    <AppContainer title="Charge Rates">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="pl-20" style={{float: "right"}}>
            <button
              type="button"
              onClick={handleAdd}
              className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-dodger-blue">
              <i className="fa-solid fa-plus" /> Add Charge Type
            </button>  
          </div>
        </div>
        <div className="col-lg-4">
          <AddChargeRate g={getSchoolRates} />
        </div>
        <div className="col-lg-8">
          <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Charge Rates"
                  subtitle="List of all the charge rates"
                />
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" 
                  data-toggle="dropdown" aria-expanded="false">...</a>
                
                  <div class="dropdown-menu dropdown-menu-right">
                      <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                  </div>
                </div>
              </div>
                              
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row mb-1">
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="first">
                      School Rates{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="second">
                      Default Rates{" "}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  <div className="border-top mt-1"></div>
                    <div className="table-responsive">
                    <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>School</th>
                      <th>Type</th>
                      <th>Rate</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(schoolRates) && schoolRates.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.school?.school_name}</td>
                          <td>{item.type}</td>
                          <td>{item.rate}</td>

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
                                  onClick={(e) => handleUpdate2(e,item)}>
                                   <i className="far fa-edit mr-1" style={{color:"orange"}}></i>
                                  Edit School Rate
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => handleDelete2(e,item)}>
                                   <i className="fa fa-trash mr-1" style={{color:"red"}}></i>
                                  Delete School Rate
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {schoolRates === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No school rates registered yet.
                          </td>
                        </tr>)}
                  </tbody>
                </table>
                {loading && <Loader />}
                            </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                  <div className="border-top mt-1"></div>
                   <div className="table-responsive">
                   <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Type</th>
                      <th>Rate</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(rateList) && rateList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.type}</td>
                          <td>{item.rate}</td>

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
                                  onClick={(e) => handleUpdate(e,item)}>
                                   <i className="far fa-edit mr-1" style={{color:"orange"}}></i>
                                  Edit Default Rate
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {!rateList && <Loader />}
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
    </AppContainer>
  );
}

export default ChargeRates;
