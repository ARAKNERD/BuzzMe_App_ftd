import React, {useEffect, useState} from "react";
import ajaxSchool from "../../util/remote/ajaxSchool";
import { Link } from "react-router-dom";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ResetPassword from "./ResetPassword";
import TableHeader from "../../Components/Common/TableHeader";

function ListSchoolUsers(props) {
  const [schoolUsers, setSchoolUsers] = useState([]);
  const [modal, setModal] = useStateCallback(false);

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

  useEffect(() => {
    getSchoolUsers();
  }, []);

  const handleUpdate=(e,item)=>{
    setModal(false, ()=>setModal(<ResetPassword accountID={item.id} isOpen={true}/>))
  }
  

  return (
    <div className="card height-auto">
      {modal}
      <div className="card-body">
        <div className="heading-layout1">
        <TableHeader
                title="School Administrators List"
                subtitle="List of all the different school administrators"    
              />
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
                    <th>School Contact</th>
                    <th>Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {schoolUsers.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.names}</td>
                  {props.school !== null && item.school ? (
                    <>
                      <td>{item.school.school_name}</td>
                      <td>{item.school.contact}</td>
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
                                  <i className="fas fa-cogs text-dark-pastel-green"></i>
                                  Reset Password
                                </Link>
                              </div>
                            </div>
                          </td>
                     
                    </>
                  ) : (
                    <td colSpan="5" style={{textAlign:"center"}}>No school administrators registered.</td>
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
