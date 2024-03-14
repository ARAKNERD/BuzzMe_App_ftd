import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Link} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import ajaxStation from "../../util/remote/ajaxStation";
import AddStation from "./AddStation";
import StationContext from "../../Context/StationContext";
import useStateCallback from "../../util/customHooks/useStateCallback";
import DeActivateStation from "./DeActivateStation";
import ActivateStation from "./ActivateStation";
import { RenderSecure } from "../../util/script/RenderSecure";
import AuthContext from "../../Context/AuthContext";

function ListStations() {
    const [stationList, setStationList] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const getStations = async () => {
      setLoading(true);
      const server_response = await ajaxStation.fetchStationList(user.school_user?user.school_user?.school.school_id:"");
      setLoading(false);
      if (server_response.status === "OK") {
        setStationList(server_response.details);
      }
    };
  
    useEffect(() => {
      getStations();
    }, [user.school_user?user.school_user?.school?.school_id:""]);




  const deActivateStation=(e,item)=>{
    setModal(false, ()=>setModal(<DeActivateStation stationID={item.station_id} g={getStations} isOpen={true}/>))
  }

  const activateStation=(e,item)=>{
    setModal(false, ()=>setModal(<ActivateStation stationID={item.station_id} g={getStations} isOpen={true}/>))
  }

  const refreshData = () =>{
    getStations();
  }

    return (
    <AppContainer title="Calling Stations">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
      <RenderSecure code="ADMIN-VIEW">
        <div className="col-lg-4">
          <AddStation />
        </div>
        </RenderSecure>

        <div className={user.school_user ? "col-lg-12" : "col-lg-8"}>
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Calling Stations"
                  subtitle="List of all the calling stations"
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
                      <th>Station Name</th>
                      <th>Station Code</th>
                      {user.school_user?"":<th>School</th>}
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(stationList) && stationList.length > 0 ? (
                      stationList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.station_name}</td>
                          <td>{item.station_code}</td>
                          {user.school_user?"":<td>{item.school?.school_name}</td>}
                          <td>{item.status==="1"?<span class="badge badge-success">Active</span>:<span class="badge badge-danger">Offline</span>}</td>

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
                                {item.status==="1"?<Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => deActivateStation(e,item)}>
                                  <i className="fas fa-close text-orange-red"></i>
                                  De-Activate Station
                                </Link>:
                                <Link
                                className="dropdown-item"
                                to="#"
                                onClick={(e) => activateStation(e,item)}>
                                <i className="fas fa-check-circle text-dark-pastel-green"></i>
                                Activate Station
                              </Link>
}</div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{textAlign: "center"}}>
                          No calling stations registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListStations;
