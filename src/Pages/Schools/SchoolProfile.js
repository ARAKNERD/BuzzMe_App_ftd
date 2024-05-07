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

const SchoolProfile = props => {
    const [schoolProfile, setSchoolProfile] = useState(false);
    const [modal, setModal] = useStateCallback(false);
    const {id} = useParams();
    const [schoolStudents, setSchoolStudents] = useState(false);
    const [schoolStations, setSchoolStations] = useState(false);
  const [studentSearch, setStudentSearch] = useState(false);
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState("")

    const {districtList} = useContext(DistrictContext);
  const [query, setQuery] = useState("");




    const [school_id,setSchoolID] = useState("")
    const [schoolName,setSchoolName] = useState("")
    const [contact,setContact] = useState("")
    const [email,setEmail] = useState("")
    const [district,setDistrict] = useState("")
    const [lat,setLat] = useState("")
    const [longitude,setLongitude] = useState("")
    const [address,setAddress] = useState("")


    const [active,setActive] = useState(false)
    const handleActive = ()=> setActive(true)
    const handleInActive = ()=> setActive(false)
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const [loading3,setLoading3] = useState(false)
    const [loading4,setLoading4] = useState(false)
    const [loading5,setLoading5] = useState(false)

    const data = {
        school_id: id
      };

      const data2 = {
        query: query,
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
      setDistrict(schoolProfile.district.district_id)
      setLat(schoolProfile.lat)
      setAddress(schoolProfile.address)
      setLongitude(schoolProfile.lng)
      setSchoolID(schoolProfile.school_id)
    }

    const handleUpdate = async(event) => {

        event.preventDefault()
        var data = {
          school_name: schoolName,
          contact: contact,
          email: email,
          district: district,
          lat: lat,
          lng: longitude,
          address: address,
          school_id: id
        };
       setLoading5(true)
        const server_response = await ajaxSchool.updateSchool(data)
        setLoading5(false)
        if(server_response.status === "OK"){
            toast.success(server_response.message)
            getSchoolProfile()
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
        setLoading3(true)
        const server_response = await ajaxStudent.fetchStudentList(id,page);
        setLoading3(false)
        if (server_response.status === "OK") {
            setMeta(server_response.details.meta.list_of_pages)
            setSchoolStudents(server_response.details.list);
        } else {
            setSchoolStudents("404");
        }
    };

    const getSchoolStations =async()=>{
        setLoading4(false)
        const server_response = await ajaxStation.fetchStationList(id);
        setLoading4(false)
        if(server_response.status==="OK"){
            setSchoolStations(server_response.details);
        }else{
            //communicate error
            setSchoolStations("404");
        }
    }

    const searchStudents = async (e) => {
      if (e) {
          e.preventDefault();
      }
      if (!query) {
          toast.error("Please enter name of student.");
      } else {
          setLoading(true);
          const server_response = await ajaxStudent.searchStudent(data2);
          setLoading(false);
          if (server_response.status === "OK") {
              if (server_response.details.length === 0) {
                  setStudentSearch([]);
              } else {
                  setStudentSearch(server_response.details);
              }
          } else {
              setStudentSearch([]);
          }
      }
  };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }

    useEffect(() => {
        if(!lat || !longitude){
        getLocation();
        }
    }, [lat,longitude]);
  
  const setStudents = (e) =>{
    e.preventDefault()
   setStudentSearch(false)
   setQuery('')
  }
  
  useEffect(() => {
      if (query) {
          searchStudents();
      }
  }, [query]);

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
  useEffect(()=>{
    getSchoolStudents()
  }, [id, page])
    return (
        <AppContainer title={"School Profile"} >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {modal}

            <div className="col-12 col-xl-12">
                <div className="box user-pro-list overflow-hidden mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                    {schoolProfile && <div className="box-body" style={{position:"relative"}}>
                        <div className="user-pic text-center" >
                        {/* <div class="main-profile-overview widget-user-image text-center">
							<div class="main-img-user"><img alt="avatar" src={
                      process.env.PUBLIC_URL + "/assets/img/figure/user55.png"
                    }/></div>
						</div> */}
                            <div className="pro-user mt-3" style={{marginTop: "1rem !important"}}>
                                <h3 className="pro-user-username text-dark mb-2 fs-15 mt-42 color-span" style={{lineHeight: "1.5"}}>{schoolProfile.school_name}</h3>
                                <h6 className="pro-user-desc text-muted fs-14">{schoolProfile.district?.district_name}</h6>
                            </div>
                        </div>
                    </div>}

                    <div className="box-footer pt-41" style={{paddingTop: "41px !important"}}>
                        <div className="btn-list text-center">
                            {active?
                                <a href="#" onClick={handleInActive} className="btn btn-danger mr-2"><i className="fe fe-x"></i>Back</a>
                            :
                                <a href="#" onClick={setSchoolUpdate} className="btn btn-warning mr-2"><i className="far fa-edit mr-1"></i>Update School Info</a>
                            }
                            
                            
                        </div>
                    </div>
                </div>

                {active?
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600"> Update School Information</div>
                        </div>
                        <br/>
                        <div className="box-body pt-20 user-profile">
					        <form onSubmit={handleUpdate}>
						        <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">School Name</label>
                                            <input type="text" defaultValue={schoolName} onChange={(e)=>setSchoolName(e.target.value)} className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Contact:</label>
                                            <input type="text" defaultValue={contact} onChange={(e)=>setContact(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">Email:</label>
                                            <input type="text" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Address:</label>
                                            <input type="text" defaultValue={address} onChange={(e)=>setAddress(e.target.value)} className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
						            <div className="row row-sm">
								        <div className="col-sm-6">
                                            <label htmlFor="">Latitude Co-ordinates:</label>
                                            <input type="text" defaultValue={lat} onChange={(e)=>setLat(e.target.value)} readOnly className="form-control"/>
							            </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="">Longitude Co-ordinates:</label>
                                            <input type="text" defaultValue={longitude} onChange={(e)=>setLongitude(e.target.value)} readOnly className="form-control"/>
							            </div>
                                       
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row row-sm">
                                        <div className="col-sm-6">
                                            <label htmlFor="">District:</label>
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
                                {loading5 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue" disabled ><i class="fa fa-spinner fa-spin mr-2"></i>Updating...</button>)}
                                {!loading5 && (<button style={{ width: "100%" }} className="btn-fill-md text-light bg-dodger-blue">Update School Details</button>)}
						       
						    </form>
					               
				        </div>
                    </div>
                           
                :
                    <div className="box left-dot mb-30" style={{marginBottom: "30px", backgroundColor: "white", padding: "25px" ,boxShadow: "10px", borderRadius: "10px"}}>
                        <div className="box-header  border-0 pd-0">
                            <div className="box-title fs-20 font-w600">School Information</div>
                        </div>
                        <div className="box-body pt-20 user-profile">
                            <div className="table-responsive">
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
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.district?.district_name}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Latitude Co-ordinates</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.lat?schoolProfile.lat:"Not yet updated"}</span> </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-0"> <span className="w-50">Longitude Co-ordinates</span> </td>
                                            <td>:</td>
                                            <td className="py-2 px-0"> <span className="">{schoolProfile.lng?schoolProfile.lng:"Not yet updated"}</span> </td>
                                        </tr>
                                       
                                    </tbody>}
                                </table>
                                {loading2 && <Loader/>}
                            </div>
                        </div>
                    </div>
                }

                <div className="card height-auto" >
                    <div className="card-body map-card">
                        <TableHeader
                            title="School Students"
                            subtitle="List of all the students within the school" 
                           
                                
                        />
                        <form className="mg-t-10">
            <div className="row gutters-8">
              <div className="col-9-xxxl col-xl-6 col-lg-6 col-6 form-group">
                <input
                  type="text"
                  value={query} onChange={(e) => setQuery(e.target.value)}
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
                <button
                  type="submit"
                  onClick={(e) => setStudents(e)}
                  className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-martini ml-2">
                  RESET
                </button>
              </div>
            </div>
          </form>
                        <div className="border-top mt-1"></div>                    
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap mg-b-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th>Names</th>
                                        <th>Student Code</th>
                                        <th>Registration Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {studentSearch && Array.isArray(studentSearch) ? 
                        ( studentSearch.map((item, key) => (
                          <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.names}</td>
                          <td>{item.student_code}</td>
                          <td>{item.reg_no}</td>
                        </tr>
                        )))
                    :  (
                                    Array.isArray(schoolStudents) && schoolStudents.map((item, key) => (
                                            
                                             <tr key={key} >
                                                <th scope="row">{key+1}</th>
                                                <td>{item.names}</td>
                                                <td className="text-dark">{item.student_code}</td>
                                                <td className="text-dark">{item.reg_no}</td>
                                            </tr>
                                        ))
                                    )}
                        {schoolStudents === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No students registered in this school yet.
                          </td>
                        </tr>)}
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
                        </div>
                              
                    </div>
			    </div>

                <div className="card height-auto" >
                    <div className="card-body map-card">
                        <TableHeader
                            title="School Stations"
                            subtitle="List of all the stations installed within the school" 
                           
                                
                        />
                        <div className="border-top mt-3"></div>                    
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
                          <td>{item.status==="1"?<span class="badge badge-success">Active</span>:<span class="badge badge-danger">Offline</span>}</td>
                                            </tr>
                                        ))}
                                        {schoolStations === "404" && (<tr>
                          <td colSpan="4" style={{textAlign: "center"}}>
                            No calling stations installed within the school yet.
                          </td>
                        </tr>)}
                                </tbody>
                            </table>
                            {loading4 && <Loader/>}
                        </div>
                              
                    </div>
			    </div>

                

                

            </div>

        </AppContainer>
    )
}

export default SchoolProfile;