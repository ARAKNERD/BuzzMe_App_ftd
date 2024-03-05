import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import AddChargeRate from "./AddChargeRate";
import useStateCallback from "../../util/customHooks/useStateCallback";
import UpdateChargeRate from "./UpdateChargeRate";

function ChargeRates() {
  const [rateList, setRateListing] = useState(false);

  const listChargeRates = async () => {
    const server_response = await ajaxChargeRate.fetchChargeRateList();
    if (server_response.status === "OK") {
      setRateListing(false);
    }
  };

  useEffect(() => {
    listChargeRates();
  }, []);

  const [Chargeupdater, setChargeupdater] = useStateCallback(false);
  const handle_modal_Updater = (id) => {
    setChargeupdater(false, () =>
      setChargeupdater(<UpdateChargeRate isOpen={true} id={id} />)
    );
  };

  return (
    <AppContainer title="List Charge Rates">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <AddChargeRate />
        </div>
        <div className="col-lg-12 col-md-12">
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

                  <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to="#">
                      <i className="fas fa-times text-orange-red"></i>Close
                    </Link>
                    <Link className="dropdown-item" to="/contacts/add">
                      <i className="fas fa-cogs text-dark-pastel-green"></i>Add
                      New Contact
                    </Link>
                    <Link className="dropdown-item" to="#">
                      <i className="fas fa-redo-alt text-orange-peel"></i>
                      Refresh
                    </Link>
                  </div>
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
              {Chargeupdater}
              <div className="table-responsive">
                <table className="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input checkAll"
                          />
                          <label className="form-check-label">ID</label>
                        </div>
                      </th>
                      <th>Charge Rate</th>
                      <th>Type</th>

                      <th>operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">#0021</label>
                        </div>
                      </td>
                      <td>Male</td>
                      <td>Businessman</td>

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
                            <Link className="dropdown-item" to="#">
                              <i className="fas fa-times text-orange-red"></i>
                              Close
                            </Link>
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

                    <tr>
                      <td>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label">#0021</label>
                        </div>
                      </td>
                      <td className="text-center">
                        <img src="img/figure/student2.png" alt="school" />
                      </td>
                      <td>Mark Willy</td>

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
                            <Link className="dropdown-item" to="#">
                              <i className="fas fa-times text-orange-red"></i>
                              Close
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="#"
                              onClick={() => handle_modal_Updater(2)}>
                              <i className="fas fa-cogs text-dark-pastel-green"></i>
                              Edit
                            </Link>
                          </div>
                        </div>
                      </td>
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

export default ChargeRates;
