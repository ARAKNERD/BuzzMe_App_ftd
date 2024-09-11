import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import AppContainer from "../../Components/Structure/AppContainer";
import ajaxStudent from '../../util/remote/ajaxStudent'
import Loader from '../../Components/Common/Loader';
import useStateCallback from '../../util/customHooks/useStateCallback';
import TableHeader from '../../Components/Common/TableHeader';
import DistrictContext from '../../Context/DistrictContext';
import ajaxSchool from '../../util/remote/ajaxSchool';
import ajaxStation from '../../util/remote/ajaxStation';
import ajaxStudentGroup from '../../util/remote/ajaxStudentGroup';
import AuthContext from '../../Context/AuthContext';
import AddGroup from '../StudentGroups/AddGroup';
import ajaxCallStation from '../../util/remote/ajaxCallStation';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import TurnOnCallRestrictions from './TurnOnCallRestrictions';
import TurnOffCallRestrictions from './TurnOffCallRestrictions';

const SchoolProfile = props => {
    const [schoolProfile, setSchoolProfile] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const {id} = useParams();
    const [schoolStudents, setSchoolStudents] = useState(false);
    const [schoolStations, setSchoolStations] = useState(false);
  const [studentSearch, setStudentSearch] = useState(false);
  const [studentCount, setStudentCount] = useState(false);
  const [stationCount, setStationCount] = useState(false);

  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")
  const [page1,setPage1] = useState(1)
  const [meta1,setMeta1] = useState("")
  const {user} = useContext(AuthContext);

    const {districtList} = useContext(DistrictContext);
  const [query, setQuery] = useState("");
  const [groupList, setGroupList] = useState(false);




    const [school_id,setSchoolID] = useState("")
    const [schoolName,setSchoolName] = useState("")
    const [contact,setContact] = useState("")
    const [email,setEmail] = useState("")
    const [district,setDistrict] = useState("")
    const [address,setAddress] = useState("")

    const [first, setFirst] = useState("");

    const [active,setActive] = useState(false)
    const handleActive = ()=> setActive(true)
    const handleInActive = ()=> setActive(false)
    const [loading,setLoading] = useState(false)
    const [loading1,setLoading1] = useState(false)

    const [loading2,setLoading2] = useState(false)
    const [loading3,setLoading3] = useState(false)
    const [loading4,setLoading4] = useState(false)
    const [loading5,setLoading5] = useState(false)

    const data = {
        school_id: id
      };

      const data2 = {
        search: query,
        school_id: id,
      };

      const data3 = {
        school_id: id,
        page: page
      };

    useEffect(()=>{
      getSchoolStudents()
      getSchoolStations();
      getSchoolProfile();
      
    }, [])

    const setSchoolUpdate = () =>{
      handleActive()
      setSchoolName(schoolProfile.school_name)
      setContact(schoolProfile.contact)
      setEmail(schoolProfile.email)
      setDistrict(schoolProfile.district_id)
      setAddress(schoolProfile.address)
      setSchoolID(schoolProfile.school_id)
    }

    const handleUpdate = async(event) => {

        event.preventDefault()
        var data = {
          school_name: schoolName,
          contact: contact,
          email: email,
          district: district,
          address: address,
          school_id: id
        };
       setLoading5(true)
        const server_response = await ajaxSchool.updateSchool(data)
        setLoading5(false)
        if(server_response.status === "OK"){
            toast.success(server_response.message)
            getSchoolProfile()
            handleInActive()
        }
    };

    const getSchoolProfile =async()=>{
        setLoading2(true)
        const server_response = await ajaxSchool.fetchSchoolProfile(data);
        setLoading2(false)
        if(server_response.status==="OK"){
            //store results
            setSchoolProfile(server_response.details);
        }else{
            //communicate error
            setSchoolProfile("404");
        }
    }

    const getSchoolStudents = async () => {
      setLoading3(true);
      const server_response = await ajaxStudent.fetchStudentList(id, page);
        setLoading3(false);
        if (server_response.status === "OK") {
            setFirst(server_response.details.meta.offset_count);
            setMeta(server_response.details.meta.list_of_pages);
            setSchoolStudents(server_response.details.list); 
            if (query) {
                setStudentSearch(server_response.details.list); 
            }
        } else {
            setSchoolStudents("404");
        }
    };

    const countSchoolStudents = async () => {
      const server_response = await ajaxStudent.fetchStudentNumber(id);
      if (server_response.status === "OK") {
          setStudentCount(server_response.details);
      } else {
          setStudentCount("404");
      }
  };

  const countSchoolStations = async () => {
    const server_response = await ajaxCallStation.callStation_count(id);
    if (server_response.status === "OK") {
        setStationCount(server_response.details);
    } else {
        setStationCount("404");
    }
};

    const getGroups = async () => {
      setLoading1(true)
        const server_response = await ajaxStudentGroup.fetchGroupList(id);
        setLoading1(false)
        if (server_response.status === "OK") {
          setGroupList(server_response.details);
        }else {
          setGroupList("404");
        }
      };

    const getSchoolStations =async()=>{
        setLoading4(false)
        const server_response = await ajaxStation.fetchStationList(id,page1);
        setLoading4(false)
        if(server_response.status==="OK"){
          setMeta1(server_response.details.meta.list_of_pages)
          setSchoolStations(server_response.details.list);
        }else{
            //communicate error
            setSchoolStations("404");
        }
    }

  const searchStudents = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading(true);
      const server_response = await ajaxStudent.searchSchoolStudents(query, id, page);
      setLoading(false);
      if (server_response.status === "OK") {
        if (server_response.details.length === 0) {
          setStudentSearch([]);
        } else {
          setFirst(server_response.details.meta.offset_count);
          setMeta(server_response.details.meta.list_of_pages);
          setStudentSearch(server_response.details.list);
        }
      } else {
        setStudentSearch([]);
      }
  };

    // const getLocation = () => {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         setLat(position.coords.latitude);
    //         setLongitude(position.coords.longitude);
    //     });
    // }

    // useEffect(() => {
    //     if(!lat || !longitude){
    //     getLocation();
    //     }
    // }, [lat,longitude]);
  

  const setStudents = (e) => {
    e.preventDefault();
    setQuery("");
    setStudentSearch([]);
    setPage(1);
    getSchoolStudents();
    
  };

  const setNextPageNumber = () =>{
    if(meta.length===page){
      
    }
    else{
      setPage(page+1)
    }
    
  }

  const setPreviousPageNumber = () =>{
    if(page===1){
      
    }
    else{
      setPage(page-1)
    }
    
  }
  const setPageNumber = (e,item) =>{
    setPage(item)
  }
  const setNextPageNumber1 = () =>{
    if(meta1.length===page1){
      
    }
    else{
      setPage1(page1+1)
    }
    
  }

  const setPreviousPageNumber1 = () =>{
    if(page1===1){
      
    }
    else{
      setPage1(page1-1)
    }
    
  }
  const setPageNumber1 = (e,item) =>{
    setPage1(item)
  }
  useEffect(()=>{
    getSchoolStudents()
  }, [id, page])
  useEffect(()=>{
    getGroups()
    countSchoolStudents()
    countSchoolStations()
  }, [id])

  useEffect(()=>{
    searchStudents()
    
  }, [id, page])

  const handleModal3=()=>{
    setModal(false, ()=>setModal(<AddGroup schoolID={id} g={getGroups} isOpen={true}/>))
}

const restrictionsOn=()=>{
  setModal(false, ()=>setModal(<TurnOnCallRestrictions schoolID={id} g={getSchoolProfile} isOpen={true}/>))
}
const restrictionsOff=()=>{
  setModal(false, ()=>setModal(<TurnOffCallRestrictions schoolID={id} g={getSchoolProfile} isOpen={true}/>))
}
    return (
        <AppContainer title={"School Profile"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {modal}
            <section class="section profile">
      <div class="row">
        <div class="col-xl-5">
        <div className="row">
        <div class="col-lg-12">
          <div class="cards">
            <div class="card-body profile-card pt-4 d-flex flex-column gradient-my-blue">

              <h3 style={{color:"white"}}>{schoolProfile.school_name?schoolProfile.school_name:"..."}</h3>
              <h5 style={{color:"white"}}>{schoolProfile.district?schoolProfile.district:"..."}</h5>
              <div class="social-links mt-2 align-items-center ">
              {active?
                                <a href="#" onClick={handleInActive} className="btn btn-danger mr-3"><i className="fe fe-x"></i>Back</a>
                            :
                                <a href="#" onClick={setSchoolUpdate} className="btn btn-warning mr-3"><i className="far fa-edit mr-1"></i>Update Details</a>
                            }
              {/* {schoolProfile.is_restricted === "0"?
                                <a href="#" onClick={restrictionsOn} className="btn btn-warning mr-2"><i className="fa fa-power-off mr-1" style={{color:"green"}}></i>Turn On Call Restrictions</a>
                            :
                                <a href="#" onClick={restrictionsOff} className="btn btn-warning mr-2"><i className="fa fa-power-off mr-1" style={{color:"red"}}></i>Turn Off Call Restrictions</a>
                            } */}
              </div>
              
            </div>
            
          </div></div>
          <div class="col-lg-12">
          <div class="cards pt-3">
            <div class="card-body profile-card pt-4 d-flex flex-column">
            {active?
                    <>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600"> Update School Information</div>
                        </div>
                        <br/>
					        <form onSubmit={handleUpdate}>
						        <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-12">
                                            <label htmlFor="">School Name:<span style={{color:"red"}}>*</span></label>
                                            <input type="text" value={schoolName} style={{border: "1px solid grey"}} onChange={(e)=>setSchoolName(e.target.value)} className="form-control"/>
							            </div></div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
                        <div className="col-sm-6">
                                            <label htmlFor="">Contact:<span style={{color:"red"}}>*</span></label>
                                            <input type="text" value={contact} style={{border: "1px solid grey"}} onChange={(e)=>setContact(e.target.value)} className="form-control"/>
							            </div>
								        <div className="col-sm-6">
                                            <label htmlFor="">Email:<span style={{color:"red"}}>*</span></label>
                                            <input type="text" defaultValue={email} style={{border: "1px solid grey"}} onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
                                        <div className="col-sm-6">
                                            <label htmlFor="">Address:<span style={{color:"red"}}>*</span></label>
                                            <input type="text" defaultValue={address} style={{border: "1px solid grey"}} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
							            </div>
                          <div className="col-sm-6">
                                            <label htmlFor="">District:<span style={{color:"red"}}>*</span></label>
                                            <Select
                                                onChange={(e)=>setDistrict(e.district_id)}
                                                getOptionLabel ={(option)=>option.district_name}
                                                getOptionValue ={(option)=>option.district_id}
                                                isSearchable
                                                options={districtList}
                                                defaultValue={Array.isArray(districtList) && districtList.find(( value ) => value.district_id===district)}
                                            />
							            </div>   
                                    </div>
                                </div>
                               
                                
						        {loading5 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue" disabled><i class="fa fa-spinner fa-spin mr-2"></i>Updating...</button>)}
                                {!loading5 && <button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue">Update School Details</button>}
						    </form>
					               
				        
                    </>:
                <>
            <div className="box-header  border-0 pd-0">
                <div className="box-title fs-20 font-w600">School Information</div>
            </div>
            <table className="table mb-0 mw-100 color-span">
                                    {schoolProfile && <tbody>
                                      <tr>
                                            <td className="py-2 px-0"> <span className="w-50">School Name </span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.school_name}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Contact</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.contact}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Email</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.email}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Address</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.address}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">District</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.district}</span> </td>
                                        </tr>
                                       
                                        {/* <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Call Security</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.is_restricted ==="0"?<span class="badge badge-success">Unrestricted</span>:<span class="badge badge-danger">Restricted</span>}</span> </td>
                                        </tr> */}
                                       
                                    </tbody>}
                                </table>{loading2 && <Loader/>
                                }
                                </>}
          
              
            </div>
            
          </div></div>
          </div>


        </div>
        <div className='col-xl-7'>
        <div className="row">
            <div class="col-lg-12">
							<div class="card custom-card " style={{paddingBottom:"10px"}}>
              <div className="card-body map-card gradient-orange-peel">
              <div class="item-title mb-2" style={{color:"white"}}><b>SUMMARY</b></div>
								<div class="row" >
									<div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0 border-right" >
										<div class="text-center" >
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{studentCount ? studentCount.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Students Registered</p>
										</div>
									</div>
									<div class="col-xl-6 col-lg-12 col-sm-6 pr-0 pl-0">
										<div class="text-center">
											<h2 class="mb-1 number-font" style={{color:"white"}}><span class="counter">{stationCount ? stationCount.total_p : "..."}</span></h2>
											<p class="mb-0 text-light"> Active Stations</p>
										</div>
									</div>
								
								</div></div>
							</div></div>
                            <div class="col-lg-12">

          <div class="card">
            <div class="card-body pt-3">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row mb-1">
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="first">
                      Student List{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="second">
                      Student Groups{" "}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link size="sm" eventKey="third">
                      Calling Stations{" "}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  <form className="mg-t-10">
            <div className="row gutters-8">
              <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <input
                  type="text"
                  value={query} onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value === '') {
                      setStudents(e);
                    }
                  }}
                  placeholder="Search for student name..."
                  style={{border: "1px solid grey"}}

                  className="form-control"
                />
              </div>
              <div className="col-3-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <button
                  type="submit"
                  onClick={(e) => searchStudents(e)}
                  className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                  SEARCH
                </button>
               
              </div>
            </div>
          </form>
                 
                    <div className="table-responsive">
                    <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col" >No.</th>
                                        <th>Names</th>
                                        <th>Student Code</th>
                                        <th>Registration Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {studentSearch.length > 0 ? (
        studentSearch.map((item, key) => (
          <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.first_name} {item.last_name}</td>
                          <td>{item.username}</td>
                          <td>{item.reg_no?item.reg_no:"Not registered"}</td>
                        </tr>
        ))
    ) : schoolStudents === "404" ? (
        <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
                No students registered in this school yet.
            </td>
        </tr>
    ) : (
       
        (query) && (
            <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                    No search result(s) found.
                </td>
            </tr>
        )
    )}


                                
                                </tbody>
                                <div className='align-items-center justify-content-center pos-absolute' style={{left:'50%'}}>
      
      
    <button className='btn btn-dark' style={{borderRight:'1px solid yellow'}} onClick={setPreviousPageNumber}><i className='fa fa-angle-left mr-2'></i> Prev</button>
          {Array.isArray(meta) && meta.map((item)=>
          page===item?
          <button  style={{borderRight:'1px solid yellow'}} className='btn btn-primary'>{item}</button>
          :
          <button onClick={(e)=>setPageNumber(e,item)} style={{borderRight:'1px solid yellow'}} className='btn btn-dark'>{item}</button>
          )}


					<button style={{borderRight:'1px solid yellow'}} className='btn btn-dark' onClick={setNextPageNumber}>Next<i className='fa fa-angle-right ml-2'></i></button>
                </div>
                            </table>
                            {loading3 && <Loader/>}
                            {loading && <Loader/>}

                            </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                  <TableHeader
                            subtitle="List of all the student groups" 
                            viewButton={
                                <a href="#" onClick={handleModal3} className="btn btn-info" style={{float:"right"}}>Add Student Group</a>    
                            }        
                        /> 
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
                                    {loading1 && <Loader/>}
                            </div>

                   
                   
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                 
                  <div className="border-top mt-1"></div>
                   <div className="table-responsive">
                   <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                    <th>No.</th>
                      <th>Station Name</th>
                      <th>Station Code</th>
                      <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(schoolStations) && schoolStations.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <td>{key + 1}</td>
                          <td>{item.station_name}</td>
                          <td>{item.station_code}</td>
                          <td>{item.status==="300"?<span class="badge badge-success">Active</span>:
                          item.status==="200"?<span class="badge badge-warning">Inactive</span>:<span class="badge badge-danger">Off</span>}</td>
                                            </tr>
                                        ))}
                                        {schoolStations === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No calling stations installed within the school yet.
                          </td>
                        </tr>)}
                                </tbody>
                                <div className='align-items-center justify-content-center pos-absolute' style={{left:'50%'}}>
      
      
    <button className='btn btn-dark' style={{borderRight:'1px solid yellow'}} onClick={setPreviousPageNumber1}><i className='fa fa-angle-left mr-2'></i> Prev</button>
          {Array.isArray(meta1) && meta1.map((item)=>
          page===item?
          <button  style={{borderRight:'1px solid yellow'}} className='btn btn-primary'>{item}</button>
          :
          <button onClick={(e)=>setPageNumber1(e,item)} style={{borderRight:'1px solid yellow'}} className='btn btn-dark'>{item}</button>
          )}


					<button style={{borderRight:'1px solid yellow'}} className='btn btn-dark' onClick={setNextPageNumber1}>Next<i className='fa fa-angle-right ml-2'></i></button>
                </div>
                            </table>
                            {loading4 && <Loader/>}
                            </div>

                   
                   
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>  

            </div>
          </div>

        </div></div>
        </div>

        
      </div>
      
    </section>
            

        </AppContainer>
    )
}

export default SchoolProfile;
