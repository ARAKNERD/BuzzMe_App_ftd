import React from "react";

function StationList({schoolStations, stationFirst}) {

    return (
        <table className="table display data-table text-nowrap">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Station Name</th>
                    <th>Station Code</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {schoolStations.length > 0 ? (
                    schoolStations.map((item, index) => (
                    <tr key={index}>
                        <td>{index + stationFirst + 1}</td>
                        <td>{item.station_name}</td>
                        <td>{item.station_code}</td>
                        <td>{item.status==="300"?<span class="badge badge-success">Active</span>:
                        item.status==="200"?<span class="badge badge-warning">Inactive</span>:<span class="badge badge-danger">Off</span>}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                            No stations attached to this school yet.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

        
    );
}

export default StationList;
