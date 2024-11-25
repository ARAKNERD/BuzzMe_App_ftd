import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudent from "../../util/remote/ajaxStudent";
import TableHeader from "../../Components/Common/TableHeader";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";
import Loader from "../../Components/Common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUserLock } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import RemoteLogOut from "../RemoteLogOut";
import useStateCallback from "../../util/customHooks/useStateCallback";

function ViewAllStudents() {
  const [studentList, setStudentList] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState("");
  const [modal, setModal] = useStateCallback(false);

  const getStudentList = async (currentPage) => {
    setLoading2(true);
    const server_response = await ajaxStudent.fetchAllStudents(currentPage);
    setLoading2(false);
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setStudentList(server_response.details.list || []);
    } else {
      setStudentList([]);
    }
  };

  const getDefaultPin = async (e,item) => {
    e.preventDefault()
    const server_response = await ajaxStudent.setDefaultPin(item.user_id);
    if (server_response.status === "OK") {
      toast.success(server_response.message, {duration: 10000});
      getStudentList(page);
    }
  };


  const searchStudents = async (e) => {
    if (e) {
        e.preventDefault();
    }
    setLoading(true);
    const server_response = await ajaxStudent.searchAllStudents(query, page);
    setLoading(false);
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setStudentList(server_response.details.list || []);
    } else {
      setStudentList([]);
    }
    
  };

  const setStudents = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getStudentList(1);
  };

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value === '') {
      setStudents(e);
    } else {
      setPage(1); 
    }
};

  const refreshData = () => {
    getStudentList(1);
  };

  const remoteLogout = (e, item) => {
    setModal(false, () =>
      setModal(
        <RemoteLogOut
          userID={item.user_id}
          isOpen={true}
        />
      )
    );
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Student Name", "Gender", "Student Code", "School Name"];
    const data = studentList.map(item => [
      item.full_name,
      item.gender,
      item.username,
      item.school
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("student_list.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (query) {
      searchStudents();
    } else {
      getStudentList(page);
    }
  }, [page]);

  return (
    <AppContainer title="Students">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
      <div className="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                   title="Students List"
                  subtitle="List of all the students sorted in ascending order"
                />
                <div class="dropdown">
                <a class="dropdown-toggle" href="#" role="button" 
                data-toggle="dropdown" aria-expanded="false">...</a>

                <div class="dropdown-menu dropdown-menu-right">
                    <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                </div>
                                    </div>
              </div>
              <form className="mg-b-20">
              <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query} onChange={handleSearchQueryChange}
                      style={{border: "1px solid grey"}}
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
        {loading || loading2 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
              <th>No.</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>School</th>
                      <th>Student Code</th>
                      <th>Default Pin</th>
                      <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList.length > 0 ? (
                studentList.map((item, index) => (
                  <tr key={index}>
                    <td style={{width:"5px"}}>{index + first + 1}</td>
          <td>
            <Link to={`/students/profile/${item.student_id}/${item.user_id}`}>
              {item.full_name}
            </Link>
          </td>
          <td className="text-dark">{item.gender}</td>
          <td className="text-dark">{item.school}</td>
          <td className="text-dark">{item.username}</td>
          <td>{item.is_secure==="1"?<span class="badge badge-success">SECURED</span>:
          <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="refresh-tooltip">Account is not secure!</Tooltip>}>
             <span class="badge badge-danger">{item.default_pin}</span></OverlayTrigger>}</td>
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
              <Link
                className="dropdown-item"
                to="#"
                onClick={(e) => remoteLogout(e,item)}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "red", marginRight: "3px" }} />
                Remote Log-Out
              </Link>
</div>
            </div>
          </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No students registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={page === 1} onClick={() => handlePagination(page - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(meta) && meta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${page === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
            
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={page === meta.length} onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
              
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewAllStudents;