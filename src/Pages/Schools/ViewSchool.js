import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxSchool from "../../util/remote/ajaxSchool";
import SchoolContext from "../../Context/SchoolContext";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../../Components/Common/Loader";
import jsPDF from "jspdf";
import "jspdf-autotable";


function ViewSchool() {
  const [schoolList, setSchoolList] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")

  const refreshData = () =>{
    getSchoolList()
  }

  const getSchoolList= async () => {
    setLoading2(true)
    const server_response = await ajaxSchool.fetchSchools(page);
    setLoading2(false)
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setSchoolList(server_response.details.list);
    } else {
      setSchoolList("404");
    }
  };

  const exportToPDF = () => {
    const table = document.querySelector(".table"); // Select the table element
    const pdf = new jsPDF("p", "pt", "a4");
  
    // Define columns for the table (add more if needed)
    const columns = ["No.", "School Name", "Phone", "E-mail", "District"];
  
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
    pdf.save("schools_data.pdf");
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


  const searchSchools = async (e) => {
    if (e) {
        e.preventDefault();
    }
    if (!query) {
        toast.error("Please enter name of school.");
    } else {
      var data = {
        query: query
      };
        setLoading(true);
        const server_response = await ajaxSchool.searchSchoolList(data);
        setLoading(false);
        if (server_response.status === "OK") {
            if (server_response.details.length === 0) {
                setSchoolSearch([]);
            } else {
                setSchoolSearch(server_response.details);
            }
        } else {
            setSchoolSearch([]);
        }
    }
};

useEffect(() => {
    if (query) {
        searchSchools();
    }
}, [query]);

useEffect(() => {
  getSchoolList();
}, [page]);

  return (
    <AppContainer title={"Schools"}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h5 style={{marginBottom:0}}>All Schools</h5>
            </div>
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
              <div className="col-11-xxxl col-xl-9 col-lg-9 col-9 form-group">
                <input
                  type="text"
                  style={{border: "1px solid grey"}}

                  value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for school..."
                  className="form-control"
                />
              </div>
              <div className="col-1-xxxl col-xl-3 col-lg-3 col-3 form-group">
                <button
                  type="submit"
                  onClick={(e) => searchSchools(e)}
                  className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                  SEARCH
                </button>
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>No. </th>
                  <th>School Name</th>
                  <th>Phone</th>
                  <th>E-mail</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>
              {schoolSearch && Array.isArray(schoolSearch) ? 
                        ( schoolSearch.map((item, key) => (
                          <tr key={key}>
                          <td>{key + 1}</td>
                          <td><Link
                          to={`/schools/view/profile/${item.school_id}`}>
                          {item.school_name}
                        </Link></td>
                          <td>{item.contact}</td>
                          <td>{item.email}</td>
                          <td>{item.district?.district_name}</td>
                        </tr>
                        )))
                    : (
                Array.isArray(schoolList) && schoolList.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td><Link
                          to={`/schools/view/profile/${item.school_id}`}>
                          {item.school_name}
                        </Link></td>
                      <td>{item.contact}</td>
                      <td>{item.email}</td>
                      <td>{item.district?.district_name}</td>
                    </tr>
                  )))}
                {schoolList === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No schools registered yet.
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
            {loading && <Loader/>}
            {loading2 && <Loader/>}
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewSchool;
