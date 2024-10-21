import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxBank from "../../util/remote/ajaxBank";
import Loader from "../../Components/Common/Loader";
import LanguageContext from "../../Context/LanguageContext";
import dictionary from "../../util/dictionary";

function AllTransactions() {
  const [transactionList, setTransactionList] = useState(false);
  const [transactionSearch, setTransactionSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")
  const {translate} = useContext(LanguageContext);

  const getTransactions = async () => {
    setLoading(true);
    const server_response = await ajaxBank.fetchBankTransactions(page);
      setLoading(false);
      if (server_response.status === "OK") {
          setMeta(server_response.details.meta.list_of_pages);
          setTransactionList(server_response.details.list); 
          if (searchTerm || startDate || endDate) {
              setTransactionSearch(server_response.details.list); 
          }
      } else {
          setTransactionList("404");
      }
  };

  const searchTransactions = async (e) => {
    if (e) {
        e.preventDefault();
    }
        setLoading2(true);
        const server_response = await ajaxBank.searchAllInvoices(page, startDate, endDate, searchTerm);
        setLoading2(false);
        if (server_response.status === "OK") {
            if (server_response.details.length === 0) {
                setTransactionSearch([]);
            } else {
              setMeta(server_response.details.meta.list_of_pages);
              setTransactionSearch(server_response.details.list);
            }
        } else {
            setTransactionSearch([]);
        }
    
};


  const setTransactions = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setTransactionSearch([]);
    setPage(1);
    getTransactions();
    
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
    searchTransactions();
  }, [page]);
  useEffect(() => {
    getTransactions();
  }, [page]);

  return (
      <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader
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
              placeholder="Enter student name..."
              style={{border: "1px solid grey"}}
              value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === '') {
                  setTransactions(e);
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
        
        <th style={{width:"10px"}}>Transaction Date</th>
        <th>User Details</th>
        <th>Phone Number</th>
        <th>Amount</th>
       
        <th>Transaction Type</th>
        
      </tr>
    </thead>
    <tbody>
    {transactionSearch.length > 0 ? (
        transactionSearch.map((item, key) => (
          <tr key={key}>
          <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                  <td>{item.student}<br/><small>{item.school?item.school:"Parent"}</small></td>
                  <td>{item.phone_number?item.phone_number:"N/A"}</td>
                  <td><span  class="badge bg-teal"><i class="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{color:"#042954"}}></i>UGX. {item.account==="ACCOUNT ACTIVATION"||item.account==="BUZZTIME LOAD"?item.cash_in:item.cash_out}</span><br/>
                  {item.status==="3"?<span class="badge badge-success">SUCCESSFUL</span>:
                  item.status==="1"?<span class="badge badge-warning">PENDING</span>:<span class="badge badge-danger">FAILED</span>}</td>
                  
                  <td><span class="badge badge-info">{item.account}</span></td>
                   
        
        </tr>
        ))
    ) : transactionList === "404" ? (
        <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
                No transactions made yet.
            </td>
        </tr>
    ) : (
       
        (searchTerm || startDate || endDate) && (
            <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                    No search result(s) found.
                </td>
            </tr>
        )
    )}
   
    </tbody>
    <div
                    className="align-items-center justify-content-center pos-absolute"
                    style={{left: "50%"}}>
                    <button
                      className="btn btn-dark"
                      style={{borderRight: "1px solid yellow"}}
                      onClick={setPreviousPageNumber}>
                      <i className="fa fa-angle-left mr-2"></i> Prev
                    </button>
                    {Array.isArray(meta) &&
                      meta.map((item) =>
                        page === item ? (
                          <button
                            style={{borderRight: "1px solid yellow"}}
                            className="btn btn-primary">
                            {item}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => setPageNumber(e, item)}
                            style={{borderRight: "1px solid yellow"}}
                            className="btn btn-dark">
                            {item}
                          </button>
                        )
                      )}

                    <button
                      style={{borderRight: "1px solid yellow"}}
                      className="btn btn-dark"
                      onClick={setNextPageNumber}>
                      Next<i className="fa fa-angle-right ml-2"></i>
                    </button>
                  </div>
  </table>
  {loading && <Loader/>}
  {loading2 && <Loader/>}
</div></>
     
  
  );
}

export default AllTransactions;
