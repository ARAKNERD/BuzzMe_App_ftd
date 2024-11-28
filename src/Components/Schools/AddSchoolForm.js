import React, {useState, useContext} from "react";
import SchoolContext from "../../Context/SchoolContext";
import ajaxSchool from "../../util/remote/ajaxSchool";
import DistrictContext from "../../Context/DistrictContext";
import {toast} from "react-hot-toast";
import Select from "react-select";

function AddSchoolForm() {
    const {getRecentSchools} = useContext(SchoolContext);
    const {districtList} = useContext(DistrictContext);
    const [loading, setLoading] = useState(false)
    const [contact, setContact] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [district, setDistrict] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
    
        const data = {
          school_name: schoolName,
          contact: contact,
          email: email,
          address: address,
          district: district
        };
    
        if (schoolName.length > 0 || contact.length > 0) {
          setLoading(true)
          const server_response = await ajaxSchool.createSchool(data);
          setLoading(false)
          if (server_response.status === "OK") {
            toast.success(server_response.message);
            getRecentSchools();
            resetForm();
          } else {
            toast.error(server_response.message);
          }
        } else {
          toast.error("Complete all fields and try again");
        }
      };
    
      const resetForm = () => {
        setSchoolName("");
        setContact("");
        setEmail("");
        setAddress("");
      };

    return (
        <div className="card height-auto">
            <div className="card-body">
            <div className="heading-layout1">
                <div className="item-title">
                <h5 style={{marginBottom:0}}>Add New School</h5>
                <p><small><i>Note: All fields in the form marked <span style={{color:"red"}}>*</span> are required.</i></small></p>
                </div>
            </div>
            <form
                onSubmit={(e) => handleAdd(e)}
                method="post"
                className="new-added-form">
                <div className="row">
                <div className="col-lg-6 col-md-6  col-12 form-group">
                    <label htmlFor="">School Name <span style={{color:"red"}}>*</span></label>
                    <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="form-control"
                    placeholder="Enter name of school.."
                    />
                </div>
                <div className="col-lg-6 col-md-6  col-12 form-group">
                    <label htmlFor="">Contact <span style={{color:"red"}}>*</span></label>
                    <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="form-control"
                    placeholder="Enter telephone contact of school.."
                    />
                </div>
                <div className="col-lg-6 col-md-6  col-12 form-group">
                    <label htmlFor="">E-mail Address <span style={{color:"red"}}>*</span></label>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter email address of school.."
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-12 form-group">
                    <label htmlFor="">Location / Physical Address <span style={{color:"red"}}>*</span></label>
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter address of school.."
                    />
                </div>
                <div className="col-lg-6 col-md-6  col-12 form-group">
                    <label htmlFor="">District <span style={{color:"red"}}>*</span></label>
                    <Select
                    onChange={(e) => setDistrict(e.district_id)}
                    getOptionLabel={(option) => option.district_name}
                    getOptionValue={(option) => option.district_id}
                    isSearchable
                    options={Array.isArray(districtList) ? districtList : []}
                    value={
                        Array.isArray(districtList) &&
                        districtList.find((value) => value.district_id === district)
                    }
                    />
                </div>
                </div>
                <div className="mb-4">
                {loading && (<button type="submit" style={{float: "right"}} className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Registering...</button>)}
                {!loading && <button
                    type="submit"
                    style={{float: "right"}}
                    className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                >Register School</button>}
                </div>
            </form>
            </div>
        </div>
        
    );
}

export default AddSchoolForm;
