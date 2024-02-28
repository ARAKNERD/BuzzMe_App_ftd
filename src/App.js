import React, {useEffect, useState} from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";

// import Dashboard from "./Pages/Dashboard";
// import LoginPage from "./Pages/LoginPage";
import ViewParents from "./Pages/Parents/ViewParents";
import AddParent from "./Pages/Parents/AddParent";

// import DashboardPage from "./Pages/DashboardPage";
import SuperProvider from "./Context/SuperProvider";
import Dashboard from "./Pages/Dashboard";
import ViewStudents from "./Pages/students/ViewStudents";
import AddStudent from "./Pages/students/AddStudent";

function App(props) {
  return (
    <SuperProvider>
      <Router forceRefresh={false}>
        <Switch>
          
            {/* <>
              <Route path="*" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={!loggedIn ? (<Navigate replace to="/login" />) : (<DashboardPage />)}/>
            </> */}
         
         
            <>
              {/* <Route path="/" element={!loggedIn ? (<Navigate replace to="/login" />) : (<DashboardPage />)}/>
              <Route path="/login" element={loggedIn ? <Navigate replace to="/" /> : <LoginPage />}/>
               */}
              <Route path="/" element={<Dashboard />} />
              {/* Parents */}
              <Route path="/parents" element={<ViewParents/>} />
              <Route path="/parents/add" element={<AddParent/>} />
              {/* End parent */}
              {/* Parents */}
              <Route path="/students" element={<ViewStudents/>} />
              <Route path="/students/add" element={<AddStudent/>} />
              {/* End parent */}
             

            </>
         
        </Switch>
      </Router>
    </SuperProvider>
  );
}

export default App;
