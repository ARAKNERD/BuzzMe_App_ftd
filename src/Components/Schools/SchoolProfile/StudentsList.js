import React from "react";
import { Link } from "react-router-dom";

function StudentsList({schoolStudents, studentsFirst}) {

    return (
        <table className="table display data-table text-nowrap">
            <thead>
              <tr>
              <th scope="col" >No.</th>
              <th>Names</th>
              <th>Student Code</th>
              <th>Registration Number</th>
              </tr>
            </thead>
            <tbody>
              {schoolStudents.length > 0 ? (
                schoolStudents.map((item, index) => (
                  <tr key={index}>
                     <td>{index + studentsFirst + 1}</td>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.username}</td>
                    <td>{item.reg_no?item.reg_no:"Not registered"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No students registered in this school yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        
    );
}

export default StudentsList;
