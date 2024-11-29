import React from "react";

function ContactBioData({contactProfile}) {

    return (
        <table className="table mb-0 mw-100 color-span">
            {contactProfile && (
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
                                {contactProfile.full_name}
                            </span>{" "}
                        </td>
                    </tr>

                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Username
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {contactProfile.username}
                            </span>{" "}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                Address
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {contactProfile.address}
                            </span>{" "}
                        </td>
                    </tr>
                    <tr>
                        <td className="py-2 px-0">{" "}
                            <span className="w-50">
                                NIN
                            </span>{" "}
                        </td>
                        <td>:</td>
                        <td className="py-2 px-0">{" "}
                            <span className="">
                                {contactProfile.nin}
                            </span>{" "}
                        </td>
                    </tr>
                
                </tbody>
            )}
        </table>
        
    );
}

export default ContactBioData;
