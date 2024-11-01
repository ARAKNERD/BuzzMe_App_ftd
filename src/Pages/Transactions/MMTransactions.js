import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxBank from "../../util/remote/ajaxBank";
import Loader from "../../Components/Common/Loader";

function MMTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);

  const fetchTransactions = async (currentPage) => {
    setLoading(true);
    const response = await ajaxBank.fetchMMTransactions(currentPage);
    setLoading(false);

    if (response.status === "OK") {
      setMeta(response.details.meta.list_of_pages);
      setTransactions(response.details.list || []);
    } else {
      setTransactions([]);
    }
  };

  const searchTransactions = async (e) => {
    if (e) e.preventDefault();
    setLoadingSearch(true);

    const response = await ajaxBank.searchMMTransactions(page, startDate, endDate, searchTerm);
    setLoadingSearch(false);

    if (response.status === "OK") {
      setMeta(response.details.meta.list_of_pages);
      setTransactions(response.details.list || []);
    } else {
      setTransactions([]);
    }
  };

  const resetFilters = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    fetchTransactions(1);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Date & Time", "User", "Transaction Number", "Amount"];
    const data = transactions.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.user} (${item.username})`,
      item.phone_number,
      `UGX. ${item.amount}`,
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("airtime_data.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (searchTerm || startDate || endDate) {
      searchTransactions();
    } else {
      fetchTransactions(page);
    }
  }, [page]);

  return (
    <>
      <div className="heading-layout1 mg-b-5">
        <TableHeader subtitle="List of all the mobile money transactions made sorted by the most recent" />
        <div className="dropdown">
          <Link className="dropdown-toggle" role="button" data-toggle="dropdown">...</Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" onClick={exportToPDF}>
              <i className="fas fa-file-export"></i>Export
            </Link>
          </div>
        </div>
      </div>

      <form className="mg-t-20" onSubmit={searchTransactions}>
        <div className="row gutters-8">
          <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <div className="row">
              <div className="col-lg-5">
                <input
                  type="text"
                  style={{border: "1px solid grey"}}
                  placeholder="Enter name of user or transaction number..."
                  className="form-control"
                  value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value === '') {
                      resetFilters(e);
                    }
                  }}
                />
              </div>
              <div className="col-lg-7">
                <div className="flex-fill position-relative">
                  <div className="input-group input-daterange">
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="input-group-text">to</span>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button type="submit" className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
              SEARCH
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-3"
            >
              RESET
            </button>
          </div>
        </div>
      </form>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {loading || loadingSearch ? (
          <Loader /> // Show loader when loading or searching
        ) : (
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th>Transaction Date</th>
                <th>User Details</th>
                <th>Transaction Number</th>
                <th>Amount</th>
                <th>Transaction Type</th>
                <th>Client Ref</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                    <td>{item.user}<br/><small>{item.username}</small></td>
                    <td>{item.phone_number}</td>
                    <td>
                      <span className="badge bg-teal">
                        <i className="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{ color: "#042954" }}></i>
                        UGX. {item.amount}
                      </span>
                      <br />
                      <span className={`badge ${item.status === "3" ? "badge-success" : item.status === "1" ? "badge-warning" : "badge-danger"}`}>
                        {item.status === "3" ? "SUCCESSFUL" : item.status === "1" ? "PENDING" : "FAILED"}
                      </span>
                    </td>
                    <td><span className="badge badge-info">{item.account}</span></td>
                    <td>{item.internal_ref}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No transactions made yet.
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

export default MMTransactions;
