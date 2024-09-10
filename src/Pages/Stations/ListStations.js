import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import ajaxStation from "../../util/remote/ajaxStation";
import AddStation from "./AddStation";
import useStateCallback from "../../util/customHooks/useStateCallback";
import { RenderSecure } from "../../util/script/RenderSecure";
import AuthContext from "../../Context/AuthContext";
import UpdateStation from "./UpdateStation";
import UpdateHours from "./UpdateHours";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TurnOnStation from "./TurnOnStation";
import TurnOffStation from "./TurnOffStation";
import SchoolContext from "../../Context/SchoolContext";

function ListStations() {
  const [stationList, setStationList] = useState(false);
  const [stationSearch, setStationSearch] = useState(false);
  const [modal, setModal] = useStateCallback(false);
  const { user } = useContext(AuthContext);
  const { schoolDetails } = useContext(SchoolContext);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");

  const schoolID = user.role_id === "3" ? schoolDetails.school_id: "";

  const getStations = async () => {
    setLoading(true);
    const server_response = await ajaxStation.fetchStationList(schoolID,page);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStationList(server_response.details.list);
      if (query) {
        setStationSearch(server_response.details.list);
      }
    } else {
      setStationList("404");
    }
  };

  const searchStations = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxStation.searchStation(
      schoolID,
      query,
      page
    );
    setLoading2(false);
    if (server_response.status === "OK") {
      if (server_response.details.length === 0) {
        setStationSearch([]);
      } else {
        setMeta(server_response.details.meta.list_of_pages);
        setStationSearch(server_response.details.list);
      }
    } else {
      setStationSearch([]);
    }
  };

  const setStations = (e) => {
    e.preventDefault();
    setQuery("");
    setStationSearch([]);
    setPage(1);
    getStations();
  };

  useEffect(() => {
    getStations();
  }, [schoolID, page]);

  useEffect(() => {
    searchStations();
  }, [schoolID, page]);

  const updateStation = (e, item) => {
    setModal(false, () =>
      setModal(
        <UpdateStation
          stationID={item.station_id}
          stationName={item.station_name}
          school={item.school.school_name}
          g={getStations}
          h={searchStations}
          isOpen={true}
        />
      )
    );
  };
  const updateHours = (e, item) => {
    setModal(false, () =>
      setModal(
        <UpdateHours
          stationID={item.station_id}
          g={getStations}
          h={searchStations}
          startTime={item.start_time}
          endTime={item.end_time}
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
          g={getStations}
          h={searchStations}
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
          g={getStations}
          h={searchStations}
          isOpen={true}
        />
      )
    );
  };
  const stationAdd = (e, item) => {
    setModal(false, () =>
      setModal(
        <AddStation
          g={getStations}
          h={searchStations}
          isOpen={true}
        />
      )
    );
  };

  const refreshData = () => {
    getStations();
  };

  const setNextPageNumber = () => {
    if (meta.length === page) {
    } else {
      setPage(page + 1);
    }
  };

  const setPreviousPageNumber = () => {
    if (page === 1) {
    } else {
      setPage(page - 1);
    }
  };
  const setPageNumber = (e, item) => {
    setPage(item);
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
                  <RenderSecure code="ADMIN-VIEW"><Link class="dropdown-item" onClick={stationAdd}>
                      <i class="fas fa-plus" style={{color:"green"}}></i>Add Station
                    </Link></RenderSecure>
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
                      onClick={(e) => searchStations(e)}
                      className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Station Name</th>
                      <th>Station Code</th>
                      {user.role_id === "3" ? "" : <th>School</th>}
                      <th>Active Hours</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stationSearch.length > 0 ? (
                      stationSearch.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.station_name}</td>
                          <td>{item.station_code}</td>
                          {user.role_id === "3" ? (
                            ""
                          ) : (
                            <td>
                              {item.school
                                ? item.school.school_name
                                : "Not installed"}
                            </td>
                          )}
                          <td>
                            {item.start_time
                              ? `${item.start_time} - ${item.end_time}`
                              : "Not installed"}
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
                                  onClick={(e) => updateHours(e, item)}
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
                    ) : stationList === "404" ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No calling booths / stations registered yet.
                        </td>
                      </tr>
                    ) : (
                      query && (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            No search result(s) found.
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <div
                    className="align-items-center justify-content-center pos-absolute"
                    style={{ left: "50%" }}
                  >
                    <button
                      className="btn btn-dark"
                      style={{ borderRight: "1px solid yellow" }}
                      onClick={setPreviousPageNumber}
                    >
                      <i className="fa fa-angle-left mr-2"></i> Prev
                    </button>
                    {Array.isArray(meta) &&
                      meta.map((item) =>
                        page === item ? (
                          <button
                            style={{ borderRight: "1px solid yellow" }}
                            className="btn btn-primary"
                          >
                            {item}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => setPageNumber(e, item)}
                            style={{ borderRight: "1px solid yellow" }}
                            className="btn btn-dark"
                          >
                            {item}
                          </button>
                        )
                      )}

                    <button
                      style={{ borderRight: "1px solid yellow" }}
                      className="btn btn-dark"
                      onClick={setNextPageNumber}
                    >
                      Next<i className="fa fa-angle-right ml-2"></i>
                    </button>
                  </div>
                </table>
                {loading && <Loader />}
                {loading2 && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListStations;
