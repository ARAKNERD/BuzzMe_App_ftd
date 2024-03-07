import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import { useParams } from 'react-router-dom'
import ViewSchoolStudents from "../students/ViewSchoolStudents";

function GroupStudents() {
    const {id} = useParams();

  return (
    <AppContainer title="Group Students">
      <div className="row">
        <div className="col-12">
          <ViewSchoolStudents
            school={""}
            date_added={""}
            group_id={id}
          />
        </div>
      </div>
    </AppContainer>
  );
}

export default GroupStudents;
