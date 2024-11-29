import React from "react";
import TableHeader from "../Common/TableHeader";

function UserContacts({contactList}) {

    return (
        <>
            <TableHeader subtitle="List of all the contacts"/>
            <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0" id="second">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col"> Names</th>
                            <th scope="col"> Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(contactList) &&
                        contactList.map((item, key) => (
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{item.contact?.full_name}</td>
                            <td>{item.contact?.username}</td>
                        </tr>
                    ))}
                    {contactList === "404" && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                            No contacts added to this parent yet.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        
        </>
        
    );
}

export default UserContacts;
