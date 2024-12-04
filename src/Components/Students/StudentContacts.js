import React from "react";

function StudentContacts({studentContacts}) {

    return (
        <div className="table-responsive">
            <table className="table table-hover text-nowrap mg-b-0" id="second">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col"> Names</th>
                        <th scope="col"> Contact Number</th>
                        <th scope="col"> Relationship</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(studentContacts) &&
                        studentContacts.map((item, key) => (
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{item.contact_name}</td>
                            <td>{item.parent?.username}</td>
                            <td>{item.relationship}</td>
                        </tr>
                    ))}
                    {studentContacts === "404" && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No contacts added to this student yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>                  
        </div> 
    );
}

export default StudentContacts;
