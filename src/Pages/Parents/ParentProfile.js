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

const ParentProfile = props => {
    const [parentProfile, setParentProfile] = useState(false);
    const {id} = useParams();
    const [children, setChildren] = useState(false);
    const [parentName, setParentName] = useState("");
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
    const [loading3,setLoading3] = useState(false)

    const setParentUpdate = () =>{
        handleActive()
        setParentName(parentProfile.parent_name)
        setMainContact(parentProfile.main_contact)
        setAlternativeContact(parentProfile.alternative_contact)
        setAddress(parentProfile.address)
        setNIN(parentProfile.nin)
        setParentID(parentProfile.parent_id)
    }

    const handleUpdate = async(e) =>{
        e.preventDefault()
        var data = {

            parent_name: parentName,
            alternative_contact: alternativeContact,
            main_contact: mainContact,
            address: address,
            nin: NIN,
            parent_id: id
        };
        setLoading3(true)
            const server_response = await ajaxParent.updateParent(data);
            setLoading3(false)
            if(server_response.status==="OK"){
                toast.success(server_response.message);
                getParentProfile(id);
            }
            else{
                toast.error(server_response.message); 
            } 
    }

    const getParentProfile =async()=>{
        
        setLoading(true)
        const server_response = await ajaxParent.fetchParentInfo(id);
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
        const server_response = await ajaxParent.fetchChildren(id);
        setLoading2(false)
        if(server_response.status==="OK"){
            setChildren(server_response.details);
        }else{
            //communicate error
            setChildren("404");
        }
    }

    useEffect(()=>{
        getChildren();
        getParentProfile(id);
      
    }, [id])

    const handleModal2=()=>{
        setModal(false, ()=>setModal(<AddStudentParent parentID={id} g={getChildren} isOpen={true}/>))
    }
 
    return (
        <AppContainer title={"Guardian Profile"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {modal}
            <div className="col-12 col-xl-12">
                <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                    {parentProfile && <div className="box-body" style={{position:"relative"}}>
                        <div className="user-pic text-center" >
                        <div class="main-profile-overview widget-user-image text-center">
							<div class="main-img-user"><img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/user55.png"
                    }/></div>
						</div>
                            <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>{parentProfile.parent_name}</h5>
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
                            <div className="box-title fs-20 font-w600"> Update Guardian Information</div>
                        </div>
                        <br/>
                        <div className="box-body pt-20 user-profile">
					        <form onSubmit={handleUpdate}>
						        <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">Names:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={parentName} onChange={(e)=>setParentName(e.target.value)} className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Main Contact:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={mainContact} onChange={(e)=>setMainContact(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">Alternative Contact:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={alternativeContact} onChange={(e)=>setAlternativeContact(e.target.value)} className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Address:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">NIN:<span className="tx-danger">*</span></label>
                                            <input type="text" defaultValue={NIN} onChange={(e)=>setNIN(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                {loading3 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Updating...</button>)}
                                {!loading3 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue">Update Guardian Details</button>)}
						    </form>
					               
				        </div>
                    </div>
                           
                :
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600">Guardian Information</div>
                        </div>
                        <div className="box-body pt-20 user-profile">
                            <div className="table-responsive">
                                <table className="table mb-0 mw-100 color-span">
                                    {parentProfile && <tbody>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Names </span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{parentProfile.parent_name}</span> </td>
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
                            subtitle="List of the students under the parent's or guardian's care"
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
                                        <th scope="col"> School</th>
                                        <th scope="col"> Student Code</th>
                                        <th scope="col"> Student Group</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(children) && children.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{key+1}</th>
                                                <td>{item.student?.names}</td>
                                                <td>{item.student?.school?.school_name}</td>
                                                <td>{item.student?.student_code}</td>
                                                <td>{item.student?.group?.group_name}</td>
                                            </tr>
                                        ))}
                                        {children === "404" && (<tr>
                          <td colSpan="5" style={{textAlign: "center"}}>
                            No students attached to this parent yet.
                          </td>
                        </tr>)}
                                </tbody>
                            </table>
                            {loading2 && <Loader/>}
                        </div>
                              
                    </div>
			    </div>


            </div>

        </AppContainer>
    )
}

export default ParentProfile;