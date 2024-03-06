import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import AddChargeRate from "./AddChargeRate";
import useStateCallback from "../../util/customHooks/useStateCallback";
import UpdateChargeRate from "./UpdateChargeRate";
import {Toaster, toast} from "react-hot-toast";
import RateContext from "../../Context/RateContext";

function ChargeRates() {
  const {rateList} = useContext(RateContext);

  const [Chargeupdater, setChargeupdater] = useStateCallback(false);
  const handle_modal_Updater = (id) => {
    setChargeupdater(false, () =>
      setChargeupdater(<UpdateChargeRate isOpen={true} id={id} />)
    );
  };

  return (
    <AppContainer title="List Charge Rates">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <AddChargeRate />
        </div>
        <div className="col-lg-8 col-md-8">
          <div className="card height-auto">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="item-title">
                  <h3>All charge rates</h3>
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
                  <div className="col-md-8 col-lg-8  form-group">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                    />
                  </div>
                  <div className=" col-md-3 col-lg-4 col-4 form-group">
                    <button
                      type="submit"
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
              {Chargeupdater}
              <div className="table-responsive">
                <table className="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Charge Rate</th>
                      <th>Type</th>

                      <th>operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(rateList) && rateList.length > 0 ? (
                      rateList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.type}</td>
                          <td>{item.rate}</td>

                          <td>
                            <div className="dropdown">
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false">
                                <span className="flaticon-more-button-of-three-dots"></span>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={() => handle_modal_Updater(1)}>
                                  <i className="fas fa-cogs text-dark-pastel-green"></i>
                                  Edit
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" style={{textAlign: "center"}}>
                          No charge rates registered yet.
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

export default ChargeRates;
