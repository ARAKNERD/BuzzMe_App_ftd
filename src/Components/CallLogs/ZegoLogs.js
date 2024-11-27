import React, {useContext, useEffect} from "react";
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

function ZegoLogs() {

  const [modal, setModal] = useStateCallback(false);
  const {zegoLogsList, zegoCallee, zegoCaller, zegoMeta, zegoPage, zegoEndDate, zegoStartDate, isRealTimeEnabled,
      isZegoSearching, loading2, setZegoPage, isFirstLoad, setIsRealTimeEnabled, setZegoCallee,
      setZegoCaller, setIsZegoSearching, setZegoEndDate, setZegoStartDate, getZegoLogsList, searchZegoLogs } = useContext(CallContext);

  useEffect(() => {
    if (isRealTimeEnabled) {
      const intervalId = setInterval(() => {
        if (!isZegoSearching) {
          getZegoLogsList(zegoPage);
        }
      }, 10000);
  
      return () => clearInterval(intervalId);
    }
  }, [zegoPage, isZegoSearching, isRealTimeEnabled]);

  const completeCall = (e, item) => {
      setModal(false, () =>
        setModal(
          <CompleteCall
            callID={item.id}
            g={getZegoLogsList}
            page={zegoPage}
            isOpen={true}
          />
        )
      );
  };

    const resetSearch = () => {
      setZegoCaller("");
      setZegoCallee("");
      setZegoStartDate("");
      setZegoEndDate("");
      setZegoPage(1);
      setIsZegoSearching(false);
      getZegoLogsList(1); 
  };

const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Date & Time", "Call Status", "Caller Details", "Callee Details", "Duration", "Station", "Call Cost"];
    const data = zegoLogsList.map(item => [
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
    if (newPage > 0 && newPage <= zegoMeta.length) {
      setZegoPage(newPage);
    }
  };

  useEffect(() => {
    if (zegoCaller || zegoCallee || zegoStartDate || zegoEndDate) {
      searchZegoLogs();
    } else {
      getZegoLogsList(zegoPage);
    }
  }, [zegoPage]);

  return (
    <>
      {modal}
     
      <div class="heading-layout1 mg-b-5">
        <TableHeader
          subtitle="List of all the buzz to buzz calls sorted by the most recent"    
        />
        <div class="dropdown">
          <a class="dropdown-toggle" href="#" role="button" 
          data-toggle="dropdown" aria-expanded="false">...</a>
          <div class="dropdown-menu dropdown-menu-right">
            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
            <Link class="dropdown-item" onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)} >{isRealTimeEnabled ?<i className="fa fa-toggle-on mr-1" style={{ color: "green" }}></i>:<i className="fa fa-toggle-off mr-1" style={{ color: "red" }}></i>}{isRealTimeEnabled ? "Real-Time Updates: ON" : "Real-Time Updates: OFF"}</Link>

          </div>
        </div>
      </div>

      <CallLogsSearchForm caller={zegoCaller} callee={zegoCallee} setCaller={setZegoCaller} setCallee={setZegoCallee} startDate={zegoStartDate}
         setStartDate={setZegoStartDate} endDate={zegoEndDate} setEndDate={setZegoEndDate} searchCallLogs={searchZegoLogs}
         resetSearch={resetSearch} setPage={setZegoPage}/>

      <div className="border-top mt-3"></div>
      <div className="table-responsive">
        {isFirstLoad || loading2 ? (
          <Loader /> 
        ) : (
          <CallLogsTable logsList={zegoLogsList} onCompleteCall={completeCall} logType="buzz"/>
        )}
      </div>

      <Pagination currentPage={zegoPage} totalPages={zegoMeta.length} onPageChange={handlePagination}/>

    </>
     
  
  );
}

export default ZegoLogs;
