import React from "react";
import { Link } from "react-router-dom";
import TableHeader from "../Common/TableHeader";
import toast from "react-hot-toast";
import ajaxParent from "../../util/remote/ajaxParent";

function ContactChildren({children, handleModal2, getContactChildren, user_id}) {

    const updateContactIsAdmin = async(e, item)=>{
        const server_response = await ajaxParent.giveContactIsAdmin(item.link_id);
        if(server_response.status==="OK"){
            toast.success(server_response.message);
            getContactChildren(user_id);
        }else{
            //communicate error
            toast.error(server_response.message); 
        }
    }

    return (
        <div class="col-lg-12">
            <div class="cards pt-3">
                <div class="card-body profile-card pt-4 d-flex flex-column">
                    <TableHeader
                        title="Students"
                        viewButton={
                            <a href="#" onClick={handleModal2} className="btn btn-info" style={{float:"right"}}>Attach Student</a>   
                        }        
                    />
                    <div class="user-manager scroll-widget border-top">
						<div class="table-responsive">
							<table class="table mg-b-0">
							    <tbody>
                                    {Array.isArray(children) && children.map((item, key) => (
										<tr key={key}>
											<td class="bd-t-0">
												<div class="main-img-user"><img alt="avatar" style={{ height: "50px" }} src={
                                                    process.env.PUBLIC_URL + "/assets/img/figure/user55.png"}/>
                                                </div>
											</td>
                                            <td class="bd-t-0">
                                                <h6 class="mg-b-0">{item.student.full_name}</h6><small class="tx-11 tx-gray-500">{item.student?.school}</small>
                                            </td>
                                            <td class="bd-t-0">
                                                {item.is_guardian === "0"?
                                                <div class="dropdown">
                                                    <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">...</a>
                                                    <div class="dropdown-menu dropdown-menu-right">
                                                        <Link class="dropdown-item"  onClick={(e) => updateContactIsAdmin(e, item)}><i class="fas fa-user-check text-orange-peel"></i>Set Admin</Link>
                                                    </div>
                                                </div>:""}
											</td>
										</tr>
                                    ))}
                                    {children === "404" && (<tr>
                                        <td colSpan="2" style={{textAlign: "center"}}>
                                            No students attached to this contact yet.
                                        </td>
                                    </tr>)}
								</tbody>
							</table>
                        </div>
					</div>
                </div>
            </div>
        </div>
        
    );
}

export default ContactChildren;
