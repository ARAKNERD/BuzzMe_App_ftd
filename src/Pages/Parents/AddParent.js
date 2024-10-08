import React, {useContext, useEffect, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import ajaxParent from "../../util/remote/ajaxParent";
import AppContainer from "../../Components/Structure/AppContainer";
import Loader from "../../Components/Common/Loader";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import TableHeader from "../../Components/Common/TableHeader";
import { RenderSecure } from "../../util/script/RenderSecure";

function AddParent() {
  const [nin, setNin] = useState("");
  const [searchedContact, setSearchedContact] = useState("");
  const [ninSearch, setNinSearch] = useState(null);
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [mainContact, setMainContact] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const {userId} = useContext(AuthContext);
  const [recentGuardians, setRecentGuardians] = useState(false);




  const handleAdd = async (e) => {
    e.preventDefault();

    if (firstName.length > 0 && nin.length > 0) {
      var data = {
        nin: nin,
        main_contact: mainContact,
        first_name: firstName,
        last_name: lastName,
        address: address,
        gender: gender
      };
      setLoading2(true)
      const server_response = await ajaxParent.createParent(data);
      setLoading2(false)
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        resetForm();
        getRecentGuardians();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Please fill in the required fields");
    }
  };


  const searchNin =async(e)=>{
    e.preventDefault();  
    if (searchedContact.length > 0) {
    var data = {
      query: searchedContact
    };
    setLoading(true)
    const server_response = await ajaxParent.searchNIN(data);
    setLoading(false)
    if(server_response.status==="OK"){
        //store results
        setNinSearch(server_response.details);
        
    }else{
        toast.error(server_response.message);
        setNinSearch(false);
        setMainContact(searchedContact);
    }
} else {
    toast.error("Please enter a National Identification Number!");
  }
}

const getRecentGuardians =async()=>{

  const server_response = await ajaxParent.fetchTodayGuardians();
  if(server_response.status==="OK"){
     //store results
     setRecentGuardians(server_response.details);
  }else{
     //communicate error
     setRecentGuardians("404");
  }
}

useEffect(()=>{
  getRecentGuardians();
}, [])

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setMainContact("");
    setNin("");
    setAddress("");
  };

  return (
    <AppContainer title="Register Contact">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12">
        <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Contact check</h5>
                <p style={{color:"#042954"}}><small>Check whether contact is already registered in the system.</small></p>
         
              </div>

              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={searchedContact}
                      onChange={(e) => setSearchedContact(e.target.value)}
                      placeholder="Enter the phone number of contact..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchNin(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
         
        </div>
        <div className="col-lg-12 col-md-12">
        {ninSearch ===false && (
            <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Register New Contact</h5>
            <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>

              </div>

              <form onSubmit={(e) => handleAdd(e)} method="post">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>First Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={firstName}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter first name of contact.."
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Last Name <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={lastName}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter last name of contact.."
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Main Phone Number <span style={{color:"red"}}>*</span> </label>
                    <input
                      type="text"
                      value={mainContact}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter main number of contact.."
                      onChange={(e) => setMainContact(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>NIN <span style={{color:"red"}}>*</span> </label>
                    <input
                      type="text"
                      value={nin}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter NIN of contact.."
                      onChange={(e) => setNin(e.target.value)}
                      className="form-control"
                    />
                  </div>
                 
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Gender <span style={{color:"red"}}>*</span></label>

                    <select
                      className="col-12 form-control"
                      value={gender}
                      style={{border: "1px solid grey"}}
                      onChange={(e) => setGender(e.target.value)}>
                      <option value={true}>Select..</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Address <span style={{color:"red"}}>*</span> </label>
                    <input
                      type="text"
                      value={address}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter address of contact.."
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 form-group mg-t-8">
                {loading2 && (<button type="submit" style={{float: "right"}} className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Saving...</button>)}
                {!loading2 && (<button
                    style={{float: "right"}}
                    type="submit"
                    className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                    Save Contact Details
                  </button>)}
                </div>
              </form>
            </div>
          </div>
         
          )}
      {ninSearch && ( // Show the parent info if ninSearch is true
      
        <div className="box left-dot mb-30" style={{ marginBottom: "30px", backgroundColor: "white", padding: "25px", boxShadow: "10px", borderRadius: "10px" }}>
          <div className="box-header  border-0 pd-0">
            <div className="box-title fs-20 font-w600">Contact Information</div>
          </div>
          <div className="box-body pt-20 user-profile">
            <div className="table-responsive">
              <table className="table mb-0 mw-100 color-span">
                {ninSearch && (
                  <tbody>
                    <tr>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="w-50">Names </span>{" "}
                      </td>
                      <td>:</td>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="">{ninSearch.first_name} {ninSearch.last_name}</span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="w-50">Main Contact</span>{" "}
                      </td>
                      <td>:</td>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="">{ninSearch.main_contact}</span>{" "}
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="w-50">NIN</span>{" "}
                      </td>
                      <td>:</td>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="">{ninSearch.nin}</span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="w-50">Address</span>{" "}
                      </td>
                      <td>:</td>
                      <td className="py-2 px-0">
                        {" "}
                        <span className="">{ninSearch.address}</span>{" "}
                      </td>
                    </tr>
                    <Link
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                      style={{float:"right"}}
                      to={`../parents/profile/${ninSearch.parent_id}`}>
                      View Profile
                </Link>
                  </tbody>
                 
                )}
              </table>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader/>}
        </div>
        <RenderSecure code="ADMIN-VIEW">
        <div className="col-lg-12 col-md-12">
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
            <TableHeader
                    title="Contacts Registered Today"
                    subtitle="List of the contacts registered today"
                  />
            </div>
  
            <div className="table-responsive">
              <table className="table display data-table text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Contact Names</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(recentGuardians) && recentGuardians.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td><Link
                          to={`/parents/profile/${item.parent_id}`}>
                          {item.full_name}
                        </Link></td>
                            <td>{item.main_contact}</td>
                            <td>{item.address}</td>
                          </tr>
                        ))}
                        {recentGuardians === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No contacts registered yet.
                          </td>
                        </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div></RenderSecure>
      </div>
    </AppContainer>
  );
}

export default AddParent;
