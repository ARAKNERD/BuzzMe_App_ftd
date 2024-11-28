import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import AppContainer from "../../Components/Structure/AppContainer";
import Loader from '../../Components/Common/Loader';
import useStateCallback from '../../util/customHooks/useStateCallback';
import TableHeader from '../../Components/Common/TableHeader';
import DistrictContext from '../../Context/DistrictContext';
import ajaxSchool from '../../util/remote/ajaxSchool';
import ajaxStudentGroup from '../../util/remote/ajaxStudentGroup';
import AddGroup from '../StudentGroups/AddGroup';
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import TurnOnCallRestrictions from '../../Components/Schools/TurnOnCallRestrictions';
import TurnOffCallRestrictions from '../../Components/Schools/TurnOffCallRestrictions';
import SchoolContext from '../../Context/SchoolContext';
import StudentsList from '../../Components/Schools/SchoolProfile/StudentsList';
import Pagination from '../../Components/Common/Pagination';
import SearchForm from '../../Components/Common/SearchForm';
import SummaryCount from '../../Components/Schools/SchoolProfile/SummaryCount';
import StationList from '../../Components/Schools/SchoolProfile/StationList';
import SchoolInformation from '../../Components/Schools/SchoolProfile/SchoolInformation';

const SchoolProfilePage = props => {

  const {schoolProfile, schoolId, getSchoolProfile, setSchoolId, studentCount, stationCount, schoolStations, schoolStudents, stationFirst, stationMeta, stationPage, studentsFirst, studentsPage,
    setStudentsPage, searchSchoolStudents, studentsMeta, studentsQuery, setStudentsQuery, setStationPage, getSchoolStudents, loading3, loading4
  } = useContext(SchoolContext);

  const [modal, setModal] = useStateCallback(false);
  const {id} = useParams();
  const [groupList, setGroupList] = useState(false);

  
  const [loading1,setLoading1] = useState(false)

  const [loading2,setLoading2] = useState(false)

  

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
  
  const setStudents = (e) => {
    e.preventDefault();
    setStudentsQuery("");
    setStudentsPage(1);
    getSchoolStudents(1);
    
  };

  const handlePagination = (newPage) => {
    if (newPage > 0 && newPage <= studentsMeta.length) {
      setStudentsPage(newPage);
    }
  };

  const handlePagination1 = (newPage) => {
    if (newPage > 0 && newPage <= stationMeta.length) {
      setStationPage(newPage);
    }
  };

  useEffect(() => {
    setSchoolId(id);
  }, [id, setSchoolId]);

  useEffect(()=>{
    getGroups()
  }, [id])

  useEffect(() => {
    if(schoolId){
      if (studentsQuery) {
        searchSchoolStudents();
      } else {
        getSchoolStudents(studentsPage, schoolId);
      }
    }  
  }, [studentsPage, schoolId]);

  const handleModal3=()=>{
      setModal(false, ()=>setModal(<AddGroup schoolID={schoolId} g={getGroups} isOpen={true}/>))
  }

  

  return (
    <AppContainer title={"School Profile"} >
      <Toaster position="top-center" reverseOrder={false}/>
      {modal}

      <section class="section profile">
        <div class="row">
          <div class="col-xl-5">
            <SchoolInformation schoolId={schoolId} schoolProfile={schoolProfile} getSchoolProfile={getSchoolProfile}/>
          </div>

          <div className='col-xl-7'>
            <div className="row">
              <SummaryCount studentCount={studentCount} stationCount={stationCount}/>

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
                          <SearchForm searchTerm={studentsQuery} setSearchTerm={setStudentsQuery} searchItems={searchSchoolStudents} setItems={setStudents}
                          setPage={setStudentsPage} placeholder="Search for student name..."/>

                          <div className="table-responsive">
                            {loading4 || loading3 ? (
                              <Loader /> 
                            ) : (
                              <StudentsList schoolStudents={schoolStudents} studentsFirst={studentsFirst}/>
                            )}
                          </div>

                          <Pagination currentPage={studentsPage} totalPages={studentsMeta.length} onPageChange={handlePagination}/>
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
                          {loading3 ? (
                            <Loader />
                          ) : (
                            <StationList schoolStations={schoolStations} stationFirst={stationFirst}/>
                          )}
                        </div>

                        <Pagination currentPage={stationPage} totalPages={stationMeta.length} onPageChange={handlePagination1}/>

                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>  

                  </div>
                </div>

              </div>
          </div>
          </div>

      
    </div>
    
  </section>
          

      </AppContainer>
  )
}

export default SchoolProfilePage;
