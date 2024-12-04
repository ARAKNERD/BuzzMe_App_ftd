import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Link, useParams } from 'react-router-dom'
import TableHeader from "../../Components/Common/TableHeader";
import ajaxStudent from "../../util/remote/ajaxStudent";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../../Components/Common/Loader";
import SearchForm from "../../Components/Common/SearchForm";
import Pagination from "../../Components/Common/Pagination";


function StudentsInGroupPage() 
{
  const {id} = useParams();
  const [studentList, setStudentList] = useState([]);
  const [page,setPage] = useState(1);
  const [meta,setMeta] = useState("")
  const [first,setFirst] = useState("")
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      searchStudents();
    } else {
      getStudentList(page, id);
    }
  }, [page, id]);

  const getStudentList = async (currentPage) => {
    setLoading2(true);
    const server_response = await ajaxStudent.fetchGroupStudents(currentPage, id);
    console.log(server_response)
      setLoading2(false);
      if (server_response.status === "OK") {
        setFirst(server_response.details.meta.offset_count);
        setMeta(server_response.details.meta.list_of_pages);
        setStudentList(server_response.details.list || []); 
      } else {
        setStudentList([]);
      }
  };



  const searchStudents = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading(true);
      const server_response = await ajaxStudent.searchGroupStudent(page, id, query);
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

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };


  return (
    <AppContainer title="Group Students">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Students List"
                  subtitle="List of all the students within the group sorted in ascending order"    
                />
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
                  <div class="dropdown-menu dropdown-menu-right">
                      <Link class="dropdown-item" onClick={getStudentList} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                  </div>
                </div>
              </div>

              <SearchForm searchTerm={query} setSearchTerm={setQuery} searchItems={searchStudents} setItems={setStudents} setPage={setPage} placeholder="Enter first or last name of student..."/>
              
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                {loading || loading2 ? (
                  <Loader />
                ) : (
                  <table className="table table-hover text-nowrap mg-b-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Student Code</th>
                        <th>Registration Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.length > 0 ? (
                        studentList.map((item, key) => (
                          <tr key={key}>
                              <td>{key + first + 1}</td>
                              <td>
                                <Link to={`/students/profile/${item.student_id}/${item.user_id}`}>
                                  {item.full_name}
                                </Link>
                              </td>
                              <td className="text-dark">{item.username}</td>
                              <td className="text-dark">{item.reg_no?item.reg_no:"Not registered"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            No students registered in this group yet.
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

export default StudentsInGroupPage;