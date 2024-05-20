import React, {useContext, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxSchool from "../../util/remote/ajaxSchool";
import SchoolContext from "../../Context/SchoolContext";
import Select from "react-select";
import {Toaster, toast} from "react-hot-toast";
import DistrictContext from "../../Context/DistrictContext";
import { Link } from "react-router-dom";
import TableHeader from "../../Components/Common/TableHeader";

function AddSchool() {

  const {recentSchools, getSchoolList, getRecentSchools} = useContext(SchoolContext);
  const {districtList} = useContext(DistrictContext);
  const [loading, setLoading] = useState(false)
  const [contact, setContact] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  // console.log(dateRegistered);
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
        getSchoolList();
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
    // setDateRegistered("");
  };

  return (
    <AppContainer title={"Add School"}>
      <Toaster position="top-center" reverseOrder={false} />

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
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
          <TableHeader
                  title="Recently Registered Schools"
                  subtitle="List of the schools registered today"
                />
          </div>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>School Name</th>
                  <th>Phone Number</th>
                  <th>E-mail</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(recentSchools) && recentSchools.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td><Link
                          to={`/schools/view/profile/${item.school_id}`}>
                          {item.school_name}
                        </Link></td>
                          <td>{item.contact}</td>
                          <td>{item.email}</td>
                          <td>{item.district?.district_name}</td>
                        </tr>
                      ))}
                      {recentSchools === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No schools registered today.
                          </td>
                        </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default AddSchool;
