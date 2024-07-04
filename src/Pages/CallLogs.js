import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import AppContainer from "../Components/Structure/AppContainer";
import TableHeader from "../Components/Common/TableHeader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ajaxCallStation from "../util/remote/ajaxCallStation";
import Loader from "../Components/Common/Loader";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function CallLogs() {

  const [zegoLogsList, setZegoLogsList] = useState(false);
  const [twilioLogsList, setTwilioLogsList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [page,setPage] = useState(1)
  const [page1,setPage1] = useState(1)

  const [meta,setMeta] = useState("")
  const [meta1,setMeta1] = useState("")
  
  const [type1,setType1] = useState("ZEGO")
  const [type2,setType2] = useState("TWILIO")

  const getZegoLogsList = async () => {
    setLoading(true);
    const server_response = await ajaxCallStation.listZegoCallLogs(page,type1);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setZegoLogsList(server_response.details.list);
    }else {
      setZegoLogsList("404");
    }
  };

  const getTwilioLogsList = async () => {
    setLoading2(true);
    const server_response = await ajaxCallStation.listTwilioCallLogs(page1,type2);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta1(server_response.details.meta.list_of_pages);
      setTwilioLogsList(server_response.details.list);
    }else {
      setTwilioLogsList("404");
    }
  };

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

  const setNextPageNumber = () =>{
    if(meta.length===page){
      
    }
    else{
      setPage(page+1)
    }
    
  }
  const setNextPageNumber1 = () =>{
    if(meta1.length===page1){
      
    }
    else{
      setPage1(page1+1)
    }
    
  }
  const setPreviousPageNumber = () =>{
    if(page===1){
      
    }
    else{
      setPage(page-1)
    }
    
  }
  const setPreviousPageNumber1 = () =>{
    if(page1===1){
      
    }
    else{
      setPage1(page1-1)
    }
    
  }
  const setPageNumber = (e,item) =>{
    setPage(item)
  }
  const setPageNumber1 = (e,item) =>{
    setPage1(item)
  }

  useEffect(() => {
    getZegoLogsList();
  }, [page, type1]);
  useEffect(() => {
    getTwilioLogsList();
  }, [page1, type2]);

  return (
    <AppContainer title="Call Logs">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
        <div className="card height-auto">
   
      <div className="card-body">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row mb-1">
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="first">
                      Zego Calls{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="second">
                      Twilio Calls{" "}
                    </Nav.Link>
                  </Nav.Item>
                  
                </Nav>
              </Col>

              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  <div class="heading-layout1 mg-b-5">
        <TableHeader
            subtitle="List of all the zego calls sorted by the most recent"    
              />
              <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                                        </div>
                                    </div></div>
         <form className="mg-t-10">
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
                <th style={{ width: '5px' }}></th>
                <th>Date & Time</th>
                <th>Student</th>
                <th>Contact</th>
                <th>Duration</th>
                <th>Station</th>
              </tr>
            </thead>
            <tbody>
            {zegoLogsList && Array.isArray(zegoLogsList) ? (
                     
                     zegoLogsList.map((item, key) => (
                       <tr key={key}>
                        {item.duration===0?<td ><i className="fe fe-phone-missed" style={{color:"red"}}></i></td>:<td><i className="fe fe-phone-incoming" style={{color:"green"}}></i></td>}

                         <td>{item.created_at.long_date}</td>
                         <td className="text-dark">{item.student}<br/><small>{item.student_info?.student_code}</small></td>
                         <td className="text-dark">{item.contact_name}<br/><small>{item.contact}</small></td>
                         <td>{item.duration_format}</td>
                         <td>{item.station_name}<br/><small>{item.school}</small></td>
                         
                         
                       </tr>
                     ))
                   
                 ) : Array.isArray(zegoLogsList) && zegoLogsList.map((item, key) => (
                     <tr key={key}>
                      {item.duration===0?<td ><i className="fe fe-phone-missed" style={{color:"red"}}></i></td>:<td><i className="fe fe-phone-incoming" style={{color:"green"}}></i></td>}

                    <td>{item.created_at.long_date}</td>
                    <td className="text-dark">{item.student}<br/><small>{item.student_info?.student_code}</small></td>
                    <td className="text-dark">{item.contact_name}<br/><small>{item.contact}</small></td>
                    <td>{item.duration_format}</td>
                    <td>{item.station_name}<br/><small>{item.school}</small></td>
                      
                     </tr>
                   ))
                 }
                 {zegoLogsList === "404" && (<tr>
                       <td colSpan="6" style={{textAlign: "center"}}>
                         No call logs found.
                       </td>
                     </tr>)}
                    
            </tbody>
            <div className='align-items-center justify-content-center pos-absolute' style={{left:'50%'}}>
      
      
    <button className='btn btn-dark' style={{borderRight:'1px solid yellow'}} onClick={setPreviousPageNumber}><i className='fa fa-angle-left mr-2'></i> Prev</button>
          {Array.isArray(meta) && meta.map((item)=>
          page===item?
          <button  style={{borderRight:'1px solid yellow'}} className='btn btn-primary'>{item}</button>
          :
          <button onClick={(e)=>setPageNumber(e,item)} style={{borderRight:'1px solid yellow'}} className='btn btn-dark'>{item}</button>
          )}


					<button style={{borderRight:'1px solid yellow'}} className='btn btn-dark' onClick={setNextPageNumber}>Next<i className='fa fa-angle-right ml-2'></i></button>
                </div>
          </table>
          {loading2 && <Loader/>}
        </div>
                
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                  <div class="heading-layout1 mg-b-5">
        <TableHeader
            subtitle="List of all the twilio calls sorted by the most recent"    
              />
              <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                                        </div>
                                    </div></div>
         <form className="mg-t-10">
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
                <th style={{ width: '5px' }}></th>
                <th>Date & Time</th>
                <th>Student</th>
                <th>Contact</th>
                <th>Duration</th>
                <th>Station</th>
              </tr>
            </thead>
            <tbody>
            {twilioLogsList && Array.isArray(twilioLogsList) ? (
                     
                     twilioLogsList.map((item, key) => (
                       <tr key={key}>
                        {item.duration===0?<td ><i className="fe fe-phone-missed" style={{color:"red"}}></i></td>:<td><i className="fe fe-phone-incoming" style={{color:"green"}}></i></td>}

                         <td>{item.created_at.long_date}</td>
                         <td className="text-dark">{item.student}<br/><small>{item.student_info?.student_code}</small></td>
                         <td className="text-dark">{item.contact_name}<br/><small>{item.contact}</small></td>
                         <td>{item.duration_format}</td>
                         <td>{item.station_name}<br/><small>{item.school}</small></td>
                         
                         
                       </tr>
                     ))
                   
                 ) : Array.isArray(twilioLogsList) && twilioLogsList.map((item, key) => (
                     <tr key={key}>
                      {item.duration===0?<td ><i className="fe fe-phone-missed" style={{color:"red"}}></i></td>:<td><i className="fe fe-phone-incoming" style={{color:"green"}}></i></td>}

                    <td>{item.created_at.long_date}</td>
                    <td className="text-dark">{item.student}<br/><small>{item.student_info?.student_code}</small></td>
                    <td className="text-dark">{item.contact_name}<br/><small>{item.contact}</small></td>
                    <td>{item.duration_format}</td>
                    <td>{item.station_name}<br/><small>{item.school}</small></td>
                      
                     </tr>
                   ))
                 }
                 {twilioLogsList === "404" && (<tr>
                       <td colSpan="6" style={{textAlign: "center"}}>
                         No call logs found.
                       </td>
                     </tr>)}
                    
            </tbody>
            <div className='align-items-center justify-content-center pos-absolute' style={{left:'50%'}}>
      
      
    <button className='btn btn-dark' style={{borderRight:'1px solid yellow'}} onClick={setPreviousPageNumber1}><i className='fa fa-angle-left mr-2'></i> Prev</button>
          {Array.isArray(meta1) && meta1.map((item)=>
          page1===item?
          <button  style={{borderRight:'1px solid yellow'}} className='btn btn-primary'>{item}</button>
          :
          <button onClick={(e)=>setPageNumber1(e,item)} style={{borderRight:'1px solid yellow'}} className='btn btn-dark'>{item}</button>
          )}


					<button style={{borderRight:'1px solid yellow'}} className='btn btn-dark' onClick={setNextPageNumber1}>Next<i className='fa fa-angle-right ml-2'></i></button>
                </div>
          </table>
          {loading2 && <Loader/>}
        </div>
                 

                   
                   
                  </Tab.Pane>
                  
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>  
      
      </div>
    </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default CallLogs;
