import React, {useEffect, useState} from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

import ViewParents from "./Pages/Parents/ViewParents";
import AddParent from "./Pages/Parents/AddParent";
import SuperProvider from "./Context/SuperProvider";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import ViewStudents from "./Pages/students/ViewStudents";
import AddStudent from "./Pages/students/AddStudent";

import AddSchool from "./Pages/Schools/AddSchool";
import AddSchoolUser from "./Pages/SchoolUsers/AddSchoolUser";
import ListContacts from "./Pages/Contacts/ListContacts";
import AddContacts from "./Pages/Contacts/AddContacts";
import UpdateContact from "./Pages/Contacts/UpdateContact";
import ChargeRates from "./Pages/ChargeRate/ChargeRates";
import AddGroup from "./Pages/StudentGroups/AddStudentSchoolGroup";
import SchoolStudentGroups from "./Pages/StudentGroups/SchoolStudentGroups";
import ListMMPayments from "./Pages/MMPayments/ListMMPayments";
import ListAccount from "./Pages/Accounts/ListAccount";
import AddAccount from "./Pages/Accounts/AddAccount";
import ListBankTransactions from "./Pages/Bank/ListBankTransactions";
import functions from "./util/functions";
import ActivateAccount from "./Pages/ActivateAccount";
import ViewSchool from "./Pages/Schools/ViewSchool";
import District from "./Pages/RegionDistrict/District";
import Regions from "./Pages/RegionDistrict/Regions";
import AdminAddSchoolUser from "./Pages/SchoolUsers/AdminAddSchoolUser";
import AdminViewSchoolUsers from "./Pages/SchoolUsers/AdminViewSchoolUsers";
import SchoolUSerPage from "./Pages/SchoolUsers/SchoolUSerPage";
import ImportStudents from "./Pages/students/ImportStudents";
import ViewParentRequests from "./Pages/Parents/ViewParentRequests";
import GroupStudents from "./Pages/StudentGroups/GroupStudents";
import AddCallStation from "./Pages/CallStations/AddCallStation";
import ViewCallStationPAge from "./Pages/CallStations/ViewCallStationPAge";
import StudentProfile from "./Pages/students/StudentProfile";
import StudentCards from "./Pages/students/StudentCards";
import ListStations from "./Pages/Stations/ListStations";
import SchoolProfile from "./Pages/Schools/SchoolProfile";
import Profile from "./Pages/Profile";
import ParentProfile from "./Pages/Parents/ParentProfile";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(true);

  function checkLogin() {
    if (!window.localStorage.getItem("buzzMe@user")) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const secure = functions.checkSecureAccount();

  return (
    <SuperProvider>
      <Router forceRefresh={false}>
        <Switch>
          {!loggedIn && (
            <>
              <Route path="*" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  !loggedIn ? <Navigate replace to="/login" /> : <Dashboard />
                }
              />
            </>
          )}
          {loggedIn && secure * 1 === 0 && (
            <>
              <Route path="/Activate/account" element={<ActivateAccount />} />
              <Route
                path="/"
                element={<Navigate replace to="/Activate/account" />}
              />
            </>
          )}

          {loggedIn && secure * 1 === 1 && (
            <>
              <Route path="*" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/"
                element={
                  !loggedIn ? <Navigate replace to="/login" /> : <Dashboard />
                }
              />
              <Route
                path="/login"
                element={loggedIn ? <Navigate replace to="/" /> : <LoginPage />}
              />
              {/* School routes */}
              <Route path="/schools/view" element={<ViewSchool />} />
              <Route path="/schools/add" element={<AddSchool />} />
              <Route
                path="/schools/view/profile/:id"
                element={<SchoolProfile />}
              />
              {/* End school routes */}
              {/* School User routes */}
              <Route path="/schools/user/view" element={<SchoolUSerPage />} />
              <Route path="/schools/user/add" element={<AddSchoolUser />} />
              <Route
                path="/Admin/addSchoolUser"
                element={<AdminAddSchoolUser />}
              />
              <Route
                path="/Admin/user/view"
                element={<AdminViewSchoolUsers />}
              />
              {/* End School User routes */}
              {/* Student Contact routes */}
              <Route path="/contacts/view" element={<ListContacts />} />
              <Route path="/contacts/add" element={<AddContacts />} />
              <Route path="/contacts/edit" element={<UpdateContact />} />
              {/* End Student Contact routes */}
              {/* Charge rate routes */}
              <Route path="/rate/view" element={<ChargeRates />} />
              {/* End Charge rate routes */}
              {/* MM Payments routes */}
              <Route path="/payments/mm/view" element={<ListMMPayments />} />
              {/* End MM Payments routes */}
              {/* Bank routes */}
              <Route path="/bank/view" element={<ListBankTransactions />} />
              {/* End Bank routes */}
              {/* Account routes */}
              <Route path="/accounts/view" element={<ListAccount />} />
              <Route path="/accounts/add" element={<AddAccount />} />
              {/* End Account routes */}
              {/* Parents */}
              <Route path="/parents" element={<ViewParents />} />
              <Route path="/parent/requests" element={<ViewParentRequests />} />
              <Route path="/parents/add" element={<AddParent />} />
              <Route
                path="/parents/profile/:id"
                element={<ParentProfile />}
              />
              {/* End parent */}
              {/* call station  */}
              <Route path="/Casll_stations/Add" element={<AddCallStation />} />
              <Route
                path="/Casll_stations/view"
                element={<ViewCallStationPAge />}
              />
              {/*end  call station  */}
              {/* Students */}
              <Route path="/students" element={<ViewStudents />} />
              {/* <Route
                path="/students/student_card/:id/:group_id"
                element={<StudentCards />}
              /> */}
              <Route
                path="/students/student_card/:student_id?/:group_id?"
                element={<StudentCards />}
              />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/import" element={<ImportStudents />} />
              <Route
                path="/students/profile/:id"
                element={<StudentProfile />}
              />
              {/* End student */}
              {/* Class Groups */}
              <Route path="/class-groups" element={<SchoolStudentGroups />} />
              <Route
                path="/class-groups/view/:id"
                element={<GroupStudents />}
              />
              <Route path="/class-groups/add" element={<AddGroup />} />
              <Route
                path="/class-groups/view/:id"
                element={<GroupStudents />}
              />
              {/* End class groups */}
              {/* districts and regions*/}
              <Route path="/Districts/view" element={<District />} />
              <Route path="/regions/view" element={<Regions />} />
              {/* End class groups */}
              <Route path="/stations" element={<ListStations />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Switch>
      </Router>
    </SuperProvider>
  );
}

export default App;
