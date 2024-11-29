import React, {useContext, useEffect} from "react";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faUserLock } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import StudentContext from "../../../Context/StudentContext";
import RemoteLogOut from "../../RemoteLogOut";
import SearchForm from "../../../Components/Common/SearchForm";
import Pagination from "../../../Components/Common/Pagination";
import AppContainer from "../../../Components/Structure/AppContainer";
import TableHeader from "../../../Components/Common/TableHeader";
import Loader from "../../../Components/Common/Loader";
import ajaxStudent from "../../../util/remote/ajaxStudent";
import useStateCallback from "../../../util/customHooks/useStateCallback";

function ViewStudentsPage() {
  
  const [modal, setModal] = useStateCallback(false);
  const {studentList, meta, page, query, first, setQuery, setPage, searchStudents, getStudentList, loading, loading2} = useContext(StudentContext);
  
  useEffect(() => {
    if (query) {
      searchStudents();
    } else {
      getStudentList(page);
    }
  }, [page]);

  const getDefaultPin = async (e,item) => {
    e.preventDefault()
    const server_response = await ajaxStudent.setDefaultPin(item.user_id);
    if (server_response.status === "OK") {
      toast.success(server_response.message, {duration: 10000});
      getStudentList(page);
    }
  };

  const setStudents = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getStudentList(1);
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
                                <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>

                                <div class="dropdown-menu dropdown-menu-right">
                                    <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                                </div>
                            </div>
                        </div>

                        <SearchForm searchTerm={query} setSearchTerm={setQuery} searchItems={searchStudents} setItems={setStudents} setPage={setPage} placeholder="Enter first or last number of student..."/>

                        <div className="border-top mt-3"></div>
                        <div className="table-responsive">
                            {loading || loading2 ? (
                                <Loader />
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
                                                        <span class="badge badge-danger">{item.default_pin}</span></OverlayTrigger>}
                                                </td>
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
                                        ) : 
                                        (
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

                        <Pagination currentPage={page} totalPages={meta.length} onPageChange={handlePagination}/>
                    
                    </div>
                </div>
            </div>
        </div>
    </AppContainer>
  );
}

export default ViewStudentsPage;