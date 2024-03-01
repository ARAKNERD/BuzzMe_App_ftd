import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../Components/Structure/AppContainer";
import ajaxSchool from "../util/remote/ajaxSchool";
import ajaxStudent from "../util/remote/ajaxStudent";
import AuthContext from "../Context/AuthContext";

function Dashboard() {

  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const [studentsNumber, setStudentsNumber] = useState(false);
  const {user}  = useContext(AuthContext)

  const getStudentsNumber =async()=>{

    const server_response = await ajaxStudent.fetchStudentNumber(user.school_user?.school?user.school_user.school.school_id:"");
     
    if(server_response.status==="OK"){
       //store results
       setStudentsNumber(server_response.details);
    }else{
       //communicate error
       setStudentsNumber("404");
    }
  }

  const getSchoolsNumber =async()=>{

    const server_response = await ajaxSchool.fetchSchoolNumber();
     
    if(server_response.status==="OK"){
       //store results
       setSchoolsNumber(server_response.details);
    }else{
       //communicate error
       setSchoolsNumber("404");
    }
  }

  useEffect(()=>{
    getSchoolsNumber();
  }, [])

  useEffect(()=>{
    getStudentsNumber();
  }, [user.school_user?.school?user.school_user.school.school_id:""])


  return (
    <div>
      <AppContainer title={"Dashboard"}>
        {/* Dashboard summery Start Here */}
        <div className="row gutters-20">
        <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="item-icon bg-light-blue">
                    <i className="flaticon-multiple-users-silhouette text-blue" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="item-content">
                    <div className="item-title">Schools</div>
                    <div className="item-number">
                      <span className="counter">
                        {schoolsNumber? schoolsNumber.total_p:"..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="dashboard-summery-one mg-b-20">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="item-icon bg-light-green">
                    <i className="flaticon-classmates text-green" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="item-content">
                    <div className="item-title">Students</div>
                    <div className="item-number">
                      <span className="counter">
                      {studentsNumber? studentsNumber.total_p:"..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
         
        </div>
        {/* Dashboard summery End Here */}
        {/* Dashboard Content Start Here */}
       
        {/* Dashboard Content End Here */}
        
      </AppContainer>
    </div>
  );
}

export default Dashboard;
