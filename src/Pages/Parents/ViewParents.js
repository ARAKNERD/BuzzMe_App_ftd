import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import ParentContext from "../../Context/ParentContext";

function ViewParents() {

  const {parentList} = useContext(ParentContext);
  const [loading,setLoading] = useState(false)

  return(
  <AppContainer title="Parents">
                
				<div className="col-lg-12">
          <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
            <div className="card-body map-card">
              <TableHeader
                title="Parents List"
                subtitle="List of all the parents sorted according to the recently added"    
              />
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
                    {Array.isArray(parentList) && parentList.length > 0 ? (
                      parentList.map((item, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{item.parent_name}</td>
                          <td>{item.main_contact}</td>
                          <td>{item.address}</td>
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
