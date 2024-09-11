import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxCallStation from "../../util/remote/ajaxCallStation";
import Loader from "../../Components/Common/Loader";
import AuthContext from "../../Context/AuthContext";
import SchoolContext from "../../Context/SchoolContext";

function SchoolTwilioLogs() {
  const [twilioLogsList, setTwilioLogsList] = useState(false);
  const [twilioSearch, setTwilioSearch] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const { user } = useContext(AuthContext);
  const { schoolDetails } = useContext(SchoolContext);

  const getTwilioLogsList = async () => {
    setLoading(true);
    const server_response = await ajaxCallStation.listSchoolTypeCallLogs(
      schoolDetails.school_id,
      page,
      "GSM"
    );
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setTwilioLogsList(server_response.details.list);
      if (searchStudent || searchContact || startDate || endDate) {
        setTwilioSearch(server_response.details.list);
      }
    } else {
      setTwilioLogsList("404");
    }
  };

  const searchTwilioLogs = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxCallStation.searchSchoolTypeLogs(schoolDetails.school_id, "GSM", page, searchStudent, searchContact, startDate, endDate);
    setLoading2(false);
    if (server_response.status === "OK") {
      if (server_response.details.length === 0) {
        setTwilioSearch([]);
      } else {
        setMeta(server_response.details.meta.list_of_pages);
        setTwilioSearch(server_response.details.list);
      }
    } else {
      setTwilioSearch([]);
    }
  };

  const resetSearch = () => {
    setSearchStudent("");
    setSearchContact("");
    setStartDate("");
    setEndDate("");
    setTwilioSearch([]);
    setPage(1);
    getTwilioLogsList();
  };

  const exportToPDF = () => {
    const table = document.querySelector(".table"); // Select the table element
    const pdf = new jsPDF("p", "pt", "a4");

    // Define columns for the table (add more if needed)
    const columns = ["Date & Time", "Student", "Contact", "Amount"];

    // Extract data from the table and format it as an array of arrays
    const data = Array.from(table.querySelectorAll("tr")).map((row) => {
      return Array.from(row.querySelectorAll("td")).map(
        (cell) => cell.textContent
      );
    });

    // Remove the header row
    data.shift();

    // Create the PDF document and add the table
    pdf.autoTable({
      head: [columns],
      body: data,
    });

    // Save the PDF
    pdf.save("airtime_data.pdf");
  };

  const setNextPageNumber = () => {
    if (meta.length === page) {
    } else {
      setPage(page + 1);
    }
  };

  const setPreviousPageNumber = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };
  const setPageNumber = (e, item) => {
    setPage(item);
  };

  useEffect(() => {
    searchTwilioLogs();
  }, [schoolDetails.school_id, page, "GSM"]);
  useEffect(() => {
    getTwilioLogsList();
    const interval = setInterval(() => {
      getTwilioLogsList();
    }, 10000);

    return () => clearInterval(interval);
  }, [schoolDetails.school_id, page, "GSM"]);

  return (
    <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader subtitle="List of all the buzz to other network calls sorted by the most recent" />
        <div class="dropdown">
          <a
            class="dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            ...
          </a>

          <div class="dropdown-menu dropdown-menu-right">
            <Link class="dropdown-item" onClick={exportToPDF}>
              <i class="fas fa-file-export"></i>Export
            </Link>
          </div>
        </div>
      </div>
      <form className="mg-t-10">
        <div className="row gutters-8">
          <div className="col-10-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <div className="row">
              <div className="col-lg-3">
                <input
                  type="text"
                  placeholder="Enter student name..."
                  style={{ border: "1px solid grey" }}
                  value={searchStudent}
                  onChange={(e) => {
                    setSearchStudent(e.target.value);
                    if (e.target.value === "") {
                      resetSearch(e);
                    }
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  placeholder="Enter contact name /number..."
                  style={{ border: "1px solid grey" }}
                  value={searchContact}
                  onChange={(e) => {
                    setSearchContact(e.target.value);
                    if (e.target.value === "") {
                      resetSearch(e);
                    }
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-lg-6">
                <div class="flex-fill position-relative">
                  <div class="input-group input-daterange" id="datepicker">
                    <input
                      type="date"
                      style={{ border: "1px solid grey" }}
                      class="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="start date"
                    />
                    <span
                      class="input-group-text"
                      style={{
                        marginLeft: "-1px",
                        borderTopLeftRadius: "0",
                        borderTopRightRadius: "0",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      }}
                    >
                      to
                    </span>
                    <input
                      type="date"
                      style={{ border: "1px solid grey" }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      class="form-control"
                      placeholder="end date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-2-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button
              type="submit"
              onClick={(e) => searchTwilioLogs(e)}
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3"
            >
              SEARCH
            </button>
          </div>
        </div>
      </form>
      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        <table className="table display data-table text-nowrap">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Call Status</th>
              <th>Student</th>
              <th>Contact</th>
              <th>Duration</th>
              <th>Station</th>
              {/* <th>Call Cost</th> */}
            </tr>
          </thead>
          <tbody>
            {twilioSearch.length > 0 ? (
              twilioSearch.map((item, key) => (
                <tr key={key}>
                  <td> {item.call_time}</td>
                  <td>
                  {item.status==="started"?<span class="badge badge-info">STARTED</span>:
                  item.status==="accepted"?<span class="badge badge-warning">ACCEPTED</span>:
                  item.status==="completed"?<span class="badge badge-success">COMPLETED</span>:
                  item.status==="missed"?<span class="badge badge-pink">MISSED</span>:
                  <span class="badge badge-danger">CANCELED</span>}</td>
                <td className="text-dark">{item.caller_name}<br /><small>{item.caller_number}</small></td>
                <td className="text-dark">{item.callee_name}<br /><small>{item.callee_number}</small></td>
                <td>{item.duration_format}</td>
                {/* <td>{item.station_name}<br /><small>{item.school}</small></td> */}
                <td>N/A</td>
                {/* <td>UGX. 600</td> */}
                </tr>
              ))
            ) : twilioLogsList === "404" ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No buzz to other network call logs found.
                </td>
              </tr>
            ) : (
              (searchStudent || searchContact || startDate || endDate) && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No search result(s) found.
                  </td>
                </tr>
              )
            )}
          </tbody>
          <div
            className="align-items-center justify-content-center pos-absolute"
            style={{ left: "50%" }}
          >
            <button
              className="btn btn-dark"
              style={{ borderRight: "1px solid yellow" }}
              onClick={setPreviousPageNumber}
            >
              <i className="fa fa-angle-left mr-2"></i> Prev
            </button>
            {Array.isArray(meta) &&
              meta.map((item) =>
                page === item ? (
                  <button
                    style={{ borderRight: "1px solid yellow" }}
                    className="btn btn-primary"
                  >
                    {item}
                  </button>
                ) : (
                  <button
                    onClick={(e) => setPageNumber(e, item)}
                    style={{ borderRight: "1px solid yellow" }}
                    className="btn btn-dark"
                  >
                    {item}
                  </button>
                )
              )}

            <button
              style={{ borderRight: "1px solid yellow" }}
              className="btn btn-dark"
              onClick={setNextPageNumber}
            >
              Next<i className="fa fa-angle-right ml-2"></i>
            </button>
          </div>
        </table>
        {loading2 && <Loader />}
        {loading && <Loader />}
      </div>
    </>
  );
}

export default SchoolTwilioLogs;
