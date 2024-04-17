import React, {useContext} from "react";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import AppContainer from "../Components/Structure/AppContainer";
import TableHeader from "../Components/Common/TableHeader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CallLogs() {

  return (
    <AppContainer title="Call Logs">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
        <div className="card height-auto">
   
      <div className="card-body">
        <TableHeader
            title="Call Log Details"
            subtitle="List of all the phone calls sorted by the most recent"    
              />
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
