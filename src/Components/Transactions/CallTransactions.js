import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import TransactionsContext from "../../Context/TransactionsContext";
import TransactionsTable from "../Common/Transactions/TransactionsTable";
import Pagination from "../Common/Pagination";
import TransactionsSearchForm from "../Common/Transactions/TransactionsSearchForm";

function CallTransactions() {

  const {callTransactions, callMeta, callPage, callSearchTerm, callStartDate, callEndDate, loading, loading2, setCallSearchTerm,
     setCallStartDate, setCallEndDate, setCallPage, getCallTransactions, searchCallTransactions } = useContext(TransactionsContext);

  const setCall = (e) => {
    e.preventDefault();
    setCallSearchTerm("");
    setCallStartDate("");
    setCallEndDate("");
    setCallPage(1);
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
    if (newPage > 0 && newPage <= callMeta.length) {
      setCallPage(newPage);
    }
  };

  const headers = [
    { label: "Transaction Date", key: "created_at" },
    { label: "User Details", key: "user" },
    { label: "Amount", key: "cash_out" }

  ];

  useEffect(() => {
    if (callSearchTerm || callStartDate || callEndDate) {
      searchCallTransactions();
    } else {
      getCallTransactions(callPage);
    }
  }, [callPage]);

  return (
      <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader subtitle="List of all the call transactions made sorted by the most recent"/>

        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
          </div>
        </div>
      </div>

      <TransactionsSearchForm searchTerm={callSearchTerm} setSearchTerm={setCallSearchTerm} startDate={callStartDate}
         setStartDate={setCallStartDate} endDate={callEndDate} setEndDate={setCallEndDate} searchTransactions={searchCallTransactions}
         setTransactions={setCall} setPage={setCallPage}/>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {loading || loading2 ? (
          <Loader />
        ) : (
          <TransactionsTable headers={headers} data={callTransactions}/>
        )}
      </div>
      <Pagination currentPage={callPage} totalPages={callMeta.length} onPageChange={handlePagination}/>
    </>
     
  
  );
}

export default CallTransactions;