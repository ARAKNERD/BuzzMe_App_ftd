import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import LanguageContext from "../../Context/LanguageContext";
import dictionary from "../../util/dictionary";
import TransactionsContext from "../../Context/TransactionsContext";
import TransactionsTable from "../Common/Transactions/TransactionsTable";
import Pagination from "../Common/Pagination";
import TransactionsSearchForm from "../Common/Transactions/TransactionsSearchForm";

function AllTransactions() {
  
  const {translate} = useContext(LanguageContext);
  const {transactionList, meta, page, searchTerm, startDate, endDate, loading,
    loading2, setSearchTerm, setStartDate, setEndDate, setPage, getTransactions, searchTransactions } = useContext(TransactionsContext);
  
  const setTransactions = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    getTransactions(1);
    
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Date & Time", "User", "Amount", "Transaction Type"];
    const data = transactionList.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.student} (${item.school?item.school:"Parent"})`,
      `UGX. ${item.amount}`,
      item.phone_number,
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("invoices_data.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  const headers = [
    { label: "Transaction Date", key: "created_at" },
    { label: "User Details", key: "student" },
    { label: "Amount", key: "amount" },
    { label: "Transaction Type", key:"account"}
  ];

  useEffect(() => {
    if (searchTerm || startDate || endDate) {
      searchTransactions();
    } else {
      getTransactions(page);
    }
  }, [page]);

  return (
    <>
        <div class="heading-layout1 mg-b-5">
          <TableHeader subtitle="List of all the transactions made sorted by the most recent" />
          <div class="dropdown">
            <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
        
            <div class="dropdown-menu dropdown-menu-right">
                <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
            </div>
          </div>
        </div>

        <TransactionsSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} startDate={startDate}
         setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} searchTransactions={searchTransactions}
         setTransactions={setTransactions} setPage={setPage}/>

        <div className="border-top mt-3"></div>
        <div className="table-responsive">
          {loading || loading2 ? (
            <Loader /> 
          ) : (
            <TransactionsTable headers={headers} data={transactionList}/>
          )}
        </div>

        <Pagination currentPage={page} totalPages={meta.length} onPageChange={handlePagination}/>
         
    </>
  );
}

export default AllTransactions;
