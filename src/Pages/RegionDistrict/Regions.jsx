import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import AddDistrict from "../../Components/DistrictRegion/AddDistrict";
import useStateCallback from "../../util/customHooks/useStateCallback";
import DistrictContext from "../../Context/DistrictContext";
function Regions() {
  const {districtList} = useContext(DistrictContext);
  const [AddDistricti, setAddDistricti] = useStateCallback(false);
  const handle_district_add = (id) => {
    setAddDistricti(false, () =>
      setAddDistricti(<AddDistrict isOpen={true} id={id} />)
    );
  };

  return (
    <AppContainer title="Regions control page ">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          {/* <AddChargeRate /> */}
          <div className="pl-20" style={{float: "right"}}>
            <button
              type="button"
              className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
              onClick={handle_district_add}>
              <i className="fa-solid fa-plus" /> Region
            </button>
          </div>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="card height-auto">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="item-title">
                  <h3>All Registeres Regions </h3>
                </div>
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle"
                    to="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    ...
                  </Link>
                </div>
              </div>
              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-11-xxxl col-xl-9 col-lg-9 col-9 form-group">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-1-xxxl col-xl-3 col-lg-3 col-3 form-group">
                    <button
                      type="submit"
                      className="fw-btn-fill btn-gradient-yellow">
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
              {AddDistricti}
              <div className="table-responsive">
                <table className="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>District Name</th>
                      <th>Region</th>

                      <th>operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1</td>
                      <td>kampala</td>
                      <td>central</td>
                    </tr>
                    <tr>
                      <td>#2</td>
                      <td>wakiso</td>
                      <td>central</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default Regions;
