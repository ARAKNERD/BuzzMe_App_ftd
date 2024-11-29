import React from "react";
import Loader from "../Common/Loader";

function ContactTransactions({walletTransactions, loading3}) {

    return (
        <>
            <div className="border-top mt-1"></div>
            <div className="table-responsive">
                {loading3 ? (
                    <Loader /> 
                ) : (
                    <table className="table display data-table text-nowrap">
                        <thead>
                            <tr>
                                <th>Transaction Date</th>
                                <th>Amount</th>
                                <th>Cost Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {walletTransactions.length > 0 ? (
                                walletTransactions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.created_at?.short_date}<br /><small>{item.created_at?.time}</small></td>                                          
                                    <td>
                                        <span class="badge bg-teal">
                                            {item.account === "BUZZTIME LOAD" || item.account === "ADMIN REFUND" || item.account === "ACTIVATION BUZZ TIME"?
                                                <i class="fa fa-circle-arrow-up text-teal fs-9px fa-fw me-5px" style={{ color: "#28a745" }}></i>
                                                :
                                                <i class="fa fa-circle-arrow-down text-teal fs-9px fa-fw me-5px" style={{ color: "#dc3545" }}></i>
                                            }
                                        </span>
                                        UGX.{" "}
                                        {item.account === "BUZZTIME LOAD" || item.account === "ADMIN REFUND" || item.account === "ACTIVATION BUZZ TIME"
                                            ? item.cash_in
                                            : item.cash_out}
                                        
                                    </td>
                                    <td>
                                        <span class="badge badge-primary">
                                        {item.account}
                                        </span>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                        No user transactions yet.
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

export default ContactTransactions;
