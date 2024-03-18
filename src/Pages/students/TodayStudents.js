import React, {useEffect, useState} from "react";
import ajaxStudent from "../../util/remote/ajaxStudent";
import TableHeader from "../../Components/Common/TableHeader";

function TodayStudents(props) {
  
  const [studentList, setStudentList] = useState("");

  const getStudentsToday = async () => {
    var data = {
      school: props.school,
      group: props.group_id,
    };
    const server_response = await ajaxStudent.fetchStudentsToday(data);
    if (server_response.status === "OK") {
      setStudentList(server_response.details);
    } else {
      setStudentList("404");
    }
  };

  useEffect(() => {
    getStudentsToday();
  }, []);

  return (
    <div>
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
          <TableHeader
                  title="Recently Registered Students"
                  subtitle="List of the students registered today"
                />
          </div>

          <div className="table-responsive">
            <table className="table display data-table text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Student Code</th>
                  <th>Registration Number</th>
                  <th>Student Group</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(studentList) && studentList.length > 0 ? (
                      studentList.map((student, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{student.names}</td>
                          <td>{student.student_code}</td>
                          <td>{student.reg_no?student.reg_no:"Not recorded"}</td>
                          <td>{student.group?.group_name}</td>
                        </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="5" style={{textAlign:"center"}}>No students registered today.</td>
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

export default TodayStudents;
