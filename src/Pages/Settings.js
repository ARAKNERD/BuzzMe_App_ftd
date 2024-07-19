import React from 'react'
import AppContainer from '../Components/Structure/AppContainer';
import { Link } from 'react-router-dom';

const Settings = props => {

    return (
        <AppContainer title={"Settings"} >

            <div class="row gutters-20">
                <div class="col-lg-4 col-sm-6 col-12">
                    <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <Link to="/districts">
                            <div className="box-body" style={{position:"relative"}}>
                                <div className="user-pic text-center" >
                                    <div class="main-profile-overview widget-user-image text-center">
							            <div class="main-img-user">
                                            <img alt="avatar" src={process.env.PUBLIC_URL + "/assets/img/figure/map-point.png"}/>
                                        </div>
						            </div>
                                    <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                        <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>Districts</h5>
                                        <h6 className="pro-user-desc text-muted fs-14">Add or register new district</h6>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6 col-12">
                    <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <Link to="/regions">
                            <div className="box-body" style={{position:"relative"}}>
                                <div className="user-pic text-center" >
                                    <div class="main-profile-overview widget-user-image text-center">
							            <div class="main-img-user">
                                            <img alt="avatar" src={process.env.PUBLIC_URL + "/assets/img/figure/colombia.png"}/>
                                        </div>
						            </div>
                                    <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                        <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>Regions</h5>
                                        <h6 className="pro-user-desc text-muted fs-14">Add or create new region</h6>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6 col-12">
                    <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <Link to="/rates">
                            <div className="box-body" style={{position:"relative"}}>
                                <div className="user-pic text-center" >
                                    <div class="main-profile-overview widget-user-image text-center">
							            <div class="main-img-user">
                                            <img alt="avatar" src={process.env.PUBLIC_URL + "/assets/img/figure/interest.png"}/>
                                        </div>
						            </div>
                                    <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                        <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>Charge Rates</h5>
                                        <h6 className="pro-user-desc text-muted fs-14">Add or update the sms and call rates</h6>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                
            </div>

        </AppContainer>
    )
}

export default Settings;