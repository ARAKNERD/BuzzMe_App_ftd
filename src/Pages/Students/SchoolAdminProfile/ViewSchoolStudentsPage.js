import React, { useEffect} from "react";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SchoolContext from "../../../Context/SchoolContext";
import AppContainer from "../../../Components/Structure/AppContainer";
import TableHeader from "../../../Components/Common/TableHeader";
import Loader from "../../../Components/Common/Loader";
import StudentContext from "../../../Context/StudentContext";
import SearchForm from "../../../Components/Common/SearchForm";
import Pagination from "../../../Components/Common/Pagination";
import ajaxStudent from "../../../util/remote/ajaxStudent";

function ViewSchoolStudentsPage() {

  const { schoolDetails } = useContext(SchoolContext);
  const {schoolStudentList, schoolMeta, schoolPage, schoolId, schoolQuery, schoolFirst, setSchoolQuery, setSchoolPage,
    setSchoolId, searchSchoolStudents, getSchoolStudentList, loading, loading2} = useContext(StudentContext);

  useEffect(() => {
    setSchoolId(schoolDetails.school_id);
  }, [schoolDetails.school_id, setSchoolId]);

  useEffect(() => {
    if (schoolQuery) {
      searchSchoolStudents();
    } else {
      getSchoolStudentList(schoolPage, schoolId);
    }
  }, [schoolPage, schoolId]);

  const getDefaultPin = async (e, item) => {
    e.preventDefault();
    const server_response = await ajaxStudent.setDefaultPin(item.user_id);
    if (server_response.status === "OK") {
      toast.success(server_response.message, { duration: 10000 });
      getSchoolStudentList(schoolPage, schoolDetails.school_id);
    }
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Student Name", "Gender", "Student Code", "Student Group"];
    const data = schoolStudentList.map(item => [
      item.full_name,
      item.gender,
      item.username,
      item.group
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("student_list.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= schoolMeta.length) {
      setSchoolPage(newPage);
    }
  };

  const setStudents = (e) => {
    e.preventDefault();
    setSchoolQuery("");
    setSchoolPage(1);
    getSchoolStudentList(1);
  };

  return (
    <AppContainer title="Students">
      <Toaster position="top-center" reverseOrder={false} />

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
                  <a class="dropdown-toggle" href="#"role="button" data-toggle="dropdown" aria-expanded="false">...</a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <Link class="dropdown-item" onClick={(e) => setStudents(e)}>
                      <i class="fas fa-redo-alt text-orange-peel"></i>Refresh
                    </Link>
                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                  </div>
                </div>
              </div>

              <SearchForm searchTerm={schoolQuery} setSearchTerm={setSchoolQuery} searchItems={searchSchoolStudents} setItems={setStudents} setPage={setSchoolPage} placeholder="Enter first or last name of student..."/>

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
                        <th>Student Code</th>
                        <th>Student Group</th>
                        <th>Default Pin</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schoolStudentList.length > 0 ? (
                        schoolStudentList.map((item, index) => (
                          <tr key={index}>
                            <td style={{width:"5px"}}>{index + schoolFirst + 1}</td>
                            <td>
                              <Link to={`/school-students/profile/${item.student_id}/${item.user_id}`}>
                                {item.first_name} {item.last_name}
                              </Link>
                            </td>
                            <td className="text-dark">{item.gender}</td>
                            <td className="text-dark">{item.username}</td>

                            <td className="text-dark">{item.group}</td>
                            <td>{item.is_secure==="1"?<span class="badge badge-success">SECURED</span>:
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="refresh-tooltip">Account is not secure!</Tooltip>}>
                                <span class="badge badge-danger">{item.default_pin}</span>
                              </OverlayTrigger>}
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
                  </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center" }}>
                            No students registered in this school yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <Pagination currentPage={schoolPage} totalPages={schoolMeta.length} onPageChange={handlePagination}/>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewSchoolStudentsPage;
