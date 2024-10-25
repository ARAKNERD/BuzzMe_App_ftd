import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import ajaxBank from "../../util/remote/ajaxBank";
import Loader from "../../Components/Common/Loader";

function AccountActivations() {
  const [accountActivations, setAccountActivations] = useState(false);
  const [activationSearch, setActivationSearch] = useState(false);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate1, setEndDate1] = useState("");
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [account,setAccount] = useState(4)
  const [page1,setPage1] = useState(1)
  const [meta1,setMeta1] = useState("")

  const getAccountActivations = async () => {
    setLoading3(true);
    const server_response = await ajaxBank.fetchAccountInvoices(page1, account);
    setLoading3(false);
    if (server_response.status === "OK") {
      setMeta1(server_response.details.meta.list_of_pages);
      setAccountActivations(server_response.details.list); 
      if (searchTerm1 || startDate1 || endDate1) {
        setActivationSearch(server_response.details.list); 
      }
    } else {
      setAccountActivations("404");
    }
  };

  const searchAccountActivations = async (e) => {
    if (e) {
      e.preventDefault();
    }
    var data = {
      search: searchTerm1,
      from: startDate1,
      to: endDate1,
      page: page1,
      account_id: account
    };
    setLoading4(true);
    const server_response = await ajaxBank.searchAccountInvoices(data);
    setLoading4(false);
    if (server_response.status === "OK") {
      if (server_response.details.length === 0) {
        setActivationSearch([]);
      } else {
        setMeta1(server_response.details.meta.list_of_pages);
        setActivationSearch(server_response.details.list);
      }
    } else {
      setActivationSearch([]);
    }
    
  };

  const setActivations = (e) => {
    e.preventDefault();
    setSearchTerm1("");
    setStartDate1("");
    setEndDate1("");
    setActivationSearch([]);
    setPage1(1);
    getAccountActivations();
    
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

  const setNextPageNumber1 = () =>{
    if(meta1.length===page1){
      
    }
    else{
      setPage1(page1+1)
    }
    
  }

  const setPreviousPageNumber1 = () =>{
    if(page1===1){
      
    }
    else{
      setPage1(page1-1)
    }
    
  }
  const setPageNumber1 = (e,item) =>{
    setPage1(item)
  }

  useEffect(() => {
    searchAccountActivations();
  }, []);
  useEffect(() => {
    getAccountActivations();
  }, [page1,account]);

  return (
    <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader
            subtitle="List of all the account activation invoices sorted by the most recent"   
        />
        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
              <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
          </div>
        </div>
      </div>
      <form className="mg-t-20">
        <div className="row gutters-8">
          <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <div className="row">
              <div className="col-lg-4">
                <input type="text" placeholder="Enter student first ot last name..." style={{border: "1px solid grey"}} value={searchTerm1} 
                  onChange={(e) => {
                    setSearchTerm1(e.target.value);
                    if (e.target.value === '') {
                      setActivations(e);
                    }
                  }} className="form-control"
                />
              </div>
              <div className="col-lg-8">
                <div class="flex-fill position-relative">
                  <div class="input-group input-daterange" id="datepicker">
                    <input type="date" style={{border: "1px solid grey"}} class="form-control" value={startDate1} onChange={(e) => setStartDate1(e.target.value)} placeholder="start date"/>
                    <span class="input-group-text" style={{marginLeft: "-1px", borderTopLeftRadius:"0", borderTopRightRadius:"0", borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}}>to</span>
                    <input type="date" style={{border: "1px solid grey"}} value={endDate1}onChange={(e) => setEndDate1(e.target.value)} class="form-control" placeholder="end date"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button
              type="submit"
              onClick={(e) => searchAccountActivations(e)}
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
              SEARCH
            </button>
            <button
              type="submit"
              onClick={(e) => setActivations(e)}
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
              <th>Transaction Date</th>
              <th>Student Details</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {activationSearch.length > 0 ? (
              activationSearch.map((item, key) => (
                <tr key={key}>
                  <td>{item.created_at?.short_date}<br/><small>{item.created_at?.time}</small></td>
                  <td>{item.student}<br/><small>{item.school}</small></td>
                  <td><span  class="badge bg-teal"><i class="fa fa-circle text-teal fs-9px fa-fw me-5px" style={{color:"#042954"}}></i>UGX. {item.amount}</span><br/>
                  <span class="badge badge-success">SUCCESSFUL</span></td>
                </tr>
              ))
            ) : accountActivations === "404" ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No account activations made yet.
                </td>
              </tr>
            ) : (
            
              (searchTerm1 || startDate1 || endDate1) && (
                  <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                          No search result(s) found.
                      </td>
                  </tr>
              )
            )}
          </tbody>
          <div className='align-items-center justify-content-center pos-absolute' style={{left:'50%'}}>
            <button className='btn btn-dark' style={{borderRight:'1px solid yellow'}} onClick={setPreviousPageNumber1}>
              <i className='fa fa-angle-left mr-2'></i> Prev
            </button>
            {Array.isArray(meta1) && meta1.map((item)=>
              page1===item?
                <button  style={{borderRight:'1px solid yellow'}} className='btn btn-primary'>{item}</button>
              :
                <button onClick={(e)=>setPageNumber1(e,item)} style={{borderRight:'1px solid yellow'}} className='btn btn-dark'>{item}</button>
            )}

            <button style={{borderRight:'1px solid yellow'}} className='btn btn-dark' onClick={setNextPageNumber1}>Next<i className='fa fa-angle-right ml-2'></i></button>
          </div>
        </table>
        {loading4 && <Loader/>}
        {loading3 && <Loader/>}
      </div>
    </>
     
  );
}

export default AccountActivations;
