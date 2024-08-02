import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { Link, useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import AppContainer from "../../Components/Structure/AppContainer";
import Loader from '../../Components/Common/Loader';
import TableHeader from '../../Components/Common/TableHeader';
import ajaxParent from '../../util/remote/ajaxParent';
import useStateCallback from '../../util/customHooks/useStateCallback';
import AddStudentParent from './AddStudentParent';
import AuthContext from '../../Context/AuthContext';
import ajaxStudent from '../../util/remote/ajaxStudent';
import SchoolAddStudentParent from './SchoolAddStudentParent';

const SchoolParentProfile = props => {
    const [parentProfile, setParentProfile] = useState(false);
    const {parent} = useParams();
    const [children, setChildren] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mainContact,setMainContact] =useState("")
    const [alternativeContact,setAlternativeContact] =useState("")
    const [address,setAddress] =useState("")
    const [NIN,setNIN] =useState("")
    const [parentID,setParentID] = useState("")
    const [modal, setModal] = useStateCallback(false);
    const {user} = useContext(AuthContext);



    const [active,setActive] = useState(false)
    const handleActive = ()=> setActive(true)
    const handleInActive = ()=> setActive(false)
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)

    useEffect(()=>{
        getParentProfile();
      
    }, [])

    const setParentUpdate = () =>{
        handleActive()
        setFirstName(parentProfile.first_name)
        setLastName(parentProfile.last_name)
        setMainContact(parentProfile.main_contact)
        setAlternativeContact(parentProfile.alternative_contact)
        setAddress(parentProfile.address)
        setNIN(parentProfile.nin)
        setParentID(parentProfile.parent_id)
    }

    const handleUpdate = async(event) => {

        event.preventDefault()
        var data = {

            first_name: firstName,
            last_name: lastName,
            address: address,
            nin: NIN,
            parent_id: parent
        };
       
        const server_response = await ajaxParent.updateParent(data)
        if(server_response.status === "OK"){
            toast.success(server_response.message)
            getParentProfile();
        }else{
            //communicate error
            toast.error(server_response.message)
        }
    };

    const getParentProfile =async()=>{
        
        setLoading(true)
        const server_response = await ajaxParent.fetchParentInfo(parent);
        setLoading(false)
        if(server_response.status==="OK"){
            //store results
            setParentProfile(server_response.details);
        }else{
            //communicate error
            setParentProfile("404");
        }
    }

    const getChildren =async()=>{
        
        setLoading2(true)
        const server_response = await ajaxStudent.getSchoolStudents(parent, user.school_id);
        setLoading2(false)
        if(server_response.status==="OK"){
            setChildren(server_response.details);
        }else{
            //communicate error
            setChildren("404");
        }
    }

    const handleModal2=()=>{
        setModal(false, ()=>setModal(<SchoolAddStudentParent parentID={parent} schoolID={user.school_id} g={getChildren} isOpen={true}/>))
    }

    useEffect(()=>{
        getChildren()
      
    }, [parent, user.school_id])
 
    return (
        <AppContainer title={"Contact Profile"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {modal}
            <div className="row">

            <div className="col-12 col-xl-12">
                <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                    {parentProfile && <div className="box-body" style={{position:"relative"}}>
                        <div className="user-pic text-center" >
                        <div class="main-profile-overview widget-user-image text-center">
							<div class="main-img-user"><img alt="avatar" style={{height:"90px"}} src={
                      process.env.PUBLIC_URL + "/assets/img/figure/user55.png"
                    }/></div>
						</div>
                            <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>{parentProfile.first_name} {parentProfile.last_name}</h5>
                            </div>
                        </div>
                    </div>}

                    <div className="box-footer pt-41" style={{paddingTop: "41px !important"}}>
                        <div className="btn-list text-center">
                            {active?
                                <a href="#" onClick={handleInActive} className="btn btn-danger mr-2"><i className="fe fe-x"></i>Back</a>
                            :
                                <a href="#" onClick={setParentUpdate} className="btn btn-warning mr-2"><i className="far fa-edit mr-1"></i>Update Details</a>
                            }
                            
                            
                        </div>
                    </div>
                </div>

                {active?
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600"> Update Contact Information</div>
                        </div>
                        <br/>
                        <div className="box-body pt-20 user-profile">
					        <form onSubmit={handleUpdate}>
						        <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">First Name:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={firstName} onChange={(e)=>setFirstName(e.target.value)} className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Last Name:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={lastName} onChange={(e)=>setLastName(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
                                    <div className="col-sm-6">
                                            <label htmlFor="">Address:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
							            </div>
								        <div className="col-sm-6">
                                            <label htmlFor="">NIN:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={NIN} onChange={(e)=>setNIN(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
              
						        <button className="btn btn-primary" style={{ width: "100%" }}>Update Contact Details</button>
						    </form>
					               
				        </div>
                    </div>
                           
                :
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600">Contact Information</div>
                        </div>
                        <div className="box-body pt-20 user-profile">
                            <div className="table-responsive">
                                <table className="table mb-0 mw-100 color-span">
                                    {parentProfile && <tbody>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Names </span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{parentProfile.first_name} {parentProfile.last_name}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Main Contact</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{parentProfile.main_contact}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Alternative Contact</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{parentProfile.alternative_contact?parentProfile.alternative_contact:"Not registered"}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Address</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{parentProfile.address}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">NIN</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{parentProfile.nin}</span> </td>
                                        </tr>
                                       
                                    </tbody>}
                                </table>
                                {loading && <Loader/>}
                            </div>
                        </div>
                    </div>
                }

                <div className="card height-auto" >
                    <div className="card-body map-card">
                        <TableHeader
                            title="Students"
                            subtitle="List of the students under the contact's care"
                            viewButton={
                                <a href="#" onClick={handleModal2} className="btn btn-info" style={{float:"right"}}>Attach Student</a>
                               
                            } 
                           
                                
                        />
                        <div className="border-top mt-3"></div>                    
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                
                                        <th scope="col"> Student Name</th>
                                        <th scope="col"> Student Code</th>
                                        <th scope="col"> Student Group</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(children) && children.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{key+1}</th>
                                                <td>{item.full_name}</td>
                                                <td>{item.student_code}</td>
                                                <td>{item.group}</td>
                                            </tr>
                                        ))}
                                    {children === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No students attached yet.
                          </td>
                        </tr>)}
                                </tbody>
                            </table>
                            {loading2 && <Loader/>}
                        </div>
                              
                    </div>
			    </div>


            </div></div>

        </AppContainer>
    )
}

export default SchoolParentProfile;