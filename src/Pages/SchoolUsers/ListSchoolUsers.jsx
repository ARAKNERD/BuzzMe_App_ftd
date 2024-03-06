import React, {useEffect, useState} from "react";

import ajaxSchool from "../../util/remote/ajaxSchool";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ChangeSchoolUserStatus from "./ChangeSchoolUserStatus";
function ListSchoolUsers(props) {
  const [schoolUsers, setSchoolUsers] = useState([]);

  useEffect(() => {
    getSchoolUsers();
  }, []);

  const getSchoolUsers = async () => {
    try {
      const data = {
        school_id: props.school,
      };
      const serverResponse = await ajaxSchool.fetchSchoolUserList(data);
      if (serverResponse.status === "OK") {
        setSchoolUsers(serverResponse.details);
      } else {
        // Handle error condition
        console.error("Error:", serverResponse.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };
  const [changeStatus, setChangeStatus] = useStateCallback(false);
  const handle_change_status = (id) => {
    setChangeStatus(false, () =>
      setChangeStatus(<ChangeSchoolUserStatus isOpen={true} id={id} />)
    );
  };

  return (
    <div className="card height-auto">
      {changeStatus}
      <div className="card-body">
        <div className="heading-layout1">
          <div className="item-title">
            <h3>All School User Data</h3>
          </div>
          {/* Dropdown menu */}
        </div>
        {/* Search form */}
        {/* Table */}
        <div className="table-responsive">
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Names</th>
                {props.school !== null && (
                  <>
                    <th>School Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>District</th>
                    <th>Region</th>
                    <th>Date Registered</th>
                    <th>Registered By</th>
                    <th>change status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {schoolUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.names}</td>
                  <td>{user.user_details.username}</td>
                  {props.school !== null && user.school ? (
                    <>
                      <td>{user.school.school_name}</td>
                      <td>{user.school.contact}</td>
                      <td>{user.school.email}</td>
                      <td>{user.school.address}</td>
                      <td>{user.school.district.district_name}</td>
                      <td>{user.school.region.region_name}</td>
                      <td>{user.school.date_registered.long_date}</td>
                      <td>
                        {/* <div className="col-12 form-group"> */}
                        <button
                          type="submit"
                          className="btn-fill-lmd p-2 radius-30 text-light shadow-dark-pastel-green bg-dark-pastel-green"
                          onClick={() => handle_change_status(user.id)}>
                          change status
                        </button>
                        {/* </div> */}
                      </td>
                    </>
                  ) : (
                    <td colSpan="9">No school details available</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListSchoolUsers;
