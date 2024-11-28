import React from "react";
import AppContainer from "../../Components/Structure/AppContainer";
import {Toaster} from "react-hot-toast";
import AddSchoolForm from "../../Components/Schools/AddSchoolForm";
import RecentlyRegisteredSchools from "../../Components/Schools/RecentlyRegisteredSchools";

function RegisterSchoolPage() {

  return (
    <AppContainer title={"Register School"}>
      <Toaster position="top-center" reverseOrder={false} />

      <AddSchoolForm/>

      <RecentlyRegisteredSchools/>

    </AppContainer>
  );
}

export default RegisterSchoolPage;
