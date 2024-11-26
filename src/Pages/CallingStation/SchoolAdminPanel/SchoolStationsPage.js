import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../../../Components/Structure/AppContainer";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TableHeader from "../../../Components/Common/TableHeader";
import Loader from "../../../Components/Common/Loader";
import useStateCallback from "../../../util/customHooks/useStateCallback";
import { RenderSecure } from "../../../util/script/RenderSecure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import UpdateStation from "../../../Components/CallingStation/UpdateStation";
import AddWorkingHours from "../../../Components/CallingStation/AddWorkingHours";
import UpdateTimeRangeHours from "../../../Components/CallingStation/UpdateTimeRangeHours";
import TurnOnStation from "../../../Components/CallingStation/TurnOnStation";
import TurnOffStation from "../../../Components/CallingStation/TurnOffStation";
import StationContext from "../../../Context/StationContext";

function SchoolStationsPage() {

  const [modal, setModal] = useStateCallback(false);
  const {schoolID, stationList, meta, page, query, loading, loading2, setQuery, setPage, stationTimeRanges, getSchoolStations, searchSchoolStations } = useContext(StationContext);

  const setStations = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getSchoolStations(1);
  };

  const updateStation = (e, item) => {
    setModal(false, () =>
      setModal(
        <UpdateStation
          stationID={item.station_id}
          stationName={item.station_name}
          school={item.school.school_name}
          g={getSchoolStations}
          page={page}
          isOpen={true}
        />
      )
    );
  };
  const addHours = (e, item) => {
    setModal(false, () =>
      setModal(
        <AddWorkingHours
          stationID={item.station_id}
          g={getSchoolStations}
          page={page}
          isOpen={true}
        />
      )
    );
  };

  const handleUpdateHours = (e, timeRange) => {
    setModal(false, () =>
      setModal(
        <UpdateTimeRangeHours
          timeID={timeRange.time_id}
          g={getSchoolStations}
          page={page}
          startTime={timeRange.start_time}
          endTime={timeRange.end_time}
          isOpen={true}
        />
      )
    );
  };
  const stationOn = (e, item) => {
    setModal(false, () =>
      setModal(
        <TurnOnStation
          stationID={item.station_id}
          g={getSchoolStations}
          page={page}
          isOpen={true}
        />
      )
    );
  };
  const stationOff = (e, item) => {
    setModal(false, () =>
      setModal(
        <TurnOffStation
          stationID={item.station_id}
          g={getSchoolStations}
          page={page}
          isOpen={true}
        />
      )
    );
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  const refreshData = () => {
    getSchoolStations(1);
  };

  useEffect(() => {
    if (query) {
      searchSchoolStations();
    } else {
      getSchoolStations(page);
    }
  }, [schoolID, page]);

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
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    ...
                  </a>

                  <div class="dropdown-menu dropdown-menu-right">
                    <Link class="dropdown-item" onClick={refreshData}>
                      <i class="fas fa-redo-alt text-orange-peel"></i>Refresh
                    </Link>
                  </div>
                </div>
              </div>
              <form className="mg-b-20">
                <div className="row gutters-8">
                  <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === "") {
                          setStations(e);
                        }
                      }}
                      placeholder="Search for station name or station code..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                    <button
                      type="submit"
                      onClick={(e) => searchSchoolStations(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
        {loading || loading2 ? (
          <Loader /> // Show loader when loading or searching
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
                          <span 
                            className="ml-2 text-secondary cursor-pointer"
                            onClick={(e) => handleUpdateHours(e, timeRange)}
                          >
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
                              <Link
                                to="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span className="flaticon-more-button-of-three-dots"></span>
                              </Link>
                              <div className="dropdown-menu dropdown-menu-right">
                                <Link
                                  className="dropdown-item"
                                  to="#"
                                  onClick={(e) => addHours(e, item)}
                                >
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    style={{
                                      color: "green",
                                      marginRight: "3px",
                                    }}
                                  />
                                  Change Active Hours
                                </Link>
                                <RenderSecure code="ADMIN-VIEW">
                                  <Link
                                    className="dropdown-item"
                                    to="#"
                                    onClick={(e) => updateStation(e, item)}
                                  >
                                    <i
                                      className="far fa-edit mr-1"
                                      style={{ color: "orange" }}
                                    ></i>
                                    Update Station Details
                                  </Link>
                                </RenderSecure>
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

      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={page === 1} onClick={() => handlePagination(page - 1)}>
          <i className="fa fa-angle-left mr-2"></i> Prev
        </button>
        {Array.isArray(meta) && meta.map((item) => (
          <button
            key={item}
            style={{borderRight: "1px solid yellow"}}
            className={`btn ${page === item ? "btn-primary" : "btn-dark"}`}
            onClick={() => handlePagination(item)}
          >
            {item}
          </button>
        ))}
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} disabled={page === meta.length}  onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default SchoolStationsPage;
