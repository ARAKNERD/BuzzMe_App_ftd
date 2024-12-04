import React from "react";

function SummaryCount({schoolBuzzCallsToday, schoolBuzzCallsThisWeek, schoolBuzzCallsThisMonth, studentsNumber, schoolContacts}) {

    return (
        <div class="col-8-xxxl col-12">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card custom-card" style={{paddingBottom:"10px"}}>
                        <div className="card-body map-card gradient-my-blue">
                            <div class="item-title mb-2" style={{color:"white"}}><b>BUZZ CALLS</b></div>
                            <div class="row" >
                                <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
                                    <div class="text-center" >
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{schoolBuzzCallsToday ? schoolBuzzCallsToday.total_p : "..."}</span></h2>
                                        <p class="mb-0 text-light"> Today</p>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
                                    <div class="text-center">
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{schoolBuzzCallsThisWeek ? schoolBuzzCallsThisWeek.total_p : "..."}</span></h2>
                                        <p class="mb-0 text-light"> This Week</p>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-sm-6 pr-0 pl-0">
                                    <div class="text-center">
                                        <h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{schoolBuzzCallsThisMonth ? schoolBuzzCallsThisMonth.total_p : "..."}</span></h2>
                                        <p class="mb-0 text-light">This Month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="item-icon bg-light">
                                    <img alt="avatar" src={process.env.PUBLIC_URL + "/assets/img/figure/students.png"}/>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="item-content">
                                    <div class="item-title" style={{ color: "white" }}>
                                        Students
                                    </div>
                                    <div class="item-number" style={{ color: "white" }}>
                                        <span class="counter">
                                            {studentsNumber ? studentsNumber.total_p : "..."}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="dashboard-summery-one mg-b-20 gradient-my-blue">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="item-icon bg-light">
                                    <img alt="avatar" style={{height:"60px"}} src={process.env.PUBLIC_URL + "/assets/img/figure/phone-call.png"}/>

                                </div>
                            </div>
                            <div class="col-6">
                                <div class="item-content">
                                    <div class="item-title" style={{ color: "white" }}>
                                        Contacts
                                    </div>
                                    <div class="item-number" style={{ color: "white" }}>
                                        <span class="counter">
                                            {schoolContacts ? schoolContacts.total_c: "..."}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        
    );
}

export default SummaryCount;
