import React, {useContext} from "react";
import SchoolContext from "../../Context/SchoolContext";
import TableHeader from "../Common/TableHeader";
import { Link } from "react-router-dom";

function RecentlyRegisteredSchools() {
    const {recentSchools} = useContext(SchoolContext);

    return (
        <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
          <TableHeader
                  title="Recently Registered Schools"
                  subtitle="List of the schools registered today"
                />
          </div>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>School Name</th>
                  <th>Phone Number</th>
                  <th>E-mail</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(recentSchools) && recentSchools.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td><Link
                          to={`/schools/view/profile/${item.school_id}`}>
                          {item.school_name}
                        </Link></td>
                          <td>{item.contact}</td>
                          <td>{item.email}</td>
                          <td>{item.district}</td>
                        </tr>
                      ))}
                      {recentSchools === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No schools registered today.
                          </td>
                        </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        
    );
}

export default RecentlyRegisteredSchools;
