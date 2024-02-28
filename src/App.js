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
      

      </Switch>
    </Router>

  //  </SuperProvider>
  );
}

export default App;
