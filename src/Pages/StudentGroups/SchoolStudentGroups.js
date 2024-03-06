import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";

import AddStudentSchoolGroup from "./AddStudentSchoolGroup";
import ajaxStudentGroup from "../../util/remote/ajaxStudentGroup";
import toast from "react-hot-toast";

function SchoolStudentGroups() {
  const [studentGroups, setStudentGroups] = useState("");

  useEffect(() => {}, []);
  const getRerport = async () => {
    var data = {
      // start_date: sdate,
      // end_date: edate,
    };
    const server_response = await ajaxStudentGroup.fetchGroupList(data);

    if (server_response.status === "OK") {
      setStudentGroups(server_response.details);
    } else if (server_response.status === "Fail") {
      toast.error(server_response.message);
    }
  };
  return (
    <AppContainer title="Class Groups control page">
      <div className="row">
        <div className="col-lg-4">
          <AddStudentSchoolGroup />
        </div>
        <div className="col-lg-8">
          <div
            className="card custom-card"
            // style={{marginTop: "25px", borderRadius: "10px"}}
          >
            <div className="card-body map-card">
              <div class="heading-layout1 mg-b-25">
                <TableHeader
                  title="Class Groups List"
                  subtitle="List of all the class groups sorted according to the recently added"
                />
                <div class="dropdown">
                  <a
                    class="dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false">
                    ...
                  </a>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th scope="col" className="">
                        No.
                      </th>
                      <th scope="col">Names</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {Array.isArray(groupList) && groupList.length > 0 ? (
                      groupList.map((item, key) => (
                        <tr key={key}>
                          <th scope="row">{key + 1}</th>
                          <td>{item.group_name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" style={{textAlign: "center"}}>
                          No class groups registered yet.
                        </td>
                      </tr>
                    )} */}
                  </tbody>
                </table>
                {/* {loading && <Loader />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default SchoolStudentGroups;
