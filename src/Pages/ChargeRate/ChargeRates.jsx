import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import ajaxChargeRate from "../../util/remote/ajaxChargeRate";
import AddChargeRate from "./AddChargeRate";
import useStateCallback from "../../util/customHooks/useStateCallback";
import UpdateChargeRate from "./UpdateChargeRate";
import {Toaster, toast} from "react-hot-toast";
import RateContext from "../../Context/RateContext";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";

function ChargeRates() {
  const {rateList, getRateList} = useContext(RateContext);

  const refreshData = () =>{
    getRateList();
  }

  const [modal, setModal] = useStateCallback(false);

  const handleUpdate=(e,item)=>{
    setModal(false, ()=>setModal(<UpdateChargeRate rateID={item.rate_id} g={getRateList} isOpen={true} rate={item.rate} type={item.type}/>))
  }

  return (
    <AppContainer title="Charge Rates">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
        <div className="col-lg-4">
          <AddChargeRate />
        </div>
        <div className="col-lg-8">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Charge Rates"
                  subtitle="List of all the charge rates"
                />
                <div class="dropdown">
                                        <a class="dropdown-toggle" href="#" role="button" 
                                        data-toggle="dropdown" aria-expanded="false">...</a>
                
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <Link class="dropdown-item" onClick={refreshData} ><i class="fas fa-redo-alt text-orange-peel"></i>Refresh</Link>
                                        </div>
                                    </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Type</th>
                      <th>Rate</th>
                      <th>Actions</th>
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
                                  onClick={(e) => handleUpdate(e,item)}>
                                   <i className="far fa-edit mr-1"></i>
                                  Edit Rate
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{textAlign: "center"}}>
                          No charge rates registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!rateList && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ChargeRates;
