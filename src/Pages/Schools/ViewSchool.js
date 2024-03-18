import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxSchool from "../../util/remote/ajaxSchool";
import SchoolContext from "../../Context/SchoolContext";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../../Components/Common/Loader";


function ViewSchool() {
  const {schoolList, getSchoolList} = useContext(SchoolContext);
  const [schoolSearch, setSchoolSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [loading,setLoading] = useState(false)

  const refreshData = () =>{
    getSchoolList()
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
                                        </div>
                                    </div>
          </div>
          <form className="mg-b-20">
            <div className="row gutters-8">
              <div className="col-11-xxxl col-xl-9 col-lg-9 col-9 form-group">
                <input
                  type="text"
                  value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
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
                    ( schoolSearch.length > 0 ?
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
                      <tr>
                      <td colSpan="7" style={{textAlign: "center"}}>
                        No schools match the search query.
                      </td>
                    </tr>
                    )
                ) : (
                Array.isArray(schoolList) && schoolList.length > 0 ? (
                  schoolList.map((item, key) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{textAlign: "center"}}>
                      No schools registered yet.
                    </td>
                  </tr>
                ))}
                {loading && <Loader/>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewSchool;
