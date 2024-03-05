import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Toaster} from "react-hot-toast";
import AddingStudent from "../../Components/students/AddingStudent";
import ViewSchoolStudents from "./ViewSchoolStudents";

function AddStudent() {
  return (
    <AppContainer title="Add Student page">
      <Toaster position="top-center" reverseOrder={false} />

      <AddingStudent />

      <ViewSchoolStudents />
    </AppContainer>
  );
}

export default AddStudent;
