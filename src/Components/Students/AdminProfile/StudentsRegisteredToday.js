import React from "react";
import TableHeader from "../../Common/TableHeader";

function StudentsRegisteredToday({studentsToday, adminType}) {

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
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
            {adminType === "admin" && <th>School</th>}
                                        <th>Student Code</th>
                                        <th>Registration Number</th>
                                        <th>Student Group</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Array.isArray(studentsToday) && studentsToday.map((student, key) => (
                                                <tr key={key}>
                                                    <th scope='row'>{key+1}</th>
                                                    <td>{student.full_name}</td>
                                                    {adminType === "admin" &&<td>{student.school}</td>}
                                                    <td>{student.username}</td>
                                                    <td>{student.reg_no?student.reg_no:"Not recorded"}</td>
                                                    <td>{student.group}</td>
                                                </tr>
                                            ))}
                                            {studentsToday === "404" && (<tr>
                                                <td colSpan="7" style={{textAlign: "center"}}>
                                                    No students registered today.
                                                </td>
                                                </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

        
    );
}

export default StudentsRegisteredToday;
