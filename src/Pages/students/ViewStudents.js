import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import TableHeader from "../../Components/Common/TableHeader";
import Loader from "../../Components/Common/Loader";
import { useContext } from "react";
import StudentContext from "../../Context/StudentContext";

function ViewStudents() {

  const {studentList} = useContext(StudentContext);

  return(
  <AppContainer title="Students">
                
				<div className="col-lg-12">
          <div className="card custom-card" style={{marginTop:"25px", borderRadius:"10px"}}>
            <div className="card-body map-card">
              <TableHeader
                title="Students List"
                subtitle="List of all the students sorted according to the recently added"    
              />
              <div className="border-top mt-3"></div>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap mg-b-0">
                  <thead>
                    <tr>
                      <th scope="col" className="wd-10p">No.</th>
                      <th scope="col">Names</th>
                      <th scope="col">Reg Number</th>
                      <th scope="col">School</th>
                      <th scope="col">Student Group</th>
                      
                    
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(studentList) && studentList.length > 0 ? (
                      studentList.map((item, key) => (
                        <tr key={key}>
                          <th scope='row'>{key+1}</th>
                          <td>{item.names}</td>
                          <td>{item.reg_no}</td>
                          <td>{item.school?.school_name}</td>
                          <td>{item.group?.group_name}</td>
                        </tr>
                      ))
                    ): (
                      <tr>
                        <td colSpan="5" style={{textAlign:"center"}}>No students registered yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!studentList && <Loader/>}
              </div>
            </div>
			    </div>
				</div>
    
    </AppContainer>
  )
}

export default ViewStudents;
