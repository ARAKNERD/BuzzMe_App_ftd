import React, {useContext, useEffect, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import ajaxParent from "../../util/remote/ajaxParent";
import AppContainer from "../../Components/Structure/AppContainer";
import AuthContext from "../../Context/AuthContext";
import Loader from "../../Components/Common/Loader";
import TableHeader from "../../Components/Common/TableHeader";
import { Link } from "react-router-dom";

function AddParent() {
  const [nin, setNin] = useState("");
  const [searchedNin, setSearchedNin] = useState("");
  const [ninSearch, setNinSearch] = useState(null);
  const [address, setAddress] = useState("");
  const [alternativeContact, setAlternativeContact] = useState("");
  const [mainContact, setMainContact] = useState("");
  const [names, setNames] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (names.length > 0 && nin.length > 0) {
      var data = {
        nin: nin,
        main_contact: mainContact,
        parent_name: names,
        alternative_contact: alternativeContact,
        address: address
      };

      const server_response = await ajaxParent.createParent(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Please fill in the required fields");
    }
  };


  const searchNin =async(e)=>{
    e.preventDefault();  
    if (searchedNin.length > 0) {
    var data = {
      query: searchedNin
    };
    const server_response = await ajaxParent.searchNIN(data);
    console.log(server_response)
    if(server_response.status==="OK"){
        //store results
        setNinSearch(server_response.details);

    }else{
        toast.error(server_response.message);
        setNinSearch(false);
        setSearchedNin("")
    }
} else {
    toast.error("Please enter a National Identification Number!");
  }
}

  const resetForm = () => {
    setNames("");
    setAlternativeContact("");
    setMainContact("");
    setNin("");
    setAddress("");
  };

  return (
    <AppContainer title="Register Parent / Guardian">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12">
        <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Parent / Guardian check</h5>
                <p><small>Check whether parent or guardian is already registered in the system.<br/>When checking with a contact, please start with 256....</small></p>
         
              </div>

              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={searchedNin}
                      onChange={(e) => setSearchedNin(e.target.value)}
                      placeholder="Enter the NIN or contact of parent / guardian..."
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
        {ninSearch ===false && ( // Only show the search form if ninSearch is false
            <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Register New Parent / Guardian</h5>
            <p><small><i>Note: All fields marked <span style={{color:"red"}}>*</span> are required.</i></small></p>

              </div>

              <form onSubmit={(e) => handleAdd(e)} method="post">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Parent / Guardian Names <span style={{color:"red"}}>*</span></label>
                    <input
                      type="text"
                      value={names}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter name of parent or guardian.."
                      onChange={(e) => setNames(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Main Contact <span style={{color:"red"}}>*</span> </label>
                    <input
                      type="text"
                      value={mainContact}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter main contact of parent or guardian.."
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
                      placeholder="Enter NIN of parent or guardian.."
                      onChange={(e) => setNin(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Alternative Contact </label>
                    <input
                      type="text"
                      value={alternativeContact}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter alternative contact of parent or guardian.."
                      onChange={(e) => setAlternativeContact(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 form-group border-1">
                    <label>Address <span style={{color:"red"}}>*</span> </label>
                    <input
                      type="text"
                      value={address}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter address of parent or guardian.."
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-12 form-group mg-t-8">
                  <button
                    style={{float: "right"}}
                    type="submit"
                    className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                    Save Parent Details
                  </button>
                </div>
              </form>
            </div>
          </div>
          )}
      {ninSearch && ( // Show the parent info if ninSearch is true
      
        <div className="box left-dot mb-30" style={{ marginBottom: "30px", backgroundColor: "white", padding: "25px", boxShadow: "10px", borderRadius: "10px" }}>
          <div className="box-header  border-0 pd-0">
            <div className="box-title fs-20 font-w600">Parent Information</div>
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
                        <span className="">{ninSearch.parent_name}</span>{" "}
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
        </div>
        
      </div>
    </AppContainer>
  );
}

export default AddParent;
