import React from "react";
import { Link } from "react-router-dom";

const CallLogsTable = ({ logsList, onCompleteCall, logType }) => {

    const getEmptyMessage = () => {
        switch (logType) {
          case "zego":
            return "No buzz to buzz call logs.";
          case "twilio":
            return "No buzz to other network call logs.";
          default:
            return "No call logs available.";
        }
    };

  return (
    <table className="table display data-table text-nowrap">
      <thead>
        <tr>
          <th>Date & Time</th>
          <th>Call Status</th>
          <th>Caller Details</th>
          <th>Callee Details</th>
          <th>Duration</th>
          <th>Station</th>
          <th>Call Cost</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {logsList.length > 0 ? (
          logsList.map((item, index) => (
            <tr key={index}>
              <td>{item.call_time}</td>
              <td>
                {item.status === "started" ? (
                  <span className="badge badge-info">STARTED</span>
                ) : item.status === "accepted" ? (
                  <span className="badge badge-warning">ACCEPTED</span>
                ) : item.status === "completed" ? (
                  <span className="badge badge-success">COMPLETED</span>
                ) : item.status === "missed" ? (
                  <span className="badge badge-pink">MISSED</span>
                ) : (
                  <span className="badge badge-danger">CANCELED</span>
                )}
              </td>
              <td className="text-dark">
                {item.caller_name}
                <br />
                <small>{item.caller_number}</small>
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
                <small>{item.school_name}</small>
              </td>
              <td>UGX. {item.call_cost?.total_c}</td>
              <td>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="flaticon-more-button-of-three-dots"></span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right">
                    {item.status === "started" || item.status === "accepted" ? (
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={(e) => onCompleteCall(e, item)}
                      >
                        <i
                          className="fa fa-power-off mr-1"
                          style={{ color: "red" }}
                        ></i>
                        Complete Call
                      </Link>
                    ) : (
                      <Link className="dropdown-item" to="#">
                        <i
                          className="fa fa-power-off mr-1"
                          style={{ color: "red" }}
                        ></i>
                        Call Completed
                      </Link>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
            {getEmptyMessage()}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CallLogsTable;
