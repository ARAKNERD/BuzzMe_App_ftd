import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import TransactionsContext from "../../Context/TransactionsContext";
import TransactionsTable from "../Common/Transactions/TransactionsTable";
import Pagination from "../Common/Pagination";
import TransactionsSearchForm from "../Common/Transactions/TransactionsSearchForm";

function MessageTransactions() {
  const {messageTransactions, messageMeta, messagePage, messageSearchTerm, messageStartDate, messageEndDate, loading, loading2, setMessageSearchTerm,
    setMessageStartDate, setMessageEndDate, setMessagePage, getMessageTransactions, searchMessageTransactions } = useContext(TransactionsContext);

  const setMessage = (e) => {
    e.preventDefault();
    setMessageSearchTerm("");
    setMessageStartDate("");
    setMessageEndDate("");
    setMessagePage(1);
    getMessageTransactions(1);
    
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Transaction Date", "User Details", "Amount"];
    const data = messageTransactions.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.user} (${item.username})`,
      `UGX. ${item.cash_out}`
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("message_charges.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= messageMeta.length) {
      setMessagePage(newPage);
    }
  };

  const headers = [
    { label: "Transaction Date", key: "created_at" },
    { label: "User Details", key: "user" },
    { label: "Amount", key: "cash_out" }

  ];

  useEffect(() => {
    if (messageSearchTerm || messageStartDate || messageEndDate) {
      searchMessageTransactions();
    } else {
      getMessageTransactions(messagePage);
    }
  }, [messagePage]);

  return (
      <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader subtitle="List of all the message transactions made sorted by the most recent"/>

        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
              <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
          </div>
        </div>
      </div>

      <TransactionsSearchForm searchTerm={messageSearchTerm} setSearchTerm={setMessageSearchTerm} startDate={messageStartDate}
         setStartDate={setMessageStartDate} endDate={messageEndDate} setEndDate={setMessageEndDate} searchTransactions={searchMessageTransactions}
         setTransactions={setMessage} setPage={setMessagePage}/>

      <div className="border-top mt-3"></div>
              
      <div className="table-responsive">
        {loading || loading2 ? (
          <Loader />
        ) : (
          <TransactionsTable headers={headers} data={messageTransactions}/>
        )}
      </div>

      <Pagination currentPage={messagePage} totalPages={messageMeta.length} onPageChange={handlePagination}/>
    </>
     
  );
}

export default MessageTransactions;
