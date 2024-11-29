import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../../../Components/Structure/AppContainer";
import TableHeader from "../../../Components/Common/TableHeader";
import Loader from "../../../Components/Common/Loader";
import { Link} from "react-router-dom";
import ContactContext from "../../../Context/ContactContext";
import SearchForm from "../../../Components/Common/SearchForm";
import Pagination from "../../../Components/Common/Pagination";

function DeletedUsersPage() {

  const {deletedContactList, getDeletedContactList, searchDeletedContacts, deletedLoading, deletedLoading2, deletedMeta, deletedFirst, deletedQuery, deletedPage, setDeletedQuery, setDeletedPage } = useContext(ContactContext);

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= deletedMeta.length) {
      setDeletedPage(newPage);
    }
  };

  useEffect(() => {
    if (deletedQuery) {
      searchDeletedContacts();
    } else {
      getDeletedContactList(deletedPage);
    }
  }, [deletedPage]);

  const refreshData = () =>{
    getDeletedContactList(1)
  }

  const setParents = (e) => {
    e.preventDefault();
    setDeletedQuery("");
    setDeletedPage(1);
    getDeletedContactList(1);
  };

  return(
    <AppContainer title="Deleted Contacts">
    
      <div className="row"> 
        <div className="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Deleted Contacts List"
                  subtitle="List of all the deleted contacts sorted in ascending order"
                />
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
                  <div class="dropdown-menu dropdown-menu-right">
                      <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                  </div>
                </div>
              </div>

              <SearchForm searchTerm={deletedQuery} setSearchTerm={setDeletedQuery} searchItems={searchDeletedContacts} setItems={setParents} setPage={setDeletedPage} placeholder="Enter first or last name of deleted user..."/>

              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                {deletedLoading || deletedLoading2 ? (
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
                      </tr>
                    </thead>
                    <tbody>
                      {deletedContactList.length > 0 ? (
                        deletedContactList.map((item, index) => (
                          <tr key={index}>
                            <th scope='row' style={{width:"5px"}}>{index + deletedFirst + 1}</th>
                                <td><Link
                                to={`/parents/profile/${item.parent_id}/${item.user_id}`}>
                                {item.full_name}
                              </Link></td>
                                <td>{item.username}</td>
                                <td>{item.gender}</td>
                                <td>{item.address}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            No deleted accounts yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <Pagination currentPage={deletedPage} totalPages={deletedMeta.length} onPageChange={handlePagination}/>
            </div>
          </div>
        </div>
      </div> 
      
    </AppContainer>
  )
}

export default DeletedUsersPage;