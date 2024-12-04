import React from "react";
import Loader from "../../Common/Loader";

function StudentCallLogs({studentLogs, loading2}) {

    return (
        <>
            <div className="border-top mt-1"></div>
            <div className="table-responsive">
                {loading2 ? (
                    <Loader />
                ) : (
                    <table className="table display data-table text-nowrap">
                        <thead>
                            <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Contact</th>
                            <th scope="col"> Duration</th>
                            <th scope="col"> Calling Station</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentLogs.length > 0 ? (
                                studentLogs.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.duration_format === "00:00" ? (
                                            <i className="fe fe-phone-missed" style={{color: "red",paddingRight: "10px"}}></i>
                                        ) : (
                                            <i className="fe fe-phone-outgoing" style={{color: "green",paddingRight: "10px"}}></i>
                                        )}{" "}
                                        {item.call_time}
                                    </td>

                                    <td className="text-dark">
                                        {item.callee_name}
                                        <br />
                                        <small>{item.callee_number}</small>
                                    </td>
                                    <td>{item.duration_format}</td>
                                    <td>
                                        {item.station_name}
                                        <br />
                                        <small>{item.school}</small>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center" }}>
                                        No student call logs yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </>

        
    );
}

export default StudentCallLogs;
