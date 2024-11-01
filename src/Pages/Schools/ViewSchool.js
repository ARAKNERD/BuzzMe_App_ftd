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
  const [schoolList, setSchoolList] = useState([]);
  const [query, setQuery] = useState("");
  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState([])

  const getSchoolList = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxSchool.fetchSchools(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setSchoolList(server_response.details.list || []);
    } else {
      setSchoolList([]);
    }
  };

  const searchSchools = async (e) => {
    if (e) {
        e.preventDefault();
    }
    var data = {
      search: query,
      page: page
    };
    setLoading2(true);
    const server_response = await ajaxSchool.searchSchoolList(data);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setSchoolList(server_response.details.list || []);
    } else {
      setSchoolList([]);
    }    
  };

  const refreshData = () =>{
    getSchoolList(1)
  }

  const setSchools = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getSchoolList(1);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["School Name", "School Phone", "E-mail", "District"];
    const data = schoolList.map(item => [
      item.school_name,
      item.contact,
      item.email,
      item.district
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("school_list.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (query) {
      searchSchools();
    } else {
      getSchoolList(page);
    }
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
              <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <input
                  type="text"
                  style={{border: "1px solid grey"}}

                  value={query} onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value === '') {
                      setSchools(e);
                    }
                  }}
                  placeholder="Search for school name..."
                  className="form-control"
                />
              </div>
              <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchSchools(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => setSchools(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-2">
                      RESET
                    </button>
                  </div>
            </div>
          </form>
          <div className="table-responsive">
        {loading || loading2 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
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
              {schoolList.length > 0 ? (
                schoolList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                          <td><Link
                          to={`/schools/view/profile/${item.school_id}`}>
                          {item.school_name}
                        </Link></td>
                          <td>{item.contact}</td>
                          <td>{item.email}</td>
                          <td>{item.district}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No schools registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page - 1)}>
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
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
         
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewSchool;
