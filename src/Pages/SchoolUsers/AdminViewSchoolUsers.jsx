import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AppContainer from "../../Components/Structure/AppContainer";
import ListSchoolUsers from "./ListSchoolUsers";
import AddSchoolUser from "./AddSchoolUser";

function AdminViewSchoolUsers() {
  return (
    <AppContainer title="School Administrators">
      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
          <ListSchoolUsers school={""} />
        </div>
      </div>
    </AppContainer>
  );
}

export default AdminViewSchoolUsers;
