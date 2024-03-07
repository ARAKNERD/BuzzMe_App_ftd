import React, {useContext} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Toaster} from "react-hot-toast";
import AddingStudent from "../../Components/students/AddingStudent";
import ViewSchoolStudents from "./ViewSchoolStudents";
import AuthContext from "../../Context/AuthContext";
function AddStudent(props) {
  const {user} = useContext(AuthContext);
  var school_id = user.school_user ? user.school_user.school.school_id : "";

  return (
    <AppContainer title="Add Student page">
      <Toaster position="top-center" reverseOrder={false} />

      <AddingStudent />

      <ViewSchoolStudents
        school={school_id}
        date_added={"Today"}
        group_id={""}
      />
    </AppContainer>
  );
}

export default AddStudent;
