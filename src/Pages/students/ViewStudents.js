import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";

import {useContext} from "react";

import ViewSchoolStudents from "./ViewSchoolStudents";
import AuthContext from "../../Context/AuthContext";
function ViewStudents() {
  const {user} = useContext(AuthContext);
  var school_id = user.school_user ? user.school_user.school.school_id : "";

  return (
    <AppContainer title="Students">
      <div className="row">
        <div className="col-12">
          <ViewSchoolStudents school={school_id} />
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewStudents;
