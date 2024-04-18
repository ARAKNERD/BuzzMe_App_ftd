import React, {useContext} from "react";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import AppContainer from "../Components/Structure/AppContainer";
import TableHeader from "../Components/Common/TableHeader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

function CallLogs() {

  const exportToPDF = () => {
    const table = document.querySelector(".table"); // Select the table element
    const pdf = new jsPDF("p", "pt", "a4");
  
    // Define columns for the table (add more if needed)
    const columns = ["Date & Time", "Student", "Contact", "Duration"];
  
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
    pdf.save("call_log_data.pdf");
  };

  return (
    <AppContainer title="Call Logs">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
        <div className="card height-auto">
   
      <div className="card-body">
      <div class="heading-layout1 mg-b-25">
        <TableHeader
            title="Call Log Details"
            subtitle="List of all the phone calls sorted by the most recent"    
              />
              <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                                        </div>
                                    </div></div>
         <form className="mg-t-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                  <div className="row">
                  <div className="col-lg-4">
                    <input
                      type="text"
                      placeholder="Enter phone number..."
                      style={{border: "1px solid grey"}}
                      className="form-control"
                    /></div>
                  <div className="col-lg-4">
                  <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="refresh-tooltip">Start date for search</Tooltip>}><input
                      type="date"
                      style={{border: "1px solid grey"}}
                      className="form-control"
                    /></OverlayTrigger></div>
                    <div className="col-lg-4">
                    <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="refresh-tooltip">End date for search</Tooltip>}><input
                      type="date"
                      placeholder="Select start date..."
                      style={{border: "1px solid grey"}}
                      className="form-control"
                    /></OverlayTrigger></div>
                    </div>
                  </div>

                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue ml-3">
                      SEARCH
                    </button>
                    <button
                      type="submit"
                      
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
                <th>Date & Time</th>
                <th>Student</th>
                <th>Contact</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
                    
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default CallLogs;
