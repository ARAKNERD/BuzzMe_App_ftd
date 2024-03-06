import React, {useContext, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxSchool from "../../util/remote/ajaxSchool";
import SchoolContext from "../../Context/SchoolContext";
import RegionContext from "../../Context/RegionContext";
import AdminContext from "../../Context/AdminContext";
import Select from "react-select";
import {Toaster, toast} from "react-hot-toast";
import ajaxDistrict from "../../util/remote/ajaxDistrict";
import DistrictContext from "../../Context/DistrictContext";
import functions from "../../util/functions";

function AddSchool() {
  // gets the current date
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // getting the user logged in as is the one who is creating the sschool

  const user = functions.sessionGuard();

  const {getSchoolList} = useContext(SchoolContext);
  const {regionList} = useContext(RegionContext);
  const {adminList} = useContext(AdminContext);
  const {districtList} = useContext(DistrictContext);

  const [contact, setContact] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [dateRegistered, setDateRegistered] = useState(getCurrentDate());
  // console.log(dateRegistered);
  const handleAdd = async (e) => {
    e.preventDefault();

    const data = {
      school_name: schoolName,
      contact: contact,
      email: email,
      address: address,
      district: district,
      region: region,
      date_registered: dateRegistered,
      registered_by: user,
    };

    if (schoolName.length > 0 || contact.length > 0) {
      const server_response = await ajaxSchool.createSchool(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getSchoolList();
        resetForm();
      } else {
        toast.error(server_response.message);
        // toast.error(server_response.details.message);
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
              <h3>Add New School</h3>
            </div>
          </div>
          <form
            onSubmit={(e) => handleAdd(e)}
            method="post"
            className="new-added-form">
            <div className="row">
              <div className="col-lg-6 col-md-6  col-12 form-group">
                <label htmlFor="">School Name</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="form-control"
                  placeholder="school name"
                />
              </div>
              <div className="col-lg-6 col-md-6  col-12 form-group">
                <label htmlFor="">Contact</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="form-control"
                  placeholder=" telephone number"
                />
              </div>
              <div className="col-lg-6 col-md-6  col-12 form-group">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="school email"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12 form-group">
                <label htmlFor="">Location</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="school location"
                />
              </div>
              {/* Region select */}
              <div className="col-lg-6 col-md-6 col-12 form-group">
                <label htmlFor="">Region</label>
                <Select
                  onChange={(e) => setRegion(e.region_id)}
                  getOptionLabel={(option) => option.region_name}
                  getOptionValue={(option) => option.region_id}
                  isSearchable
                  options={Array.isArray(regionList) ? regionList : []}
                  value={
                    Array.isArray(regionList) &&
                    regionList.find((value) => value.region_id === region)
                  }
                />
              </div>
              {/* District select */}
              {region ? (
                <div className="col-lg-6 col-md-6  col-12 form-group">
                  <label htmlFor="">District</label>
                  <Select
                    onChange={(e) => setDistrict(e.district_id)}
                    getOptionLabel={(option) => option.district_name}
                    getOptionValue={(option) => option.district_id}
                    isSearchable
                    options={
                      Array.isArray(districtList)
                        ? districtList.filter(
                            (district) => district.region.region_id === region
                          )
                        : []
                    }
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col-lg-6 col-md-6 col-12 form-group">
                <label htmlFor="">Date Registered</label>
                <input
                  type="date"
                  value={dateRegistered || getCurrentDate()}
                  // value={dateRegistered}
                  onChange={(e) => setDateRegistered(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="mb-4">
              <input
                type="submit"
                style={{float: "right"}}
                className="btn-fill-md text-light bg-dark-pastel-green"
                value="Save School Details"
              />
            </div>
          </form>
        </div>
      </div>
    </AppContainer>
  );
}

export default AddSchool;
