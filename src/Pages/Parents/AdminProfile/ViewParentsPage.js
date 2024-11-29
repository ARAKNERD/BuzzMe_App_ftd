import React, { useContext, useEffect} from "react";
import AppContainer from "../../../Components/Structure/AppContainer";
import TableHeader from "../../../Components/Common/TableHeader";
import Loader from "../../../Components/Common/Loader";
import { Link} from "react-router-dom";
import useStateCallback from "../../../util/customHooks/useStateCallback";
import {Toaster} from "react-hot-toast";
import RemoteLogOut from "../../RemoteLogOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteAccount from "../../DeleteAccount";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchForm from "../../../Components/Common/SearchForm";
import Pagination from "../../../Components/Common/Pagination";
import ContactContext from "../../../Context/ContactContext";

function ViewParentsPage() {

  const [modal, setModal] = useStateCallback(false);
  const {contactList, getContactList, searchContacts, loading, loading2, meta, first, query, page, setQuery, setPage } = useContext(ContactContext);

  const refreshData = () =>{
    getContactList(1)
  }

  const setParents = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getContactList(1);
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
          g={getContactList}
          isOpen={true}
          page={page}
        />
      )
    );
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Names", "Contact Number"];
    const data = contactList.map(item => [
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
      searchContacts();
    } else {
      getContactList(page);
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
                  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
                  <div class="dropdown-menu dropdown-menu-right">
                    <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>
                    <Link class="dropdown-item" to={'/deleted-users'} ><i class="fa-solid fa-eye text-orange-peel"></i>View Deleted Accounts</Link>
                  </div>
                </div>
              </div>

              <SearchForm searchTerm={query} setSearchTerm={setQuery} searchItems={searchContacts} setItems={setParents} setPage={setPage} placeholder="Enter first or last name of user..."/>

              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                {loading || loading2 ? (
                  <Loader />
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
                      {contactList.length > 0 ? (
                        contactList.map((item, index) => (
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

              <Pagination currentPage={page} totalPages={meta.length} onPageChange={handlePagination}/>
            </div>
          </div>
        </div>
      </div> 
      
    </AppContainer>
  )
}

export default ViewParentsPage;