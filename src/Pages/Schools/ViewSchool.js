import React, { useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Link } from "react-router-dom";
import ajaxSchool from "../../util/remote/ajaxSchool";

function ViewSchool() {

    const [schoolList,setSchoolListing] = useState(false)


    const listSchools = async() =>{
        const server_response = await ajaxSchool.fetchSchoolList();
        if(server_response.status==="OK"){
            setSchoolListing(server_response.details)
        }
    }

    useEffect(() => {
        listSchools()
    }, [])
    


  return( 

    <AppContainer title={"Schools"}>
 <div className="card height-auto">
                    <div className="card-body">
                        <div className="heading-layout1">
                            <div className="item-title">
                                <h3>All Schools</h3>
                            </div>
                            <div className="dropdown">
                                <Link className="dropdown-toggle" to="#" role="button" data-toggle="dropdown"
                                    aria-expanded="false">...</Link>

                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to="#"><i
                                            className="fas fa-times text-orange-red"></i>Close</Link>
                                    <Link className="dropdown-item" to="/schools/add"><i
                                            className="fas fa-cogs text-dark-pastel-green"></i>Add New School</Link>
                                    <Link className="dropdown-item" to="#"><i
                                            className="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                                </div>
                            </div>
                        </div>
                        <form className="mg-b-20">
                            <div className="row gutters-8">
                               
                                <div className="col-11-xxxl col-xl-9 col-lg-9 col-9 form-group">
                                    <input type="text" placeholder="Search..." className="form-control"/>
                                </div>
                                <div className="col-1-xxxl col-xl-3 col-lg-3 col-3 form-group">
                                    <button type="submit" className="fw-btn-fill btn-gradient-yellow">SEARCH</button>
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
                                        <th>Address</th>
                                        <th>District</th>
                                        <th>Region</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(schoolList) && schoolList.length > 0 ? (
                      schoolList.map((item, key) => (
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{item.school_name}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.district?.district_name}</td>
                                        <td>{item.region?.region_name}</td>
                                        <td>
                                            <div className="dropdown">
                                                <Link to="#" className="dropdown-toggle" data-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <span className="flaticon-more-button-of-three-dots"></span>
                                                </Link>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <Link className="dropdown-item" to="/schools/edit"><i
                                                            className="fas fa-cogs text-dark-pastel-green"></i>Edit</Link>
                                                   
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                    ): (
                                      <tr>
                                        <td colSpan="7" style={{textAlign:"center"}}>No schools registered yet.</td>
                                      </tr>
                                    )}
                                   
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    </AppContainer>
  
  )
}

export default ViewSchool;
