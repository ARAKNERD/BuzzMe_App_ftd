import React, { useContext, useEffect} from "react";
import AppContainer from "../../../Components/Structure/AppContainer";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TableHeader from "../../../Components/Common/TableHeader";
import Loader from "../../../Components/Common/Loader";
import useStateCallback from "../../../util/customHooks/useStateCallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import AddWorkingHours from "../../../Components/CallingStation/AddWorkingHours";
import UpdateTimeRangeHours from "../../../Components/CallingStation/UpdateTimeRangeHours";
import TurnOnStation from "../../../Components/CallingStation/TurnOnStation";
import TurnOffStation from "../../../Components/CallingStation/TurnOffStation";
import StationContext from "../../../Context/StationContext";
import SearchForm from "../../../Components/Common/SearchForm";
import Pagination from "../../../Components/Common/Pagination";

function SchoolStationsPage() {

  const [modal, setModal] = useStateCallback(false);
  const {schoolID, stationList, meta, page, query, loading, loading2, setQuery, setPage, stationTimeRanges, getSchoolStations, searchSchoolStations } = useContext(StationContext);
  
  useEffect(() => {
    if (query) {
      searchSchoolStations();
    } else {
      getSchoolStations(page);
    }
  }, [schoolID, page]);
  
  const setStations = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getSchoolStations(1);
  };

  const addHours = (e, item) => {
    setModal(false, () =>setModal(<AddWorkingHours stationID={item.station_id} g={getSchoolStations} page={page} isOpen={true}/>));
  };

  const handleUpdateHours = (e, timeRange) => {
    setModal(false, () => setModal(<UpdateTimeRangeHours timeID={timeRange.time_id} g={getSchoolStations} page={page} startTime={timeRange.start_time} endTime={timeRange.end_time} isOpen={true}/>));
  };

  const stationOn = (e, item) => {
    setModal(false, () => setModal(<TurnOnStation stationID={item.station_id} g={getSchoolStations} page={page} isOpen={true}/>));
  };

  const stationOff = (e, item) => {
    setModal(false, () => setModal(<TurnOffStation stationID={item.station_id} g={getSchoolStations} page={page} isOpen={true}/>));
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  const refreshData = () => {
    getSchoolStations(1);
  };

  return (
    <AppContainer title="Calling Stations">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">

      <div className="col-lg-12">
          <div className="card custom-card">
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Calling Stations"
                  subtitle="List of all the calling stations"
                />
                <div class="dropdown">
                  <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                    ...
                  </a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <Link class="dropdown-item" onClick={refreshData}>
                      <i class="fas fa-redo-alt text-orange-peel"></i>Refresh
                    </Link>
                  </div>
                </div>
              </div>

              <SearchForm searchTerm={query} setSearchTerm={setQuery} searchItems={searchSchoolStations} setItems={setStations} setPage={setPage} placeholder="Enter station code or name of station..."/>

              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                {loading || loading2 ? (
                  <Loader /> 
                ) : (
                  <table className="table display data-table text-nowrap">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Station Name</th>
                        <th>Station Code</th>
                        <th>Active Hours</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stationList.length > 0 ? (
                        stationList.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.station_name}</td>
                            <td>{item.station_code}</td>
                            <td>
                              {stationTimeRanges[item.station_id] && stationTimeRanges[item.station_id].length > 0 ? (
                                <ul>
                                  {stationTimeRanges[item.station_id].map((timeRange, idx) => (
                                    <li key={idx}>
                                      {timeRange.start_time} - {timeRange.end_time}
                                      <span className="ml-2 text-secondary cursor-pointer" onClick={(e) => handleUpdateHours(e, timeRange)}>
                                        <i className="fa fa-pencil-alt"></i>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                "No working hours set"
                              )}
                            </td>
                            <td>
                              {item.status === "300" ? (
                                <span class="badge badge-success">Active</span>
                              ) : item.status === "200" ? (
                                <span class="badge badge-warning">Inactive</span>
                              ) : (
                                <span class="badge badge-danger">Off</span>
                              )}
                            </td>
                            <td>
                              <div className="dropdown">
                                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                  <span className="flaticon-more-button-of-three-dots"></span>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link className="dropdown-item" to="#" onClick={(e) => addHours(e, item)}>
                                    <FontAwesomeIcon icon={faClock} style={{color: "green", marginRight: "3px"}}/>
                                    Change Active Hours
                                  </Link>
                                  {item.status === "300" ? (
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      onClick={(e) => stationOff(e, item)}
                                    >
                                      <i
                                        className="fa fa-power-off mr-1"
                                        style={{ color: "red" }}
                                      ></i>
                                      Turn Off
                                    </Link>
                                  ) : (
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      onClick={(e) => stationOn(e, item)}
                                    >
                                      <i
                                        className="fa fa-power-off mr-1"
                                        style={{ color: "green" }}
                                      ></i>
                                      Turn On
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center" }}>
                            No stations / calling booths attached to this school yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <Pagination currentPage={page} totalPages={meta.length} onPageChange={handlePagination}/>

                
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default SchoolStationsPage;
