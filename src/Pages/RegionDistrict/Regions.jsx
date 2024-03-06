import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";

import useStateCallback from "../../util/customHooks/useStateCallback";

import RegionContext from "../../Context/RegionContext";
import AddRegion from "../../Components/DistrictRegion/AddRegion";
function Regions() {
  const {regionList} = useContext(RegionContext);
  // console.log(regionList);

  return (
    <AppContainer title="Regions control page ">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <AddRegion />
        </div>
        <div className="col-lg-8 col-md-8">
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
