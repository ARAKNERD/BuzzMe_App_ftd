import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxCallStation from "../../util/remote/ajaxCallStation";
import Loader from "../../Components/Common/Loader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import CompleteCall from "./CompleteCall";

function TwilioLogs() {

  const [twilioLogsList, setTwilioLogsList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState([])
  const [searchStudent, setSearchStudent] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [modal, setModal] = useStateCallback(false);
  const [isSearching, setIsSearching] = useState(false);

  const getTwilioLogsList = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxCallStation.listTypeCallLogs(currentPage, "GSM");
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setTwilioLogsList(server_response.details.list || []);
    } else {
      setTwilioLogsList([]);
    }
  };
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isSearching) {
        getTwilioLogsList(page);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [page, isSearching]);

  const searchTwilioLogs = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    setIsSearching(true);
    const server_response = await ajaxCallStation.searchTypeLogs("GSM", page, searchStudent, searchContact, startDate, endDate);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setTwilioLogsList(server_response.details.list || []);
    } else {
      setTwilioLogsList([]);
    }     
  };

  const resetSearch = () => {
    setSearchStudent("");
    setSearchContact("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    setIsSearching(false);
    getTwilioLogsList(1); 
  };

  const completeCall = (e, item) => {
    setModal(false, () =>
      setModal(
        <CompleteCall
          callID={item.id}
          g={getTwilioLogsList}
          isOpen={true}
        />
      )
    );
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Date & Time", "Call Status", "Caller Details", "Callee Details", "Duration", "Station", "Call Cost"];
    const data = twilioLogsList.map(item => [
      item.call_time,
      item.status,
      `${item.caller_name} (${item.caller_number})`,
      `${item.callee_name} (${item.callee_number})`,
      item.duration_format,
      `${item.station_name} (${item.school_name})`,
      `UGX. ${item.call_cost?.total_c}`,

    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("twilio_call_logs.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (searchStudent || searchContact || startDate || endDate) {
      searchTwilioLogs();
    } else {
      getTwilioLogsList(page, "GSM");
    }
  }, [page, "GSM"]);

  return (
    <>
     {modal}
      <div class="heading-layout1 mg-b-5">
        <TableHeader
          subtitle="List of all the buzz to other network calls sorted by the most recent"    
        />
        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" 
          data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
          </div>
        </div>
      </div>

      <form className="mg-t-10">
        <div className="row gutters-8">
          <div className="col-10-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <div className="row">
              <div className="col-lg-3">
                <input type="text" placeholder="Enter callee name..." className="form-control" style={{border: "1px solid grey"}} value={searchStudent} 
                  onChange={(e) => {
                    setSearchStudent(e.target.value);
                    if (e.target.value === '') {
                      resetSearch(e);
                    }
                  }}
                />
              </div>
              <div className="col-lg-3">
            <input
              type="text"
              placeholder="Enter callee name..."
              style={{border: "1px solid grey"}}
              value={searchContact} onChange={(e) => {
                setSearchContact(e.target.value);
                if (e.target.value === '') {
                  resetSearch(e);
                }
              }}
              className="form-control"
            />
           </div>
              <div className="col-lg-6">
                <div class="flex-fill position-relative">
                  <div class="input-group input-daterange" id="datepicker">
                    <input type="date" style={{border: "1px solid grey"}} class="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="start date"/>
                    <span class="input-group-text" style={{marginLeft: "-1px", borderTopLeftRadius:"0", borderTopRightRadius:"0", borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}}>to</span>
                    <input type="date" style={{border: "1px solid grey"}} value={endDate} onChange={(e) => setEndDate(e.target.value)} class="form-control" placeholder="end date"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button type="submit" onClick={(e) => searchTwilioLogs(e)} className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
              SEARCH
            </button>
          </div>
        </div>
      </form>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {loading || loading2 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
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
              {twilioLogsList.length > 0 ? (
                twilioLogsList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.call_time}</td>
                <td>
                  {item.status==="started"?<span class="badge badge-info">STARTED</span>:
                  item.status==="accepted"?<span class="badge badge-warning">ACCEPTED</span>:
                  item.status==="completed"?<span class="badge badge-success">COMPLETED</span>:
                  item.status==="missed"?<span class="badge badge-pink">MISSED</span>:
                  <span class="badge badge-danger">CANCELED</span>}</td>
                <td className="text-dark">{item.caller_name}<br /><small>{item.caller_number}</small></td>
                <td className="text-dark">{item.callee_name}<br /><small>{item.callee_number}</small></td>
                <td>{item.duration_format}</td>
                <td>{item.station_name}<br /><small>{item.school_name}</small></td>
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
                               
                              
                                {item.status === "started" || item.status==="accepted"? (
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                    onClick={(e) => completeCall(e, item)}
                                  >
                                    <i
                                      className="fa fa-power-off mr-1"
                                      style={{ color: "red" }}
                                    ></i>
                                    Complete Call
                                  </Link>
                                ) : (
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                    
                                  >
                                   
                                    <i
                                      className="fa fa-power-off mr-1"
                                      style={{ color: "red" }}
                                    ></i>
                                    Complete Call
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
                    No buzz to other network logs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(meta) && meta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${page === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
    </>
  );
}

export default TwilioLogs;
