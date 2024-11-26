import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import TransactionsContext from "../../Context/TransactionsContext";
import TransactionsTable from "../Common/Transactions/TransactionsTable";
import Pagination from "../Common/Pagination";

function AccountActivations() {
  const {accountActivations, activationMeta, activationPage, activationSearchTerm, activationStartDate, activationEndDate, loading,
    loading2, setActivationSearchTerm, setActivationStartDate, setActivationEndDate, setActivationPage, getAccountActivations, searchAccountActivations } = useContext(TransactionsContext);

  const setActivations = (e) => {
    e.preventDefault();
    setActivationSearchTerm("");
    setActivationStartDate("");
    setActivationEndDate("");
    setActivationPage(1);
    getAccountActivations(1);
    
  };
  
  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Transaction Date", "Student Details", "Amount"];
    const data = accountActivations.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.student} (${item.school})`,
      `UGX. ${item.amount}`
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("account_activations.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= activationMeta.length) {
      setActivationPage(newPage);
    }
  };

  const headers = [
    { label: "Transaction Date", key: "created_at" },
    { label: "Student Details", key: "student" },
    { label: "Amount", key: "amount" }

  ];

  useEffect(() => {
    if (activationSearchTerm || activationStartDate || activationEndDate) {
      searchAccountActivations();
    } else {
      getAccountActivations(activationPage);
    }
  }, [activationPage]);

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
                <input type="text" placeholder="Enter student first ot last name..." style={{border: "1px solid grey"}} value={activationSearchTerm} 
                  onChange={(e) => {
                    setActivationSearchTerm(e.target.value);
                    if (e.target.value === '') {
                      setActivations(e);
                    }
                  }} className="form-control"
                />
              </div>
              <div className="col-lg-8">
                <div class="flex-fill position-relative">
                  <div class="input-group input-daterange" id="datepicker">
                    <input type="date" style={{border: "1px solid grey"}} class="form-control" value={activationStartDate} onChange={(e) => setActivationStartDate(e.target.value)} placeholder="start date"/>
                    <span class="input-group-text" style={{marginLeft: "-1px", borderTopLeftRadius:"0", borderTopRightRadius:"0", borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}}>to</span>
                    <input type="date" style={{border: "1px solid grey"}} value={activationEndDate}onChange={(e) => setActivationEndDate(e.target.value)} class="form-control" placeholder="end date"/>
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
        {loading || loading2 ? (
          <Loader />
        ) : (
          <TransactionsTable headers={headers} data={accountActivations}/>

        )}
      </div>

      <Pagination currentPage={activationPage} totalPages={activationMeta.length} onPageChange={handlePagination}/>
    </>
     
  );
}

export default AccountActivations;
