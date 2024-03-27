import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import ParentContext from "../../Context/ParentContext";
import { Link, useParams } from "react-router-dom";
import UpdateParent from "./UpdateParent";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ajaxParent from "../../util/remote/ajaxParent";
import AuthContext from "../../Context/AuthContext";

function ViewParents() {

  const [parentList, setParentList] = useState("");
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useStateCallback(false);
  const {id} = useParams();


  const getParentList = async () => {
    setLoading(true)
    const server_response = await ajaxParent.fetchParentList();
    setLoading(false)
    if (server_response.status === "OK") {
      setParentList(server_response.details);
    } else {
      setParentList("404");
    }
  };

  const refreshData = () =>{
    getParentList()
  }


  useEffect(() => {
    getParentList();
  }, []);

  const handleModal=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateParent parentID={item.parent?.parent_id} parentName={item.parent?.parent_name} nin={item.parent?.nin} address={item.parent?.address} mainContact={item.parent?.main_contact} alternativeContact={item.parent?.alternative_contact} g={getParentList} isOpen={true}/>))
  }

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

  return(
  <AppContainer title="Parents">
          {modal}      
				<div className="col-lg-12">
          <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
            <div className="card-body map-card">
            <div class="heading-layout1 mg-b-25">
              <TableHeader
                title="Parents List"
                subtitle="List of all the parents sorted according to the recently added"    
              />
                           <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                                        </div>
                                    </div>
                        </div>
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th scope="col" className="wd-10p">No.</th>
                      <th scope="col">Names</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Address</th>
                      <th scope="col">Actions</th>
                      
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(parentList) && parentList.length > 0 ? (
                      parentList.map((item, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td><Link
                          to={`/parents/profile/${item.parent_id}`}>
                          {item.parent_name}
                        </Link></td>
                          <td>{item.main_contact}</td>
                          <td>{item.address}</td>
                          <td><div class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <span class="flaticon-more-button-of-three-dots"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <Link class="dropdown-item" onClick={(e)=>handleModal(e,item)}><i
                                                            class="fas fa-cogs text-dark-pastel-green"></i>Update Details</Link>
                                                </div>
                                            </div></td>
                        </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="4" style={{textAlign:"center"}}>No parents registered yet.</td>
                      </tr>
                    )}
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
    
    </AppContainer>
  )
}

export default ViewParents;
