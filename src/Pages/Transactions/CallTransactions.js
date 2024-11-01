import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxBank from "../../util/remote/ajaxBank";
import Loader from "../../Components/Common/Loader";

function CallTransactions() {
  const [callTransactions, setCallTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [account,setAccount] = useState(3)
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState([])

  const getCallTransactions = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxBank.fetchAccountTransactions(currentPage, account);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setCallTransactions(server_response.details.list || []);
    } else {
      setCallTransactions([]);
    }
  };

  const searchCallTransactions = async (e) => {
    if (e) {
        e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxBank.searchBankTransactions(searchTerm, startDate, endDate, page, account);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setCallTransactions(server_response.details.list || []);
    } else {
      setCallTransactions([]);
    }
  
  };

  const setCall = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    getCallTransactions(1);
  
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Transaction Date", "User Details", "Amount"];
    const data = callTransactions.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.user} (${item.username})`,
      `UGX. ${item.cash_out}`
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("call_charges.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (searchTerm || startDate || endDate) {
      searchCallTransactions();
    } else {
      getCallTransactions(page, account);
    }
  }, [page, account]);

  return (
      <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader
            subtitle="List of all the call transactions made sorted by the most recent"   
              />
              <div class="dropdown">
                                <a class="dropdown-toggle" href="#" role="button" 
                                data-toggle="dropdown" aria-expanded="false">...</a>
        
                                <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                                </div>
                            </div></div>
                            <form className="mg-t-20">
        <div className="row gutters-8">
          <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
          <div className="row">
          <div className="col-lg-4">
            <input
              type="text"
              placeholder="Enter first or last name of user..."
              style={{border: "1px solid grey"}}
              value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === '') {
                  setCall(e);
                }
              }}
              className="form-control"
            /></div>
            <div className="col-lg-8">
              <div class="flex-fill position-relative">
                <div class="input-group input-daterange" id="datepicker">
                  <input type="date" style={{border: "1px solid grey"}} class="form-control" value={startDate}
              onChange={(e) => setStartDate(e.target.value)} placeholder="start date"/>
                  <span class="input-group-text" style={{marginLeft: "-1px", borderTopLeftRadius:"0", borderTopRightRadius:"0", borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}}>to</span>
                  <input type="date" style={{border: "1px solid grey"}} value={endDate}
              onChange={(e) => setEndDate(e.target.value)} class="form-control" placeholder="end date"/>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button
              type="submit"
              onClick={(e) => searchCallTransactions(e)}
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
              SEARCH
            </button>
            <button
              type="submit"
              onClick={(e) => setCall(e)}
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-3">
              RESET
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
              <th>Transaction Date</th>
              <th>User Details</th>
              <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {callTransactions.length > 0 ? (
                callTransactions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                  <td>{item.user}<br/><small>{item.username}</small></td>
                  <td><span  class="badge bg-teal"><i class="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{color:"#042954"}}></i>UGX. {item.cash_out}</span><br/>
                  <span class="badge badge-success">SUCCESSFUL</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No call transactions yet.
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

export default CallTransactions;
