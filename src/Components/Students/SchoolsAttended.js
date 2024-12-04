import React from "react";

function SchoolsAttended({studentProfile, studentTransfers}) {

    return (
        <div class="col-lg-12">
            <div class="cards pt-3">
                <div class="card-body profile-card pt-4 d-flex flex-column">
                    <div className="box-header  border-0 pd-0">
                        <div className="box-title fs-20 font-w600">
                            Schools Attended
                        </div>
                    </div>
                    <div class="activity-block">
                        <ul className="task-list" style={{ listStyle: "none", position: "relative", margin: "0", paddingTop: "10px", paddingLeft: "10px"}}>
                            <li style={{position: "relative", paddingLeft: "25px", marginBottom: "40px"}}>
                                <i className="task-icon" style={{top: 0,left: 0,width: "13px",height: "13px",position: "absolute",borderRadius: "50%",padding: "2px",zIndex: "2", backgroundColor: "#ff7200"}}></i>
                                <h6 style={{ marginBottom: "5px" }}>
                                    {studentProfile.school}
                                    <small className="float-right text-muted tx-11">
                                        CURRENT
                                    </small>
                                </h6>
                                <span className="text-muted tx-12" style={{ fontSize: "12px" }}>
                                    School
                                </span>

                                <div className="vertical-line" style={{position: "absolute",left: "5px",top: "0", height: "120px",width: "1px",backgroundColor: "#ccc",zIndex: "1"}}></div>
                            </li>

                            {Array.isArray(studentTransfers) && studentTransfers.map((item, key) => (
                                <li style={{position: "relative",paddingLeft: "25px",marginBottom: "40px"}}>
                                    <i className="task-icon" style={{top: 0,left: 0,width: "12px",height: "12px",position: "absolute",borderRadius: "50%",padding: "2px",zIndex: "2",backgroundColor: "#ff7200"}}></i>
                                    <h6 style={{ marginBottom: "5px" }}>
                                        {item.school_from}
                                    </h6>
                                    <span className="text-muted tx-12" style={{ fontSize: "12px" }}>
                                        {item.school_from_district}
                                    </span>

                                    <div className="vertical-line" style={{position: "absolute",left: "5px",top: "0",height: "120px",width: "1px",backgroundColor: "#ccc",zIndex: "1"}}></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default SchoolsAttended;
