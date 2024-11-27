import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import TransactionsContext from "../../Context/TransactionsContext";
import TransactionsTable from "../Common/Transactions/TransactionsTable";
import Pagination from "../Common/Pagination";
import TransactionsSearchForm from "../Common/Transactions/TransactionsSearchForm";

function MMTransactions() {
  const {mmTransactions, mmMeta, mmPage, mmSearchTerm, mmStartDate, mmEndDate, loading,
    loading2, setMmSearchTerm, setMmStartDate, setMmEndDate, setMmPage, fetchMMTransactions, searchMMTransactions } = useContext(TransactionsContext);

  const resetFilters = (e) => {
    e.preventDefault();
    setMmSearchTerm("");
    setMmStartDate("");
    setMmEndDate("");
    setMmPage(1);
    fetchMMTransactions(1);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Date & Time", "User", "Transaction Number", "Amount"];
    const data = mmTransactions.map(item => [
      `${item.created_at?.short_date} ${item.created_at?.time}`,
      `${item.user} (${item.username})`,
      item.phone_number,
      `UGX. ${item.amount}`,
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("mm_data.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= mmMeta.length) {
      setMmPage(newPage);
    }
  };

  const headers = [
    { label: "Transaction Date", key: "created_at" },
    { label: "User Details", key: "student" },
    { label: "Transaction Number", key: "phone_number" },
    { label: "Amount", key: "amount" },
    { label: "Transaction Type", key:"account"},
    { label: "Client Ref", key:"internal_ref"}

  ];

  useEffect(() => {
    if (mmSearchTerm || mmStartDate || mmEndDate) {
      searchMMTransactions();
    } else {
      fetchMMTransactions(mmPage);
    }
  }, [mmPage]);

  return (
    <>
      <div className="heading-layout1 mg-b-5">
        <TableHeader subtitle="List of all the mobile money transactions made sorted by the most recent" />
        <div className="dropdown">
          <Link className="dropdown-toggle" role="button" data-toggle="dropdown">...</Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" onClick={exportToPDF}>
              <i className="fas fa-file-export"></i>Export
            </Link>
          </div>
        </div>
      </div>

      <TransactionsSearchForm searchTerm={mmSearchTerm} setSearchTerm={setMmSearchTerm} startDate={mmStartDate}
         setStartDate={setMmStartDate} endDate={mmEndDate} setEndDate={setMmEndDate} searchTransactions={searchMMTransactions}
         setTransactions={resetFilters} setPage={setMmPage}/>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {loading || loading2 ? (
          <Loader />
        ) : (
          <TransactionsTable headers={headers} data={mmTransactions} isMMTransaction={true}/>
        )}
      </div>

      <Pagination currentPage={mmPage} totalPages={mmMeta.length} onPageChange={handlePagination}/>

    </>
  );
}

export default MMTransactions;
{/* <form className="mg-t-20" onSubmit={searchMMTransactions}>
        <div className="row gutters-8">
          <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <div className="row">
              <div className="col-lg-5">
                <input
                  type="text"
                  style={{border: "1px solid grey"}}
                  placeholder="Enter name of user or transaction number..."
                  className="form-control"
                  value={mmSearchTerm} onChange={(e) => {
                    setMmSearchTerm(e.target.value);
                    if (e.target.value === '') {
                      resetFilters(e);
                    }
                  }}
                />
              </div>
              <div className="col-lg-7">
                <div className="flex-fill position-relative">
                  <div className="input-group input-daterange">
                    <input
                      type="date"
                      className="form-control"
                      value={mmStartDate}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setMmStartDate(e.target.value)}
                    />
                    <span className="input-group-text">to</span>
                    <input
                      type="date"
                      className="form-control"
                      value={mmEndDate}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setMmEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
            <button type="submit" className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
              SEARCH
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-3"
            >
              RESET
            </button>
          </div>
        </div>
      </form> */}