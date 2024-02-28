import React, {useEffect, useState} from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";

import ViewParents from "./Pages/Parents/ViewParents";
import AddParent from "./Pages/Parents/AddParent";
import SuperProvider from "./Context/SuperProvider";
import Dashboard from "./Pages/Dashboard";
import ViewStudents from "./Pages/students/ViewStudents";
import AddStudent from "./Pages/students/AddStudent";
import ViewSchool from './Pages/Schools/ViewSchool';
import AddSchool from "./Pages/Schools/AddSchool";
import UpdateSchool from "./Pages/Schools/UpdateSchool";
import ListSchoolUsers from "./Pages/SchoolUsers/ListSchoolUsers";
import AddSchoolUser from "./Pages/SchoolUsers/AddSchoolUser";
import UpdateSchoolUser from "./Pages/SchoolUsers/UpdateSchoolUser";
import ListContacts from "./Pages/Contacts/ListContacts";
import AddContacts from "./Pages/Contacts/AddContacts";
import UpdateContact from "./Pages/Contacts/UpdateContact";
import UpdateChargeRate from "./Pages/ChargeRate/UpdateChargeRate";
import AddChargeRate from "./Pages/ChargeRate/AddChargeRate";
import ListChargeRate from "./Pages/ChargeRate/ListChargeRate";
import AddGroup from "./Pages/StudentGroups/AddGroup";
import ListGroups from "./Pages/StudentGroups/ListGroups";

function App(props) {
  return (
    <SuperProvider>
      <Router forceRefresh={false}>
        <Switch>
              <Route path="/" element={<Dashboard />} />
              

              {/* School routes */}
        <Route path="/schools/view" element={<ViewSchool />} />
        <Route path="/schools/add" element={<AddSchool />} />
        <Route path="/schools/edit" element={<UpdateSchool />} />
      {/* End school routes */}

      {/* School User routes */}
      <Route path="/schools/user/view" element={<ListSchoolUsers />} />
        <Route path="/schools/user/add" element={<AddSchoolUser />} />
        <Route path="/schools/user/edit" element={<UpdateSchoolUser />} />
      {/* End School User routes */}


      {/* Student Contact routes */}
      <Route path="/contacts/view" element={<ListContacts />} />
        <Route path="/contacts/add" element={<AddContacts />} />
        <Route path="/contacts/edit" element={<UpdateContact />} />
      {/* End Student Contact routes */}

      {/* Charge rate routes */}
      <Route path="/rate/view" element={<ListChargeRate />} />
        <Route path="/rate/add" element={<AddChargeRate />} />
        <Route path="/rate/edit" element={<UpdateChargeRate />} />
      {/* End Charge rate routes */}

      {/* Parents */}
      <Route path="/parents" element={<ViewParents/>} />
      <Route path="/parents/add" element={<AddParent/>} />
      {/* End parent */}

      {/* Students */}
      <Route path="/students" element={<ViewStudents/>} />
      <Route path="/students/add" element={<AddStudent/>} />
     {/* End student */}

     {/* Class Groups */}
     <Route path="/class-groups" element={<ListGroups/>} />
      <Route path="/class-groups/add" element={<AddGroup/>} />
     {/* End student */}
             

         
        </Switch>
      </Router>
    </SuperProvider>

  );
}

export default App;
