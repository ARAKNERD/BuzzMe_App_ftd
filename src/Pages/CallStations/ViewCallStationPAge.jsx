import React, {useEffect, useState} from "react";
import AppContainer from "../../Components/Structure/AppContainer";

import {useContext} from "react";

import AuthContext from "../../Context/AuthContext";
import ViewCallingStations from "./ViewCallingStations";
function ViewStudents() {
  const {user} = useContext(AuthContext);
  var school_id = user.school_user ? user.school_user.school.school_id : "";

  return (
    <AppContainer title="View call stations">
      <div className="row">
        <div className="col-12">
          <ViewCallingStations date_added={""} />
        </div>
      </div>
    </AppContainer>
  );
}

export default ViewStudents;
