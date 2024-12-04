import React, { useContext, useEffect, useState } from "react";
import AppContainer from "../Components/Structure/AppContainer";
import AuthContext from "../Context/AuthContext";
import { Toaster} from "react-hot-toast";
import SchoolContext from "../Context/SchoolContext";
import useStateCallback from "../util/customHooks/useStateCallback";
import TurnOnCallRestrictions from "../Components/Schools/TurnOnCallRestrictions";
import TurnOffCallRestrictions from "../Components/Schools/TurnOffCallRestrictions";
import StationContext from "../Context/StationContext";
import SchoolStations from "../Components/SchoolDashboard/SchoolStations";
import SchoolLogsChart from "../Components/SchoolDashboard/SchoolLogsChart";
import SummaryCount from "../Components/SchoolDashboard/SummaryCount";

function SchoolDashboard() {
  const {schoolID, schoolDashboardStations, getSchoolDashboardStations} = useContext(StationContext);
  const { user } = useContext(AuthContext);
  const { setSchoolId, schoolDetails, studentCount, schoolLogsToday, schoolLogsThisWeek, schoolLogsThisMonth, schoolContactsCount } = useContext(SchoolContext);
  const [modal, setModal] = useStateCallback(false);
 
  useEffect(() => {
    setSchoolId(schoolDetails.school_id);
  }, [schoolDetails.school_id, setSchoolId]);

  useEffect(() => {
    getSchoolDashboardStations();
   
  }, [schoolID]);

  const restrictionsOn=()=>{
    setModal(false, ()=>setModal(<TurnOnCallRestrictions schoolID={schoolDetails.school_id} isOpen={true}/>))
  }

  const restrictionsOff=()=>{
    setModal(false, ()=>setModal(<TurnOffCallRestrictions schoolID={schoolDetails.school_id} isOpen={true}/>))
  }


  return (
    <AppContainer title={"Dashboard"}>
      <Toaster position="top-center" reverseOrder={false} />
      {modal}
      <div className="row">
        <div class="col-4-xxxl col-12">
          <div class="card dashboard-card-ten">
            <div class="card-body gradient-my-blue">
              <div class="heading-layout1">
                <div class="item-title">
                  <h3 style={{ color: "white" }}>Welcome!</h3>
                </div>
              </div>
              <div class="student-info">
                <div class="media media-none--xs">
                  <div class="item-img">
                    <img src={process.env.PUBLIC_URL + "/assets/img/figure/user55.png"} style={{ backgroundColor: "white" }} alt="School Admin"/>
                  </div>
                  <div class="media-body">
                    <h3 class="item-title" style={{ color: "white" }}>{user.full_name}</h3>
                    <p style={{ color: "white" }}> School Administrator</p>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table mt-2 mw-100 color-span">
                    <tbody>
                      <tr>
                        <td className="py-2 px-0" style={{ color: "white" }}>{" "}
                          <span className="w-50">School Name </span>{" "}
                        </td>
                        <td style={{ color: "white" }}>:</td>
                        <td className="py-2 px-0" style={{ color: "white" }}>{" "}
                          <span className="">
                            <b>{schoolDetails.school_name}</b>
                          </span>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="social-links mt-2 align-items-center ">
                
                  {schoolDetails.school_restrictions === "0"?
                    <a href="#" onClick={restrictionsOn} className="btn btn-warning mr-2"><i className="fa fa-power-off mr-1" style={{color:"green"}}></i>Turn On Call Restrictions</a>
                  :
                    <a href="#" onClick={restrictionsOff} className="btn btn-warning mr-2"><i className="fa fa-power-off mr-1" style={{color:"red"}}></i>Turn Off Call Restrictions</a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <SummaryCount studentsNumber={studentCount} schoolBuzzCallsThisMonth={schoolLogsThisMonth} schoolBuzzCallsThisWeek={schoolLogsThisWeek}
        schoolBuzzCallsToday={schoolLogsToday} schoolContacts={schoolContactsCount}/>

      </div>

      <div className="row">
        <SchoolStations schoolDashboardStations={schoolDashboardStations}/>

        <SchoolLogsChart/>
      </div>
    </AppContainer>
  );
}

export default SchoolDashboard;
