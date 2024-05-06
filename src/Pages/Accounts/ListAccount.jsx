import React, {useContext} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import AddAccount from "./AddAccount";
import WalletAccountContext from "../../Context/WalletAccountContext";
import Loader from "../../Components/Common/Loader";
import TableHeader from "../../Components/Common/TableHeader";

function ListAccount() {
  const {accountList} = useContext(WalletAccountContext);

  return (
    <AppContainer title={"Wallet Accounts "}>
      <div className="row">
        <div className="col-lg-4">
          <AddAccount />
        </div>
        <div className="col-lg-8">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Wallet Accounts"
                  subtitle="List of all the wallet accounts"
                />
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    ...
                  </a>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Account Code</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(accountList) && accountList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.account_code}</td>
                          <td>{item.description}</td>

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
                                  <i className="fas fa-cogs text-dark-pastel-green"></i>
                                  Edit
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {accountList === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No wallet accounts registered yet.
                          </td>
                        </tr>)}
                  </tbody>
                </table>
                {!accountList && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListAccount;
