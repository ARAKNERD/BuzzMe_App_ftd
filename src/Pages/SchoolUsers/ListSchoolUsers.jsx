import React, {useEffect, useState} from "react";
import ajaxSchool from "../../util/remote/ajaxSchool";
import { Link } from "react-router-dom";
import useStateCallback from "../../util/customHooks/useStateCallback";
import ResetPassword from "./ResetPassword";
import TableHeader from "../../Components/Common/TableHeader";
import AddSchoolAdmin from "./AddSchoolAdmin";
import Loader from "../../Components/Common/Loader";

function ListSchoolUsers(props) {
  const [schoolUsers, setSchoolUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useStateCallback(false);

  const getSchoolUsers = async () => {
    try {
      const data = {
        school_id: props.school,
      };
      setLoading(true)
      const serverResponse = await ajaxSchool.fetchSchoolUserList(data);
      setLoading(false)
      if (serverResponse.status === "OK") {
        setSchoolUsers(serverResponse.details);
      } else {
        // Handle error condition
        setSchoolUsers("404");
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
    setModal(false, ()=>setModal(<ResetPassword accountID={item.account_id} isOpen={true}/>))
  }

  const handleAdd=()=>{
    setModal(false, ()=>setModal(<AddSchoolAdmin g={getSchoolUsers}  isOpen={true}/>))
}
  

  return (
    <div className="card height-auto">
      {modal}
      <div className="card-body">
        <TableHeader
                title="School Administrators List"
                subtitle="List of all the different school administrators"  
                viewButton={
                  <a href="#" onClick={handleAdd} className="btn btn-info" style={{float:"right"}}>Add School Administrator</a>
                     
              } 
              />
        <div className="border-top mt-3"></div>

        <div className="table-responsive">
          <table className="table display data-table text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Names</th>
                <th>School Name</th>
                <th>Actions</th>
                 
              </tr>
            </thead>
            <tbody>
            {Array.isArray(schoolUsers) && schoolUsers.map((item, key) => (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.first_name} {item.last_name}</td>
                          <td>{item.school_name}</td>
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
                        </tr>
                      ))}
                      {schoolUsers === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No school administrators registered yet.
                          </td>
                        </tr>)}
            </tbody>
          </table>
          {loading && <Loader/>}
        </div>
      </div>
    </div>
  );
}

export default ListSchoolUsers;
