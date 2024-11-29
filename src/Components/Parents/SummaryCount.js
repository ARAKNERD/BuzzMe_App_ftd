import React from "react";

function SummaryCount({contactCount, walletBalance}) {

    return (
        <div class="col-lg-12">
            <div class="card custom-card" style={{ paddingBottom: "10px" }}>
                <div className="card-body map-card gradient-orange-peel">
                    <div class="item-title mb-2" style={{ color: "white" }}>
                        <b>SUMMARY</b>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0 border-right">
                            <div class="text-center">
                                <h2 class="mb-1 number-font" style={{ color: "white" }}>
                                    <span class="counter">
                                        {contactCount ? contactCount.total_p : "..."}
                                    </span>
                                </h2>
                                <p class="mb-0 text-light"> Contacts</p>
                            </div>
                        </div>
                     
                        <div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0">
                            <div class="text-center">
                                <h2 class="mb-1 number-font" style={{ color: "white" }}>
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
        
    );
}

export default SummaryCount;
