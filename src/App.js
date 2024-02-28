import React, {useEffect, useState} from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
// import SuperProvider from "./Context/SuperProvider";
import ViewSchool from './Pages/Schools/ViewSchool';
import AddSchool from "./Pages/Schools/AddSchool";
import UpdateSchool from "./Pages/Schools/UpdateSchool";
import ListSchoolUsers from "./Pages/SchoolUsers/ListSchoolUsers";
import AddSchoolUser from "./Pages/SchoolUsers/AddSchoolUser";
import UpdateSchoolUser from "./Pages/SchoolUsers/UpdateSchoolUser";
import ListContacts from "./Pages/Contacts/ListContacts";
import AddContacts from "./Pages/Contacts/AddContacts";
import UpdateContact from "./Pages/Contacts/UpdateContact";

function App(props) {
  return (
  //  <SuperProvider>

    <Router>
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
      {/* End school routes */}


      {/* Student Contact routes */}
      <Route path="/contacts/view" element={<ListContacts />} />
        <Route path="/contacts/add" element={<AddContacts />} />
        <Route path="/contacts/edit" element={<UpdateContact />} />
      {/* End school routes */}
      

      </Switch>
    </Router>

  //  </SuperProvider>
  );
}

export default App;
