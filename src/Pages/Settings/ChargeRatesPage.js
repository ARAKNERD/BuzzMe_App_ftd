import React, {useContext, useEffect} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import useStateCallback from "../../util/customHooks/useStateCallback";
import {Toaster} from "react-hot-toast";
import RateContext from "../../Context/RateContext";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import UpdateSchoolRate from "../../Components/Settings/ChargeRate/UpdateSchoolRate";
import DeleteSchoolRate from "../../Components/Settings/ChargeRate/DeleteSchoolRate";
import AddChargeType from "../../Components/Settings/ChargeRate/AddChargeType";
import ChargeRatesTable from "../../Components/Common/Settings/ChargeRates/ChargeRatesTable";
import UpdateChargeRate from "../../Components/Settings/ChargeRate/UpdateChargeRate";
import AddChargeRate from "../../Components/Settings/ChargeRate/AddChargeRate";

function ChargeRatesPage() {

    const {rateList, getRateList, schoolRates, getSchoolRates, loading} = useContext(RateContext);
    const {getTypeList} = useContext(RateContext);

    const refreshData = () =>{
        getRateList();
        getSchoolRates();
        getTypeList();
    }

    useEffect(() => {
        getSchoolRates();
        getRateList();
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
                        <button type="button" onClick={handleAdd} className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-dodger-blue">
                            <i className="fa-solid fa-plus" /> Add Charge Type
                        </button>  
                    </div>
                </div>

                <div className="col-lg-4">
                    <AddChargeRate />
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
                                <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
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
                                        Default Rates{" "}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link size="sm" eventKey="second">
                                    School Rates{" "}
                                    </Nav.Link>
                                </Nav.Item>
                                </Nav>
                            </Col>

                            <Col sm={12}>
                                <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="border-top mt-1"></div>
                                    <div className="table-responsive">
                                        {loading? (
                                            <Loader /> 
                                        ) : (
                                        <ChargeRatesTable rateList={rateList} handleUpdate={handleUpdate} ratesType="default"/>
                                        )}
                            
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="second">
                                    <div className="border-top mt-1"></div>
                                    <div className="table-responsive">
                                        {loading? (
                                                <Loader /> 
                                            ) : (
                                            <ChargeRatesTable rateList={schoolRates} handleUpdate={handleUpdate2} ratesType="school"/>
                                        )}
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

export default ChargeRatesPage;
