import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import ParentContext from "../../Context/ParentContext";
import { Link } from "react-router-dom";
import UpdateParent from "./UpdateParent";
import useStateCallback from "../../util/customHooks/useStateCallback";

function ViewParents() {

  const {parentList, getParentList} = useContext(ParentContext);
  const [loading,setLoading] = useState(false)
  const [modal, setModal] = useStateCallback(false);

  const handleModal=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateParent parentID={item.parent_id} parentName={item.parent_name} nin={item.nin} address={item.address} mainContact={item.main_contact} alternativeContact={item.alternative_contact} username={item.username} g={getParentList} isOpen={true}/>))
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
                                            <Link class="dropdown-item" onClick={getParentList} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
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
                          <td>{item.parent_name}</td>
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
