import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { Link} from "react-router-dom";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ajaxParent from "../../util/remote/ajaxParent";
import toast, {Toaster} from "react-hot-toast";


function ViewParents() {

  const [parentList, setParentList] = useState(false);
  const [parentSearch, setParentSearch] = useState(false);
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState("");



  const data2 = {
    search: query,
    page: page
  };

  const getParentList = async () => {
    setLoading(true)
    const server_response = await ajaxParent.listParents(page);
    setLoading(false)
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setParentList(server_response.details.list);
      setFirst(server_response.details.meta.offset_count);

    } else {
      setParentList("404");
    }
  };

  const refreshData = () =>{
    getParentList()
  }


  useEffect(() => {
    getParentList();
  }, [page]);

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

  const searchParents = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading2(true);
      const server_response = await ajaxParent.searchAllParents(data2);
      setLoading2(false);
      if (server_response.status === "OK") {
        if (server_response.details.length === 0) {
          setParentSearch([]);
        } else {
          setMeta(server_response.details.meta.list_of_pages);
          setParentSearch(server_response.details.list);
          setFirst(server_response.details.meta.offset_count);
        }
      } else {
        setParentSearch("404");
      }
  };

  const setParents = (e) => {
    e.preventDefault();
    setParentSearch(false);
    setQuery("");
  };

  useEffect(() => {
      searchParents();
  }, []);

  return(
  <AppContainer title="Parents">
    <Toaster position="top-center" reverseOrder={false} />
    <div className="row"> 
				<div className="col-lg-12">
          <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
            <div className="card-body map-card">
            <div class="heading-layout1 mg-b-25">
              <TableHeader
                title="Parents List"
                subtitle="List of all the parents sorted in ascending order"    
              />
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
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query} onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') {
                          setParents(e);
                        }
                      }}
                      placeholder="Search for parent first or last name..."
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
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th scope="col" className="wd-10p">No.</th>
                      <th scope="col">Names</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Address</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                  {parentSearch && Array.isArray(parentSearch) ? (
                      
                        parentSearch.map((item, key) => (
                          <tr key={key}>
                          <th scope='row'>{key + 1}</th>
                          <td><Link
                          to={`/parents/profile/${item.parent_id}`}>
                          {item.full_name}
                        </Link></td>
                          <td>{item.main_contact}</td>
                          <td>{item.address}</td>
                        </tr>
                        ))
                     
                    ) : Array.isArray(parentList) && parentList.map((item, key) => (
                        <tr key={key}>
                          <th scope='row'>{key + first + 1}</th>
                          <td><Link
                          to={`/parents/profile/${item.parent_id}`}>
                          {item.full_name}
                        </Link></td>
                          <td>{item.main_contact}</td>
                          <td>{item.address}</td>
                        </tr>
                      ))}
                      {parentList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No parents or guardians registered yet.
                          </td>
                        </tr>)}
                        {parentSearch.length === 0 && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No search result(s) found.
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
				</div></div> 
    
    </AppContainer>
  )
}

export default ViewParents;
