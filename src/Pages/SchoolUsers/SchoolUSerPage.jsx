import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppContainer from "../../Components/Structure/AppContainer";
import ListSchoolUsers from "./ListSchoolUsers";
import AddSchoolUser from "./AddSchoolUser";
import AuthContext from "../../Context/AuthContext";
function SchoolUSerPage() {
  const {user} = useContext(AuthContext);
  // console.log(user);
  var school_id = user.school_user ? user.school_user.school.school_id : "";
  return (
    <AppContainer title="School Administrators">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <AddSchoolUser />
        </div>
        <div className="col-lg-12 col-md-12 mt-3">
          <ListSchoolUsers school={school_id} />
        </div>
      </div>
    </AppContainer>
  );
}

export default SchoolUSerPage;
