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
import UpdateStation from "./UpdateStation";
import UpdateHours from "./UpdateHours";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import TurnOnStation from "./TurnOnStation";
import TurnOffStation from "./TurnOffStation";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ListStations() {
  const [stationList, setStationList] = useState([]);
  const [modal, setModal] = useStateCallback(false);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState([]);

  const getStations = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxStation.listAllStations(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStationList(server_response.details.list || []);
    } else {
      setStationList([]);
    }
  };

  const searchStations = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxStation.searchAllStations(
      query,
      page
    );
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStationList(server_response.details.list || []);
    } else {
      setStationList([]);
    }
  };

  const setStations = (e) => {
    e.preventDefault();
    setQuery("");
    setPage(1);
    getStations(1);
  };

  const updateStation = (e, item) => {
    setModal(false, () =>
      setModal(
        <UpdateStation
          stationID={item.station_id}
          stationName={item.station_name}
          schoolName={item.school.school_id}
          g={getStations}
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
          isOpen={true}
        />
      )
    );
  };

  const refreshData = () => {
    getStations(1);
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const columns = ["Station Name", "Station Code", "School Name", "Active Hours"];
    const data = stationList.map(item => [
      item.station_name,
      item.station_code,
      item.school ? item.school.school_name: "Not installed",
      item.start_time ? `${item.start_time} - ${item.end_time}`: "Not set"

    ]);

    pdf.autoTable({ head: [columns], body: data });
    pdf.save("station_list.pdf");
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= meta.length) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    if (query) {
      searchStations();
    } else {
      getStations(page);
    }
  }, [page]);

  return (
    <AppContainer title="Calling Stations">
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
      <div className="col-lg-12 col-md-12">
          <div className="pl-20" style={{ float: "right" }}>
            <Link onClick={stationAdd}>
              <button
                type="button"
                className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-dodger-blue"
              >
                <i className="fa-solid fa-plus" /> Add New Station
              </button>
            </Link>
          </div>
        </div>

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
                    <Link class="dropdown-item" onClick={exportToPDF} ><i class="fas fa-file-export"></i>Export</Link>

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
        {loading || loading2 ? (
          <Loader /> // Show loader when loading or searching
        ) : (
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
              <th>No.</th>
              <th>Station Name</th>
              <th>Station Code</th>
              <th>School</th>
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
                              {item.school
                                ? item.school.school_name
                                : "Not installed"}
                            </td>
                          <td>
                            {item.start_time
                              ? `${item.start_time} - ${item.end_time}`
                              : "Not set"}
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
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No stations / calling booths registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page - 1)}>
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
        <button className="btn btn-dark" style={{borderRight: "1px solid yellow"}} onClick={() => handlePagination(page + 1)}>
          Next <i className="fa fa-angle-right ml-2"></i>
        </button>
      </div>
              {/* <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Station Name</th>
                      <th>Station Code</th>
                      <th>School</th>
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
                          <td>
                              {item.school
                                ? item.school.school_name
                                : "Not installed"}
                            </td>
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default ListStations;
