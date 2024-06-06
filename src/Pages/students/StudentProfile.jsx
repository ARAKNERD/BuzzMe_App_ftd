import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { Link, useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudent from '../../util/remote/ajaxStudent'
import Loader from '../../Components/Common/Loader';
import useStateCallback from '../../util/customHooks/useStateCallback';
import ajaxStudentGroup from '../../util/remote/ajaxStudentGroup';
import AuthContext from '../../Context/AuthContext';
import TableHeader from '../../Components/Common/TableHeader';
import AttachParent from '../Parents/AttachParent';
import { RenderSecure } from '../../util/script/RenderSecure';

const StudentProfile = props => {
    const [studentProfile, setStudentProfile] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const {id} = useParams();
    const [studentLogs, setStudentLogs] = useState(false);
    const [studentContacts, setStudentContacts] = useState(false);
    const {user} = useContext(AuthContext);


    const [groupList, setGroupList] = useState(false);
    const [group, setGroup] = useState("");
    const [regNo, setRegNo] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [names, setNames] = useState("");
    const [gender, setGender] = useState("");
    const [studentID,setStudentID] = useState("")


    const [active,setActive] = useState(false)
    const handleActive = ()=> setActive(true)
    const handleInActive = ()=> setActive(false)
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const [loading3,setLoading3] = useState(false)
    const [loading5,setLoading5] = useState(false)

    const data = {
        student_id: id
      };

    const data2 = {
        student_id: id,
        search: ""
    };

    useEffect(()=>{
         getStudentContacts()
        getStudentProfile();
        getStudentLogs();
      
    }, [])

    const getGroups = async () => {
        const server_response = await ajaxStudentGroup.fetchGroupList(user.school);
        if (server_response.status === "OK") {
          setGroupList(server_response.details);
        }
    };
    
    useEffect(() => {
        getGroups();
    }, [user.school]);

    const setUserUpdate = () =>{
        handleActive()
        setFirstName(studentProfile.first_name)
        setLastName(studentProfile.last_name)
        setGroup(studentProfile.group_id)
        setGender(studentProfile.gender)
        setRegNo(studentProfile.reg_no)
        setStudentID(studentProfile.id)
    }

    const handleUpdate = async(event) => {

        event.preventDefault()
        var data = {
            student_id: id,
            first_name: firstName,
            last_name: lastName,
            reg_no: regNo,
            gender: gender,
            group_id: group,       
        };
       setLoading5(true)
        const server_response = await ajaxStudent.updateStudent(data)
        setLoading5(false)
        if(server_response.status === "OK"){
            toast.success(server_response.message)
            getStudentProfile(id)
        }else{
            //communicate error
            toast.error(server_response.message)
        }
    };

    const getStudentProfile =async()=>{
        
        setLoading(true)
        const server_response = await ajaxStudent.fetchStudentData(data);
        setLoading(false)
        if(server_response.status==="OK"){
            //store results
            setStudentProfile(server_response.details);
        }else{
            //communicate error
            setStudentProfile("404");
        }
    }

    const getStudentLogs =async()=>{
        setLoading2(true)
        const server_response = await ajaxStudent.fetchStudentCall_logs(data);
        setLoading2(false)
        if(server_response.status==="OK"){
            setStudentLogs(server_response.details);
        }else{
            //communicate error
            setStudentLogs("404");
        }
    }

    const getStudentContacts =async()=>{
        setLoading3(true)
        const server_response = await ajaxStudent.fetchStudentContacts(data2);
        
        setLoading3(false)
        if(server_response.status==="OK"){
            setStudentContacts(server_response.details);
        }else{
            //communicate error
            setStudentContacts("404");
        }
    }

    const handleModal3=()=>{
        setModal(false, ()=>setModal(<AttachParent studentID={id} h={getStudentContacts} isOpen={true}/>))
    }
 
    return (
        <AppContainer title={"Student Profile"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {modal}
            <div className="row">
            <div className="col-12 col-xl-12">
                <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                    {studentProfile && <div className="box-body" style={{position:"relative"}}>
                        <div className="user-pic text-center" >
                        <div class="main-profile-overview widget-user-image text-center">
							<div class="main-img-user"><img alt="avatar" style={{height:"90px"}} src={
                      process.env.PUBLIC_URL + "/assets/img/figure/user55.png"
                    }/></div>
						</div>
                            <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                <h5 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>{studentProfile.first_name} {studentProfile.last_name}</h5>
                                <h6 className="pro-user-desc text-muted fs-14">{studentProfile.group}</h6>
                            </div>
                        </div>
                    </div>}

                    <RenderSecure code="SCHOOL-USER-VIEW"><div className="box-footer pt-41" style={{paddingTop: "41px !important"}}>
                        <div className="btn-list text-center">
                            {active?
                                <a href="#" onClick={handleInActive} className="btn btn-danger mr-2"><i className="fe fe-x"></i>Back</a>
                            :
                                <a href="#" onClick={setUserUpdate} className="btn btn-warning mr-2"><i className="far fa-edit mr-1"></i>Update Details</a>
                            }
                            
                            
                        </div>
                    </div></RenderSecure>
                </div>
                <div className='row'>
                <div className="col-6 col-xl-6">
                {active?
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600"> Update Student Information</div>
                        </div>
                        <br/>
                        <div className="box-body pt-20 user-profile">
					        <form onSubmit={handleUpdate}>
						        <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">First Name:<span style={{color:"red"}}>*</span></label>
                                            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Last Name:<span style={{color:"red"}}>*</span></label>
                                            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="form-control"/>
							            </div>
                                       
                                       
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row row-sm">
                                        <div className="col-sm-6">
                                            <label htmlFor="">Group:<span style={{color:"red"}}>*</span></label>
                                            <Select
                                                onChange={(e)=>setGroup(e.group_id)}
                                                getOptionLabel ={(option)=>option.group_name}
                                                getOptionValue ={(option)=>option.group_id}
                                                isSearchable
                                                options={groupList}
                                                defaultValue={Array.isArray(groupList) && groupList.find(( value ) => value.group_id===group)}
                                            />
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Gender:<span style={{color:"red"}}>*</span></label>
                                            <select
                                                className="col-12 form-control"
                                                defaultValue={gender}
                                                onChange={(e) => setGender(e.target.value)}>
                                                <option value={true}>Select..</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            
							            </div>
                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row row-sm">
                                    <div className="col-sm-6">
                                            <label htmlFor="">Registration Number:</label>
                                            <input type="text" value={regNo} onChange={(e)=>setRegNo(e.target.value)} className="form-control"/>
							            </div>
                                        
                                    </div>
                                </div>
						        {loading5 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Updating...</button>)}
                                {!loading5 && <button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue">Update Student Details</button>}
						    </form>
					               
				        </div>
                    </div>
                           
                :
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600">Student Information</div>
                        </div>
                        <div className="box-body pt-20 user-profile">
                            <div className="table-responsive">
                                <table className="table mb-0 mw-100 color-span">
                                    {studentProfile && <tbody>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Names </span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{studentProfile.full_name}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Gender</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{studentProfile.gender}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Registration Number</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{studentProfile.reg_no?studentProfile.reg_no:"Not recorded"}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Student Code</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{studentProfile.student_code}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Group Name</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{studentProfile.group}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">School Name</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{studentProfile.school}</span> </td>
                                        </tr>
                                       
                                    </tbody>}
                                </table>
                                {loading && <Loader/>}
                            </div>
                        </div>
                    </div>
 
 }</div>
 <div className="col-6 col-xl-6">
          <div className="card custom-card" style={{borderRadius: "10px"}}>
                        <div className="card-body map-card">
                        <TableHeader
                            title="Address Book"
                            subtitle="List of all the student's contacts" 
                            viewButton={(
                                <a href="#" onClick={handleModal3} className="btn btn-info" style={{float:"right"}}>Add Contact</a>
                            )} 
                                
                        />  
                           
                  
                  <div className="border-top mt-1"></div>
                   <div className="table-responsive">
                   <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col"> Names</th>
                                        <th scope="col"> Contact Number</th>
                                        <th scope="col"> Relationship</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(studentContacts) && studentContacts.map((item, key) => (
                                            
                                             <tr key={key}>
                                                <th scope="row">{key+1}</th>
                                                <td>{item.full_name}</td>
                                                <td>{item.main_contact}</td>
                                                <td>{item.relationship}</td>
                                            </tr>
                                        ))}
                                       {studentContacts === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No contacts added to this student yet.
                          </td>
                        </tr>)} 
                                </tbody>
                            </table>
                            {loading3 && <Loader/>}
                            </div>               
                            
                              
                        </div>
			        </div>
        </div></div>

                <div className="card height-auto" >
                    <div className="card-body map-card">
                        <TableHeader
                            title="Call Logs"
                            subtitle="List of all the calls made by the student" 
                           
                                
                        />
                        <div className="border-top mt-3"></div>                    
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Duration</th>
                                        <th scope="col"> Contact</th>
                                        <th scope="col"> Calling Station</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(studentLogs) && studentLogs.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{item.created_at?.long_date}</th>
                                                <th scope="row">{item.duration}</th>
                                                <td><span>{item.contact?.full_name}</span><br/><span>{item.contact?.main_contact}</span></td>
                                                <td>{item.station?.station_name}</td>
                                            </tr>
                                        ))}
                                        {studentLogs === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No call logs for this student yet.
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

export default StudentProfile;