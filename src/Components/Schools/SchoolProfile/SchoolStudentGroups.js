import React from "react";

function SchoolStudentGroups({groupList}) {

    return (
        <>
            <div className="border-top mt-1"></div>
            <div className="table-responsive">
                <table className="table display data-table text-nowrap">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Group Name</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(groupList) && groupList.map((item, key) => (
                            <tr>
                                    <td>{key + 1}</td>
                                    <td>{item.group_name}</td>
                            </tr>
                        ))}
                        {groupList === "404" && (<tr>
                            <td colSpan="2" style={{textAlign: "center"}}>
                                No groups registered yet.
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>

        
    );
}

export default SchoolStudentGroups;
