import React from "react";

function StudentBioData({studentProfile}) {

    return (
        <table className="table mb-0 mw-100 color-span">
            {studentProfile && (
                <tbody>
                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Names{" "}
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.full_name}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Student Code
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.username}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Group Name
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.group}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                School Name
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.school}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Gender
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.gender}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Registration No.
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.reg_no? studentProfile.reg_no: "Not recorded"}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Account Status | Default Pin
                            </span>
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                        <span className="">
                            {studentProfile.is_activated ==="0"
                                ? <span class="badge badge-danger">INACTIVE </span>
                                : <span class="badge badge-success">ACTIVE </span>} {" "}
                                | {studentProfile.is_secure=== 1? <span class="badge badge-success">SECURED</span>: <span class="badge badge-danger">{studentProfile.default_pin}</span>}
                            </span> 
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Card Status
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                            {studentProfile.card_status ==="2"? <span class="badge badge-danger">DEACTIVATED</span>
                                :studentProfile.card_status ==="1"? <span class="badge badge-success">ASSIGNED - {studentProfile.card_number}</span>
                                : <span class="badge badge-warning">UNASSIGNED</span>}{" "}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Restricted By Parent
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                            {studentProfile.student_restrictions ==="1"
                                ? <span class="badge badge-danger">RESTRICTED</span>
                                : <span class="badge badge-success">UNRESTRICTED</span>}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Restricted By School
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {studentProfile.school_restrictions ==="1"
                                ? <span class="badge badge-danger">RESTRICTED</span>
                                : <span class="badge badge-success">UNRESTRICTED</span>}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Call Restrictions
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                            {studentProfile.is_restricted ==="Restricted"
                                ? <span class="badge badge-danger">RESTRICTED</span>
                                : <span class="badge badge-success">UNRESTRICTED</span>}
                            </span>{" "}
                        </td>
                    </tr>
                </tbody>
            )}
        </table>  
    );
}

export default StudentBioData;
