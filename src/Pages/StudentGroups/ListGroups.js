import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import StudentGroupContext from "../../Context/StudentGroupContext";

function ListGroups() {

  const {groupList, getGroupList} = useContext(StudentGroupContext);

  return(
  <AppContainer title="Class Groups">
                
				<div className="col-lg-12">
          <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
            <div className="card-body map-card">
            <div class="heading-layout1 mg-b-25">
              <TableHeader
                title="Class Groups List"
                subtitle="List of all the class groups sorted according to the recently added"    
              />
                           <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={getGroupList} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
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
                      
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(groupList) && groupList.length > 0 ? (
                      groupList.map((item, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{item.group_name}</td>
                        </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="2" style={{textAlign:"center"}}>No class groups registered yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!groupList && <Loader/>}
              </div>
            </div>
			    </div>
				</div>
    
    </AppContainer>
  )
}

export default ListGroups;
