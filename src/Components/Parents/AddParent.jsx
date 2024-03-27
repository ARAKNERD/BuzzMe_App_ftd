import React, {useContext, useEffect, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import StudentContext from "../../Context/StudentContext";
import ajaxStudent from "../../util/remote/ajaxStudent";
import Select from "react-select";
import {Link} from "react-router-dom";
import ajaxParent from "../../util/remote/ajaxParent";

function AddParent() {
  const [nin, setNin] = useState("");
  const [ninSearch, setNinSearch] = useState(false);
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
        names: names,
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

  const searchNin =async()=>{
        
 
    var data = {
      nin: nin
    };
    const server_response = await ajaxParent.searchNIN(data);
    if(server_response.status==="OK"){
        //store results
        setNinSearch(server_response.details);
    }else{
        //communicate error
        setNinSearch("404");
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
    <AppContainer title="Students">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <div className="col-lg-12 col-md-12">
        <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Parent NIN check</h5>
                <p><small><i>Check whether parent or guardian is already registered in the system.</i></small></p>

              </div>

              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={nin}
                      onChange={(e) => setNin(e.target.value)}
                      placeholder="Enter NIN of parent / guardian..."
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
          <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h5 style={{marginBottom:0}} className="card-title">Register New Parent</h5>
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
                    <label>Main Contact </label>
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
                    <label>Address </label>
                    <input
                      type="text"
                      value={address}
                      style={{border: "1px solid grey"}}
                      placeholder="Enter alternative contact of parent or guardian.."
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
        </div>
      </div>
    </AppContainer>
  );
}

export default AddParent;
