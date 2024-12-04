import React from "react";
import TableHeader from "../Common/TableHeader";
import { Link } from "react-router-dom";

function SchoolStations({schoolDashboardStations}) {

    return (
        <div className="col-6-xxxl col-12">
          <div className="card custom-card" style={{ borderRadius: "10px" }}>
            <div className="card-body map-card">
                <div class="heading-layout1 mg-b-25">
                    <TableHeader
                        title="Calling Stations"
                        subtitle="List of the calling stations at the school with their current status"
                    />
                    <div class="dropdown">
                        <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false" >...</a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <Link class="dropdown-item" to={"/stations"}>
                                <i class="fa-solid fa-eye text-orange-peel"></i>
                                View All
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-top mt-3"></div>
                <div className="table-responsive">
                    <table className="table table-hover text-nowrap mg-b-0">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Station Name</th>
                            <th>Active Hours</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(schoolDashboardStations) &&
                            schoolDashboardStations.map((item, key) => (
                                <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.station_name}</td>
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

                                
                                </tr>
                            ))}
                            {schoolDashboardStations === "404" && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>
                                No stations installed at this school.
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
        
    );
}

export default SchoolStations;
