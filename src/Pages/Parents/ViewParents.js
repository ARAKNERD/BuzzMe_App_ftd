import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { Link} from "react-router-dom";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ajaxParent from "../../util/remote/ajaxParent";
import toast, {Toaster} from "react-hot-toast";
import RemoteLogOut from "../RemoteLogOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteAccount from "../DeleteAccount";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ViewParents() {

  const [parentList, setParentList] = useState([]);
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState([])
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState("");
  const [modal, setModal] = useStateCallback(false);

  const getParentList = async (currentPage) => {
    setLoading(true)
    const server_response = await ajaxParent.listParents(currentPage);
    setLoading(false)
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setParentList(server_response.details.list || []);
    } else {
      setParentList([]);
    }
  };

  const refreshData = () =>{
    getParentList(1)
  }

  const searchParents = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading2(true);
      const server_response = await ajaxParent.searchAllParents(query, page);
      setLoading2(false);
      if (server_response.status === "OK") {
        setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setParentList(server_response.details.list || []);
    } else {
      setParentList([]);
      }
  };

  const setParents = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getParentList(1);

    
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

  const handleDelete = (e, item) => {
    setModal(false, () =>
      setModal(
        <DeleteAccount
          userID={item.user_id}
          g={getParentList}
          isOpen={true}
          page={page}
        />
      )
    );
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Names", "Contact Number"];
    const data = parentList.map(item => [
      item.full_name,
      item.username
    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("parent_list.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (query) {
      searchParents();
    } else {
      getParentList(page);
    }
  }, [page]);

  return(
  <AppContainer title="Contacts">
    <Toaster position="top-center" reverseOrder={false} />
    {modal}
    <div className="row"> 
    <div className="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                   title="Contacts List"
                  subtitle="List of all the contacts sorted in ascending order"
                />
                <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>

                                            <Link class="dropdown-item" to={'/deleted-users'} ><i class="fa-solid fa-eye text-orange-peel"></i>View Deleted Accounts</Link>
                                        </div>
                                    </div>
              </div>
              <form className="mg-b-20">
              <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query} onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                          setParents(e);
                        }
                      }}
                      placeholder="Search for contact first or last name..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchParents(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => setParents(e)}
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
              <th scope="col" className="wd-10p">No.</th>
                      <th scope="col">Names</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Address</th>
                      <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parentList.length > 0 ? (
                parentList.map((item, index) => (
                  <tr key={index}>
                    <th scope='row' style={{width:"5px"}}>{index + first + 1}</th>
                        <td><Link
                        to={`/parents/profile/${item.parent_id}/${item.user_id}`}>
                        {item.full_name}
                      </Link></td>
                        <td>{item.username}</td>
                        <td>{item.gender}</td>
                        <td>{item.address}</td>
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
                onClick={(e) => remoteLogout(e,item)}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "red", marginRight: "3px" }} />
                Remote Log-Out
              </Link>
              <Link
                className="dropdown-item"
                to="#"
                onClick={(e) => handleDelete(e,item)}>
                <FontAwesomeIcon icon={faTrash} style={{ color: "red", marginRight: "3px" }} />
                Delete Account
              </Link>
</div>
            </div>
          </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No parents registered yet.
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
      </div>
		</div> 
    
    </AppContainer>
  )
}

export default ViewParents;