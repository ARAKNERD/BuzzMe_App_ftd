import React, {useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableHeader from "../Common/TableHeader";
import Loader from "../Common/Loader";
import CompleteCall from "./CompleteCall";
import useStateCallback from "../../util/customHooks/useStateCallback";
import CallContext from "../../Context/CallContext";
import Pagination from "../Common/Pagination";
import CallLogsSearchForm from "../Common/CallLogs/CallLogsSearchForm";
import CallLogsTable from "../Common/CallLogs/CallLogsTable";

function TwilioLogs() {
  const [modal, setModal] = useStateCallback(false);
  const {twilioLogsList, twilioCallee, twilioCaller, twilioMeta, twilioPage, twilioEndDate, twilioStartDate, isRealTimeEnabled,
      isTwilioSearching, loading2, setTwilioPage, isFirstLoad, setIsRealTimeEnabled, setTwilioCallee,
      setTwilioCaller, setIsTwilioSearching, setTwilioEndDate, setTwilioStartDate, getTwilioLogsList, searchTwilioLogs } = useContext(CallContext);

  useEffect(() => {
    if (isRealTimeEnabled) {
      const intervalId = setInterval(() => {
        if (!isTwilioSearching) {
          getTwilioLogsList(twilioPage);
        }
      }, 10000);
  
      return () => clearInterval(intervalId);
    }
  }, [twilioPage, isTwilioSearching, isRealTimeEnabled]);

  const resetSearch = () => {
    setTwilioCallee("");
    setTwilioCaller("");
    setTwilioStartDate("");
    setTwilioEndDate("");
    setTwilioPage(1);
    setIsTwilioSearching(false);
    getTwilioLogsList(1); 
  };

  const completeCall = (e, item) => {
    setModal(false, () =>
      setModal(
        <CompleteCall
          callID={item.id}
          g={getTwilioLogsList}
          page={twilioPage}
          isOpen={true}
        />
      )
    );
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Date & Time", "Call Status", "Caller Details", "Callee Details", "Duration", "Station", "Call Cost"];
    const data = twilioLogsList.map(item => [
      item.call_time,
      item.status,
      `${item.caller_name} (${item.caller_number})`,
      `${item.callee_name} (${item.callee_number})`,
      item.duration_format,
      `${item.station_name} (${item.school_name})`,
      `UGX. ${item.call_cost?.total_c}`,

    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("twilio_call_logs.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= twilioMeta.length) {
      setTwilioPage(newPage);
    }
  };

  useEffect(() => {
    if (twilioCallee || twilioCaller || twilioStartDate || twilioEndDate) {
      searchTwilioLogs();
    } else {
      getTwilioLogsList(twilioPage);
    }
  }, [twilioPage]);

  return (
    <>
      {modal}
      <div class="heading-layout1 mg-b-5">
        <TableHeader
          subtitle="List of all the buzz to other network calls sorted by the most recent"    
        />
        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
            <Link class="dropdown-item" onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)} >{isRealTimeEnabled ?<i className="fa fa-toggle-on mr-1" style={{ color: "green" }}></i>:<i className="fa fa-toggle-off mr-1" style={{ color: "red" }}></i>}{isRealTimeEnabled ? "Real-Time Updates: ON" : "Real-Time Updates: OFF"}</Link>
          </div>
        </div>
      </div>

      <CallLogsSearchForm caller={twilioCaller} callee={twilioCallee} setCaller={setTwilioCaller} setCallee={setTwilioCallee} startDate={twilioStartDate}
         setStartDate={setTwilioStartDate} endDate={twilioEndDate} setEndDate={setTwilioEndDate} searchCallLogs={searchTwilioLogs}
         resetSearch={resetSearch} setPage={setTwilioPage}/>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {isFirstLoad || loading2 ? (
          <Loader /> 
        ) : (
          <CallLogsTable logsList={twilioLogsList} onCompleteCall={completeCall} logType="twilio"/>
        )}
      </div>

      <Pagination currentPage={twilioPage} totalPages={twilioMeta.length} onPageChange={handlePagination}/>

    </>
  );
}

export default TwilioLogs;
