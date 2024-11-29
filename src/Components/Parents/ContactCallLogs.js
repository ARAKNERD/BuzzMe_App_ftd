import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


function ContactCallLogs({logsList}) {

    return (
        <>
            <div className="border-top mt-1"></div>
            <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0" id="seventh">
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
                                    <OverlayTrigger placement="top" overlay={
                                        <Tooltip id="refresh-tooltip">
                                            {item.type}
                                        </Tooltip>}>
                                        {item.type ==="missed" ? (
                                            <i className="fe fe-phone-missed" style={{color: "red", paddingRight: "10px"}}></i>
                                        ) : item.type === "sent" ? (
                                            <i className="fe fe-phone-outgoing" style={{color: "green", paddingRight: "10px"}}></i>
                                        ):(
                                            <i className="fe fe-phone-incoming" style={{color: "green", paddingRight: "10px"}}></i>
                                        )}
                                    </OverlayTrigger>{" "}
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
                                <td colSpan="4" style={{ textAlign: "center" }}>
                                No call logs for this contact yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </>
        
    );
}

export default ContactCallLogs;
