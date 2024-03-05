import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";

import useStateCallback from "../../util/customHooks/useStateCallback";

import RegionContext from "../../Context/RegionContext";
import AddRegion from "../../Components/DistrictRegion/AddRegion";
function Regions() {
  const {regionList} = useContext(RegionContext);
  console.log(regionList);

  // handles the add region modal----------------------------------------
  const [AddReg, SetAddRegion] = useStateCallback(false);
  const handle_district_add = (id) => {
    SetAddRegion(false, () =>
      SetAddRegion(<AddRegion isOpen={true} id={id} />)
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

              {AddReg}
              <div className="table-responsive">
                <table className="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Region Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(regionList) &&
                      regionList.map((item, key) => (
                        <tr key={key}>
                          <td>#{item.region_id}</td>
                          <td>{item.region_name}</td>
                        </tr>
                      ))}
                    {!Array.isArray(regionList) && (
                      <tr>
                        <td colSpan={2} className="text-center text-info">
                          {" "}
                          no region available yet in the system
                        </td>
                      </tr>
                    )}
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
