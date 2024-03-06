import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";

import AddDistrict from "../../Components/DistrictRegion/AddDistrict";
import useStateCallback from "../../util/customHooks/useStateCallback";
import DistrictContext from "../../Context/DistrictContext";

function District() {
  const {districtList} = useContext(DistrictContext);

  return (
    <AppContainer title="Districts control page ">
      <div className="row">
        {/* <AddChargeRate /> */}
        <div className="col-lg-4 col-md-4">
          <AddDistrict />
        </div>
        <div className="col-lg-8 col-md-8">
          <div className="col-lg-12 col-md-12">
            <div className="card height-auto">
              <div className="card-body">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h3>All Registered Districts </h3>
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
                    <div className=" col-xl-9 col-lg-9 col-9 form-group">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                      />
                    </div>
                    <div className=" col-xl-3 col-lg-3 col-3 form-group">
                      <button
                        type="submit"
                        className="fw-btn-fill btn-gradient-yellow">
                        SEARCH
                      </button>
                    </div>
                  </div>
                </form>

                <div className="table-responsive">
                  <table className="table display data-table text-nowrap">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>District Name</th>
                        <th>Region</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(districtList) &&
                        districtList.map((item, key) => (
                          <>
                            <tr>
                              <td>{key + 1}</td>
                              <td>{item.district_name} </td>
                              <td>{item.region.region_name} </td>
                            </tr>
                          </>
                        ))}
                      {!Array.isArray(districtList) && (
                        <>
                          <tr>
                            <td colSpan={3} className="text-info text-center">
                              {" "}
                              No district Available in the system
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default District;
