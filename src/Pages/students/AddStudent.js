import React, {useContext} from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Toaster} from "react-hot-toast";
import AddingStudent from "../../Components/students/AddingStudent";
import AuthContext from "../../Context/AuthContext";
import TodayStudents from "./TodayStudents";
function AddStudent(props) {
  const {user} = useContext(AuthContext);
  console.log(user);
  var school_id = user.school_user ? user.school_user.school.school_id : "";
  // console.log(school_id);
  return (
    <AppContainer title="Add Student">
      <Toaster position="top-center" reverseOrder={false} />

      <AddingStudent />

      <TodayStudents school={school_id} group_id={""} />
    </AppContainer>
  );
}

export default AddStudent;
