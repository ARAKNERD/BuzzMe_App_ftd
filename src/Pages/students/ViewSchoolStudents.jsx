import React, {useEffect, useState} from "react";
import ajaxStudent from "../../util/remote/ajaxStudent";
import useStateCallback from "../../util/customHooks/useStateCallback";
import StudentCodeSlip from "./StudentCodeSlip";
import {Link} from "react-router-dom";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import toast, {Toaster} from "react-hot-toast";


function ViewSchoolStudents(props) {
  
  const [studentList, setStudentList] = useState("");
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")
  const [studentSearch, setStudentSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  
  const data = {
    school_id: props.school,
    page: page
  };

  const data2 = {
    query: query,
    school_id: props.school,
  };


  const getStudentList = async () => {
    
    const server_response = await ajaxStudent.fetchStudentList(data);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages)
      setStudentList(server_response.details.list);
    } else {
      setStudentList("404");
    }
  };

  useEffect(() => {
    getStudentList();
  }, [data]);

  const searchStudents = async (e) => {
    if (e) {
        e.preventDefault();
    }
    if (!query) {
        toast.error("Please enter name of student.");
    } else {
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
    }
};

const setStudents = (e) =>{
  e.preventDefault()
 setStudentSearch(false)
 setQuery('')
}

useEffect(() => {
    if (query) {
        searchStudents();
    }
}, [query]);

  // ----------------------handles the view -----students printable codeslip -modal
  const [ViewStudentSlip, setViewStudentSlip] = useStateCallback(false);
  const handle_view_slip = (id) => {
    setViewStudentSlip(false, () =>
      setViewStudentSlip(<StudentCodeSlip isOpen={true} id={id} />)
    );
  };

  const setNextPageNumber = () =>{
    if(meta.length===page){
      
    }
    else{
      setPage(page+1)
    }
    
  }

  const setPreviousPageNumber = () =>{
    if(page===1){
      
    }
    else{
      setPage(page-1)
    }
    
  }
  const setPageNumber = (e,item) =>{
    setPage(item)
  }

  return (
    <>
      {ViewStudentSlip}

      <div className="col-lg-12">
        <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
          <div className="card-body map-card">
            <div class="heading-layout1 mg-b-25">
              <TableHeader
                title="Students List"
                subtitle="List of all the students sorted in ascending order"    
              />
              <div class="dropdown">
                <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
                <div class="dropdown-menu dropdown-menu-right">
                  <Link class="dropdown-item" onClick={getStudentList} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                </div>
              </div>
            </div>
            <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <input
                  type="text"
                  value={query} onChange={(e) => setQuery(e.target.value)}
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
                    <th>Student Code</th>
                    <th>Registration Number</th>
                    <th>
                      Student Card
                    </th>
                  </tr>
                </thead>
                <tbody>
                {studentSearch && Array.isArray(studentSearch) ? 
                    ( studentSearch.length > 0 ?
                        ( studentSearch.map((item, key) => (
                          <tr key={key}>
                          <td>{key + 1}</td>
                          <td><Link
                          to={`/students/profile/${item.id}`}>
                          {item.names}
                        </Link></td>
                          <td className="text-dark">{item.student_code}</td>
                          <td className="text-dark">{item.reg_no}</td>
                          <td><button
                          className="btn btn-info"
                          onClick={() => handle_view_slip(item.id)}>
                          View
                        </button></td>
                        </tr>
                        )))
                    : (
                      <tr>
                      <td colSpan="5" style={{textAlign: "center"}}>
                        No students match the search query.
                      </td>
                    </tr>
                    )
                ) : (
                Array.isArray(studentList) && studentList.length > 0 ? (
                  studentList.map((student, key) => (
                    <tr key={key}>
                      <td>{key+1}</td>
                      <td><Link
                          to={`/students/profile/${student.id}`}>
                          {student.names}
                        </Link></td>
                      <td className="text-dark">
                        {student.student_code}
                      </td>
                      <td className="text-dark">
                        {student.reg_no}
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handle_view_slip(student.id)}>
                          View
                        </button>
                      </td>
                    </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="5" style={{textAlign:"center"}}>No students registered yet.</td>
                      </tr>
                ))}
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
              {loading && <Loader/>}
            </div>
          </div>
			    </div>
			</div>
    </>
    

  );
}

export default ViewSchoolStudents;
