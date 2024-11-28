import React from "react";
import { Link } from "react-router-dom";

const ChargeRatesTable = ({ rateList, handleUpdate, ratesType}) => {
    const getEmptyMessage = () => {
        switch (ratesType) {
          case "default":
            return "No default rates registered yet.";
          case "school":
            return "No school rates registered yet.";
          default:
            return "No rates registered yet.";
        }
    };

    return (
        <table className="table display data-table text-nowrap">
        <thead>
        <tr>
            <th>No.</th>
            {ratesType === "school" && <th>School</th>}
            <th>Type</th>
            <th>Rate</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {Array.isArray(rateList) && rateList.map((item, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                {ratesType === "school" && <td>{item.school?.school_name}</td>}
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
                                Edit Rate Value
                            </Link>
                            </div>
                        </div>
                    </td>
                </tr>
            )
            
            )}
            {rateList === "404" && (<tr>
                <td colSpan={ratesType === "school" ? "5" : "4"} style={{ textAlign: "center" }}>
                    {getEmptyMessage()}
                </td>
            </tr>)}
        </tbody>
        </table>
    );
};

export default ChargeRatesTable;
