import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudent from "../../util/remote/ajaxStudent";
import TableHeader from "../../Components/Common/TableHeader";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ViewAllStudents() {
  const [studentList, setStudentList] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");
  const [studentSearch, setStudentSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState("");


  const getStudentList = async () => {
    setLoading2(true);
    const server_response = await ajaxStudent.fetchAllStudents(page);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStudentList(server_response.details.list);
      setFirst(server_response.details.meta.offset_count);
    }
    else {
      setStudentList("404");
    }
  };

  const getDefaultPin = async (e,item) => {
    e.preventDefault()
    const server_response = await ajaxStudent.setDefaultPin(item.account_id);
    if (server_response.status === "OK") {
      toast.success(server_response.message, {duration: 10000});
      getStudentList();
    }
  };

  const exportToPDF = () => {
    const table = document.querySelector(".table"); // Select the table element
    const pdf = new jsPDF("p", "pt", "a4");
  
    // Define columns for the table (add more if needed)
    const columns = ["No.", "Student Name", "School", "Student Code"];
  
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
    pdf.save("students_data.pdf");
  };

  useEffect(() => {
    getStudentList();
  }, [page]);

  const data2 = {
    search: query
  };
  const searchStudents = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
      setLoading(true);
      const server_response = await ajaxStudent.searchStudent(data2);
      setLoading(false);
      if (server_response.status === "OK") {
        if (server_response.details.length === 0) {
          setStudentSearch([]);
        } else {
          setStudentSearch(server_response.details);
        }
      } else {
        setStudentSearch([]);
      }
    
  };

  const setStudents = (e) => {
    e.preventDefault();
    setStudentSearch(false);
    setQuery("");
  };

  useEffect(() => {
      searchStudents();
  }, []);

  const setNextPageNumber = () => {
    if (meta.length === page) {
    } else {
      setPage(page + 1);
    }
  };

  const setPreviousPageNumber = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };
  const setPageNumber = (e, item) => {
    setPage(item);
  };

  return (
    <AppContainer title="Students">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-12">
          <div
            className="card custom-card"
            style={{marginTop: "25px", borderRadius: "10px"}}>
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Students List"
                  subtitle="List of all the students sorted in ascending order"
                />
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    ...
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <Link class="dropdown-item" onClick={getStudentList}>
                      <i class="fas fa-redo-alt text-orange-peel"></i>Refresh
                    </Link>
                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                  </div>
                </div>
              </div>
              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query} onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                          setStudents(e);
                        }
                      }}
                      placeholder="Search for student name..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchStudents(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => setStudents(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-2">
                      RESET
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>School</th>
                      <th>Student Code</th>
                      <th>Account Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentSearch && Array.isArray(studentSearch) ? (
                        studentSearch.map((item, key) => (
                          <tr key={key}>
                            <td style={{width:"5px"}}>{key + first + 1}</td>
                            <td>
                              <Link to={`/students/profile/${item.id}`}>
                                {item.first_name} {item.last_name}
                              </Link>
                            </td>
                            <td className="text-dark">{item.gender}</td>
                            <td className="text-dark">{item.school}</td>
                            <td className="text-dark">{item.student_code}</td>
                            
                            <td>{item.is_secure==="1"?<span class="badge badge-success">SECURED</span>:
                          <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="refresh-tooltip">Default pin is {item.default_pin}</Tooltip>}>
                             <span class="badge badge-danger">NOT SECURE</span></OverlayTrigger>}</td>
                            <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false">
                                <span className="flaticon-more-button-of-three-dots"></span>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                
                                <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => getDefaultPin(e,item)}>
                                <FontAwesomeIcon icon={faUserLock} style={{ color: "teal", marginRight: "3px" }} />

                                Set Default Pin
                              </Link>
</div>
                            </div>
                          </td>
                          </tr>
                        ))
                    ) : Array.isArray(studentList) &&
                      studentList.map((item, key) => (
                        <tr key={key}>
                          <td style={{width:"5px"}}>{key + first + 1}</td>
                          <td>
                            <Link to={`/students/profile/${item.id}`}>
                              {item.first_name} {item.last_name}
                            </Link>
                          </td>
                          <td className="text-dark">{item.gender}</td>
                          <td className="text-dark">{item.school}</td>
                          <td className="text-dark">{item.student_code}</td>
                        <td>{item.is_secure==="1"?<span class="badge badge-success">SECURED</span>:
                        <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="refresh-tooltip">Default pin is {item.default_pin}</Tooltip>}>
                           <span class="badge badge-danger">NOT SECURE</span></OverlayTrigger>}</td>
                          <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false">
                                <span className="flaticon-more-button-of-three-dots"></span>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                
                                <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => getDefaultPin(e,item)}>
                                <FontAwesomeIcon icon={faUserLock} style={{ color: "teal", marginRight: "3px" }} />
                                Set Default Pin
                              </Link>
</div>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                    {studentList === "404" && (<tr>
                          <td colSpan="6" style={{textAlign: "center"}}>
                            No students registered in this school yet.
                          </td>
                        </tr>)}
                        {studentSearch.length === 0 && (<tr>
                          <td colSpan="6" style={{textAlign: "center"}}>
                            No search result(s) found.
                          </td>
                        </tr>)}
                  </tbody>
                  <div
                    className="align-items-center justify-content-center pos-absolute"
                    style={{left: "50%"}}>
                    <button
                      className="btn btn-dark"
                      style={{borderRight: "1px solid yellow"}}
                      onClick={setPreviousPageNumber}>
                      <i className="fa fa-angle-left mr-2"></i> Prev
                    </button>
                    {Array.isArray(meta) &&
                      meta.map((item) =>
                        page === item ? (
                          <button
                            style={{borderRight: "1px solid yellow"}}
                            className="btn btn-primary">
                            {item}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => setPageNumber(e, item)}
                            style={{borderRight: "1px solid yellow"}}
                            className="btn btn-dark">
                            {item}
                          </button>
                        )
                      )}

                    <button
                      style={{borderRight: "1px solid yellow"}}
                      className="btn btn-dark"
                      onClick={setNextPageNumber}>
                      Next<i className="fa fa-angle-right ml-2"></i>
                    </button>
                  </div>
                </table>
                {loading2 && <Loader />}
                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewAllStudents;
