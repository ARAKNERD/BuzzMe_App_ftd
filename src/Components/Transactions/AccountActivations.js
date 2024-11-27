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

      <TransactionsSearchForm searchTerm={activationSearchTerm} setSearchTerm={setActivationSearchTerm} startDate={activationStartDate}
         setStartDate={setActivationStartDate} endDate={activationEndDate} setEndDate={setActivationEndDate} searchTransactions={searchAccountActivations}
         setTransactions={setActivations} setPage={setActivationPage}/>

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
