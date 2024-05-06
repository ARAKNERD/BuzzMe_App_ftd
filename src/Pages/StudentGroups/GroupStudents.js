import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Link, useParams } from 'react-router-dom'
import TableHeader from "../../Components/Common/TableHeader";
import useStateCallback from "../../util/customHooks/useStateCallback";
import StudentCodeSlip from "../students/StudentCodeSlip";
import ajaxStudent from "../../util/remote/ajaxStudent";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../../Components/Common/Loader";


function GroupStudents() 
{
  const {id} = useParams();
  const [studentList, setStudentList] = useState(false);
  const [page,setPage] = useState(1);
  const [meta,setMeta] = useState("")
  const [first,setFirst] = useState("")
  const [studentSearch, setStudentSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  
  const data2 = {
    query: query,
    group_id: id,
  };
  
  
  const getStudentList = async () => {
    setLoading2(true)
    const server_response = await ajaxStudent.fetchGroupStudents(id, page);
    setLoading2(false)
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages)
      setStudentList(server_response.details.list);
      setFirst(server_response.details.meta.offset_count);
    } else {
      setStudentList("404");
    }
  };
  
  useEffect(() => {
    getStudentList();
  }, [id, page]);
  
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
  const handle_view_slip = () => {
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
    <AppContainer title="Group Students">
      <Toaster position="top-center" reverseOrder={false} />

      {ViewStudentSlip}

      <div className="col-lg-12">
        <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
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
            </tr>
          </thead>
          <tbody>
          {studentSearch && Array.isArray(studentSearch) ? 
              ( studentSearch.map((item, key) => (
                    <tr key={key}>
                    <td>{key + first + 1}</td>
                    <td><Link
                    to={`/students/profile/${item.id}`}>
                    {item.names}
                  </Link></td>
                    <td className="text-dark">{item.student_code}</td>
                    <td className="text-dark">{item.reg_no}</td>
                 
                  </tr>
                  )))
              : (
          Array.isArray(studentList) && studentList.map((student, key) => (
              <tr key={key}>
                <td>{key + first + 1}</td>
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
              </tr>
                ))
             )}
             {studentList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No students registered within this group yet.
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
    </div>
    </div>
</div>
    </AppContainer>
  );
}

export default GroupStudents;
