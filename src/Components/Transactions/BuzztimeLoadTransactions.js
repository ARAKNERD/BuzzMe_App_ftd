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

function BuzztimeLoadTransactions() {
  const {buzztimeTransactions, buzztimeMeta, buzztimePage, buzztimeSearchTerm, buzztimeStartDate, buzztimeEndDate, loading,
    loading2, setBuzztimeSearchTerm, setBuzztimeStartDate, setBuzztimeEndDate, setBuzztimePage, getBuzztimeTransactions, searchBuzztimeLoadTransactions } = useContext(TransactionsContext);

  const setBuzztimeLoad = (e) => {
    e.preventDefault();
    setBuzztimeSearchTerm("");
    setBuzztimeStartDate("");
    setBuzztimeEndDate("");
    setBuzztimePage(1);
    getBuzztimeTransactions(1);
    
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Transaction Date", "User Details", "Amount"];
    const data = buzztimeTransactions.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.user} (${item.username})`,
      `UGX. ${item.cash_in}`
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("buzztime_load.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= buzztimeMeta.length) {
      setBuzztimePage(newPage);
    }
  };

  const headers = [
    { label: "Transaction Date", key: "created_at" },
    { label: "User Details", key: "user" },
    { label: "Amount", key: "cash_in" }

  ];

  useEffect(() => {
    if (buzztimeSearchTerm || buzztimeStartDate || buzztimeEndDate) {
      searchBuzztimeLoadTransactions();
    } else {
      getBuzztimeTransactions(buzztimePage);
    }
  }, [buzztimePage]);

  return (
    <>
      <div class="heading-layout1 mg-b-5">
        <TableHeader
            subtitle="List of all the buzztime load transactions made sorted by the most recent"   
        />
        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
          </div>
        </div>
      </div>

      <TransactionsSearchForm searchTerm={buzztimeSearchTerm} setSearchTerm={setBuzztimeSearchTerm} startDate={buzztimeStartDate}
         setStartDate={setBuzztimeStartDate} endDate={buzztimeEndDate} setEndDate={setBuzztimeEndDate} searchTransactions={searchBuzztimeLoadTransactions}
         setTransactions={setBuzztimeLoad} setPage={setBuzztimePage}/>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {loading || loading2 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
          <TransactionsTable headers={headers} data={buzztimeTransactions}/>
        )}
      </div>
      <Pagination currentPage={buzztimePage} totalPages={buzztimeMeta.length} onPageChange={handlePagination}/>
    </>   
  );
}

export default BuzztimeLoadTransactions;
