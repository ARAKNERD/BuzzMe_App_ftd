import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import AuthContext from "../../Context/AuthContext";
import ajaxStudent from "../../util/remote/ajaxStudent";
import {useParams} from "react-router-dom";
function StudentCards() {
  const {user} = useContext(AuthContext);
  const {student_id, group_id, school_id} = useParams();

  // var school = user.school_user ? user.school_user.school.school_id : "";

  useEffect(() => {
    getStudentList();
  }, []);
  const [studentsData, setStudentsData] = useState("404");
  const getStudentList = async () => {
    var data = {
      school_id: school_id,
      student_id: student_id !== "null" ? student_id : "",
      group_id: group_id !== "null" ? group_id : "",
    };

    // if (student_id) {
    //   data["student_id"] = student_id;
    // }
    // if (group_id) {
    //   data["group_id"] = group_id;
    // }

    const server_response = await ajaxStudent.fetchStudentCardList(data);
    if (server_response.status === "OK") {
      setStudentsData(server_response.details);
    } else {
      setStudentsData("404");
    }
  };
  const Print = () => {
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    window.print();
    window.location.reload();
    document.body.innerHTML = originalContents;
  };
  return (
    <AppContainer title="Student Cards">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <button
            className="btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue"
            type="button"
            onClick={Print}>
            Print Cards
          </button>
        </div>
        <div className="col-lg-12 col-md-12">
          <div className="" id="printablediv">
            <div style={{textAlign: "center", marginTop: "50px"}}>
              <h1>Student Cards</h1>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}>
                {Array.isArray(studentsData) &&
                  studentsData.map((student, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        width: "400px",
                        pageBreakInside: "avoid", // Prevent breaking across pages
                      }}>
                      <img
                        src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
                        alt="Logo"
                        style={{
                          width: "200px",
                          height: "100px",
                          marginBottom: "10px",
                        }}
                      />
                      <h2>{student.school.school_name}</h2>
                      <h6>
                        {" "}
                        <u> student codeslip </u>
                      </h6>
                      <p>Name: {student.names}</p>
                      <p>
                        Student Code: <strong>{student.student_code}</strong>
                      </p>
                      {/* Display additional student information here */}
                    </div>
                  ))}

                {studentsData === "404" && (
                  <>
                    <div
                      className="col-12 text-center text-info"
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                      }}>
                      <hr
                        style={{
                          width: "100%",
                        }}
                        className="text-center"
                      />
                      No data found
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default StudentCards;
