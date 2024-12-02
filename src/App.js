import React, {useEffect, useState} from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

import SuperProvider from "./Context/SuperProvider";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import ViewStudents from "./Pages/students/ViewStudents";
import AddStudent from "./Pages/students/AddStudent";
import AddGroup from "./Pages/StudentGroups/AddStudentSchoolGroup";
import SchoolStudentGroups from "./Pages/StudentGroups/SchoolStudentGroups";
import functions from "./util/functions";
import ActivateAccount from "./Pages/ActivateAccount";
import ImportStudents from "./Pages/students/ImportStudents";
import GroupStudents from "./Pages/StudentGroups/GroupStudents";
import StudentProfile from "./Pages/students/StudentProfile";
import StudentCards from "./Pages/students/StudentCards";
import Profile from "./Pages/Profile";
import AdminRegisterStudent from "./Pages/students/AdminRegisterStudent";
import AdminImportStudents from "./Pages/students/AdminImportStudents";
import SchoolDashboard from "./Pages/SchoolDashboard";
import TransferStudent from "./Pages/students/TransferStudent";
import TransactionsPage from "./Pages/TransactionsPage";
import CallLogsPage from "./Pages/CallLogsPage";
import SchoolLogsPage from "./Pages/SchoolLogs/SchoolLogsPage";
import AdminImportStudentsandContacts from "./Pages/students/AdminImportStudentsandContacts";
import ImportStudentsandContacts from "./Pages/students/ImportStudentsandContacts";
import CardsPage from "./Pages/CardsPage";
import StatisticsPage from "./Pages/StatisticsPage";
import ListAdminsPage from "./Pages/SystemUsers/AdminPanel/ListAdminsPage";
import ListSchoolAdminsPage from "./Pages/SystemUsers/AdminPanel/ListSchoolAdminsPage";
import ListBoothAssistants from "./Pages/SystemUsers/AdminPanel/ListBoothAssistantsPage";
import CallStationsPage from "./Pages/CallingStation/AdminPanel/CallStationsPage";
import SchoolStationsPage from "./Pages/CallingStation/SchoolAdminPanel/SchoolStationsPage";
import SettingsPage from "./Pages/Settings/SettingsPage";
import ChargeRatesPage from "./Pages/Settings/ChargeRatesPage";
import DistrictsPage from "./Pages/Settings/DistrictsPage";
import RegionsPage from "./Pages/Settings/RegionsPage";
import ViewSchoolsPage from "./Pages/Schools/ViewSchoolsPage";
import RegisterSchoolPage from "./Pages/Schools/RegisterSchoolPage";
import SchoolProfilePage from "./Pages/Schools/SchoolProfilePage";
import DeletedUsersPage from "./Pages/Parents/AdminProfile/DeletedUsersPage";
import SchoolParentProfilePage from "./Pages/Parents/SchoolAdminProfile/SchoolParentProfilePage";
import ParentProfilePage from "./Pages/Parents/AdminProfile/ParentProfilePage";
import ViewSchoolParentsPage from "./Pages/Parents/SchoolAdminProfile/ViewSchoolParentsPage";
import ViewParentsPage from "./Pages/Parents/AdminProfile/ViewParentsPage";
import ViewStudentsPage from "./Pages/students/AdminProfile/ViewStudentsPage";


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

  const role = functions.checkRole();
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
          {loggedIn && role * 1 < 3 && (
            <>
              <Route path="*" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/students/register" element={<AdminRegisterStudent />} />
              <Route path="/students" element={<ViewStudentsPage />} />
              <Route path="/contacts" element={<ViewParentsPage />} />
              <Route path="/call-logs" element={<CallLogsPage />} />
              <Route path="/stations" element={<CallStationsPage />} />
              <Route path="/students_contacts/upload" element={<AdminImportStudentsandContacts />} />

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
            </>
          )}

          {loggedIn && role * 1 === 3 && (
            <>
              <Route path="*" element={<SchoolDashboard />} />
              <Route path="/" element={<SchoolDashboard />} />
              <Route path="/students/register" element={<AddStudent />} />
              <Route path="/students" element={<ViewStudents />} />
              <Route path="/contacts" element={<ViewSchoolParentsPage />} />
              <Route path="/call-logs" element={<SchoolLogsPage />} />
              <Route path="/stations" element={<SchoolStationsPage />} />
              <Route path="/students_contacts/upload" element={<ImportStudentsandContacts />} />

              <Route
                path="/"
                element={
                  !loggedIn ? <Navigate replace to="/login" /> : <SchoolDashboard />
                }
              />
              <Route
                path="/login"
                element={loggedIn ? <Navigate replace to="/" /> : <LoginPage />}
              />
            </>
          )}

          {loggedIn && (
            <>
              
              {/* School routes */}
              <Route path="/schools/view" element={<ViewSchoolsPage />} />
              <Route path="/schools/add" element={<RegisterSchoolPage />} />
              <Route
                path="/schools/view/profile/:id"
                element={<SchoolProfilePage />}
              />
              {/* End school routes */}
              {/* School User routes */}
              <Route path="/admin/view" element={<ListAdminsPage />} />
              <Route
                path="/school_admin/view"
                element={<ListSchoolAdminsPage />}
              />
              {/* End School User routes */}
              {/* Charge rate routes */}
              <Route path="/rates" element={<ChargeRatesPage />} />
              {/* End Charge rate routes */}
              {/* Parents */}
             
              
              <Route path="/parents/profile/:id/:user_id" element={<ParentProfilePage />} />
              <Route path="/school-parents/profile/:parent/:user_id" element={<SchoolParentProfilePage />} />
              {/* End parent */}
              {/* Students */}
              
              
              
              <Route
                path="/students/student_card/:student_id?/:group_id?/:school_id?"
                element={<StudentCards />}
              />
              
              
              <Route path="/students/import" element={<ImportStudents />} />
              <Route path="/students/upload" element={<AdminImportStudents />} />
              <Route
                path="/students/profile/:student_id/:user_id"
                element={<StudentProfile />}
              />
              <Route
                path="/school-students/profile/:student_id/:user_id"
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
              <Route path="/districts" element={<DistrictsPage />} />
              <Route path="/regions" element={<RegionsPage />} />
              {/* End class groups */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/transactions/all" element={<TransactionsPage />} />
              <Route path="/booth-assistants" element={<ListBoothAssistants />} />
              <Route path="/buzz-cards" element={<CardsPage/>} />
              <Route path="/students/transfer" element={<TransferStudent />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/deleted-users" element={<DeletedUsersPage />} />





            </>
          )}
        </Switch>
      </Router>
    </SuperProvider>
  );
}

export default App;
