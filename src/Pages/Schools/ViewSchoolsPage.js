import React, {useContext, useEffect} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Loader from "../../Components/Common/Loader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchForm from "../../Components/Common/SearchForm";
import Pagination from "../../Components/Common/Pagination";
import SchoolContext from "../../Context/SchoolContext";


function ViewSchoolsPage() {
  const {schoolListByPage, getSchoolListByPage, searchSchools, loading, loading2, meta, query, page, setQuery, setPage } = useContext(SchoolContext);

  const refreshData = () =>{
    getSchoolListByPage(1)
  }

  const setSchools = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getSchoolListByPage(1);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["School Name", "School Phone", "E-mail", "District"];
    const data = schoolListByPage.map(item => [
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
      getSchoolListByPage(page);
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
              <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>

              <div class="dropdown-menu dropdown-menu-right">
                  <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                  <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
              </div>
          </div>
          </div>
          <SearchForm searchTerm={query} setSearchTerm={setQuery} searchItems={searchSchools} setItems={setSchools} setPage={setPage} placeholder="Search for school name..."/>

          <div className="table-responsive">
        {loading || loading2 ? (
          <Loader /> 
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
              {schoolListByPage.length > 0 ? (
                schoolListByPage.map((item, index) => (
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

      <Pagination currentPage={page} totalPages={meta.length} onPageChange={handlePagination}/>
         
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewSchoolsPage;
