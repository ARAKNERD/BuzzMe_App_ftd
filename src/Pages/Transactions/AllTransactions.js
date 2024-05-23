import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxBank from "../../util/remote/ajaxBank";
import Loader from "../../Components/Common/Loader";


function AllTransactions() {
  const [transactionList, setTransactionList] = useState(false);
  const [transactionSearch, setTransactionSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);


  const getTransactions = async () => {
    setLoading(true);
    const server_response = await ajaxBank.fetchBankTransactions();
    setLoading(false);
    if (server_response.status === "OK") {
      setTransactionList(server_response.details);

    }else {
      setTransactionList("404");
    }
  };

  const searchTransactions = async (e) => {
    if (e) {
        e.preventDefault();
    }
      var data = {
        search: searchTerm,
        from: startDate,
        to: endDate
      };
        setLoading2(true);
        const server_response = await ajaxBank.searchBankTransactions(data);
        setLoading2(false);
        if (server_response.status === "OK") {
            if (server_response.details.length === 0) {
                setTransactionSearch([]);
            } else {
                setTransactionSearch(server_response.details);
            }
        } else {
            setTransactionSearch([]);
        }
    
};

  const setTransactions = (e) => {
    e.preventDefault();
    setTransactionSearch(false);
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  const exportToPDF = () => {
    const table = document.querySelector(".table"); // Select the table element
    const pdf = new jsPDF("p", "pt", "a4");
  
    // Define columns for the table (add more if needed)
    const columns = ["Date & Time", "Student", "Contact", "Amount"];
  
    // Extract data from the table and format it as an array of arrays
    const data = Array.from(table.querySelectorAll("tr")).map((row) => {
      return Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent);
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

  useEffect(() => {
    getTransactions();
    searchTransactions();
  }, []);

  return (
    <AppContainer title="All Transactions">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
        <div className="card height-auto">
   
      <div className="card-body">
      <div class="heading-layout1 mg-b-25">
        <TableHeader
            title="All Transactions"
            subtitle="List of all the transactions made sorted by the most recent"    
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
                      placeholder="Enter student name or student code..."
                      style={{border: "1px solid grey"}}
                      value={searchTerm} onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value === '') {
                          setTransactions(e);
                        }
                      }}
                      className="form-control"
                    /></div>
                  {/* <div className="col-lg-4">
                  <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="refresh-tooltip">Start date for search</Tooltip>}><input
                      type="date"
                      style={{border: "1px solid grey"}}
                      className="form-control"
                    /></OverlayTrigger></div> */}
                    {/* <div className="col-lg-4">
                    <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="refresh-tooltip">End date for search</Tooltip>}><input
                      type="date"
                      placeholder="Select start date..."
                      style={{border: "1px solid grey"}}
                      className="form-control"
                    /></OverlayTrigger></div> */}
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
                      onClick={(e) => searchTransactions(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
                      SEARCH
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => setTransactions(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-3">
                      RESET
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-top mt-3"></div>
        <div className="table-responsive">
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th style={{width:"10px"}}>Transaction Time</th>
                <th style={{textAlign:"center"}}>Transaction Type</th>
                
                <th style={{textAlign:"center"}}>Amount</th>
                <th style={{textAlign:"right"}}>Student Details</th>
                
              </tr>
            </thead>
            <tbody>
            {transactionSearch && Array.isArray(transactionSearch) ? (
                      
                      transactionSearch.map((item, key) => (
                        <tr key={key}>
                          <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                          <td style={{textAlign:"center"}}><span class="badge badge-info">{item.account?.account_code}</span></td>
                          
                          <td style={{textAlign:"center"}}><span  class="badge bg-teal"><i class="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{color:"#042954"}}></i>UGX. {item.account?.account_code ==="BUZZTIME LOAD"?item.cash_in:item.cash_out}</span><br/>
                          {item.status==="3"?<span class="badge badge-success">SUCCESSFUL</span>:
                          item.status==="1"?<span class="badge badge-warning">PENDING</span>:<span class="badge badge-danger">FAILED</span>}</td>
                          <td style={{textAlign:"right"}}>{item.full_name}<br/><small>{item.school_name}</small></td>
                        </tr>
                      ))
                   
                  ) :Array.isArray(transactionList) && transactionList.map((item, key) => (
                        <tr key={key}>
                          <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                          <td style={{textAlign:"center"}}><span class="badge badge-info">{item.account?.account_code}</span></td>
                          
                          <td style={{textAlign:"center"}}><span  class="badge bg-teal"><i class="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{color:"#042954"}}></i>UGX. {item.account?.account_code ==="BUZZTIME LOAD"?item.cash_in:item.cash_out}</span><br/>
                          {item.status==="3"?<span class="badge badge-success">SUCCESSFUL</span>:
                          item.status==="1"?<span class="badge badge-warning">PENDING</span>:<span class="badge badge-danger">FAILED</span>}</td>
                          <td style={{textAlign:"right"}}>{item.full_name}<br/><small>{item.school_name}</small></td>
                        </tr>
                      ))}
                      {transactionList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No transactions made yet.
                          </td>
                        </tr>)}
                        {transactionSearch.length === 0 && (
  <tr>
    <td colSpan="4" style={{ textAlign: "center" }}>
      No transactions made yet.
    </td>
  </tr>
)}
            </tbody>
          </table>
          {loading && <Loader/>}
          {loading2 && <Loader/>}
        </div>
      </div>
    </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default AllTransactions;
