import React, { useEffect, useState } from "react";
import ajaxSchool from "../util/remote/ajaxSchool";
import ajaxStudentGroup from "../util/remote/ajaxStudentGroup";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const SchoolContext = React.createContext();

export const SchoolConsumer = SchoolContext.Consumer;

export const SchoolProvider = (props) => {
  const [schoolList, setSchoolList] = useState(false);
  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const { user } = useContext(AuthContext);
  const [recentSchools, setRecentSchools] = useState(false);
  const [schoolGroups, setSchoolGroups] = useState(false);
  const [data, setData] = useState({ page: "1" });
  const [schoolDetails, setSchoolDetails] = useState(false);

  useEffect(() => {
    getSchoolList();
    getRecentSchools();
    getSchoolsNumber();
  }, [data]);

  useEffect(() => {
    if (user) {
      getUserSchool();
    }
  }, [user]);

  useEffect(() => {
    getGroups();
  }, [schoolDetails.school_id]);

  const getSchoolList = async () => {
    const server_response = await ajaxSchool.fetchSchoolList(data);
    if (server_response.status === "OK") {
      //store results
      setSchoolList(server_response.details);
    } else {
      //communicate error
      setSchoolList("404");
    }
  };

  const getRecentSchools = async () => {
    const server_response = await ajaxSchool.fetchTodaySchools(data);
    if (server_response.status === "OK") {
      //store results
      setRecentSchools(server_response.details);
    } else {
      //communicate error
      setRecentSchools("404");
    }
  };

  const getGroups = async () => {
    setSchoolGroups(false);
    const server_response = await ajaxStudentGroup.fetchGroupList(
      schoolDetails.school_id
    );
    console.log(server_response);
    if (server_response.status === "OK") {
      setSchoolGroups(server_response.details);
    } else {
      //communicate error
      setSchoolGroups("404");
    }
  };

  const getSchoolsNumber = async () => {
    setSchoolsNumber(false);
    const server_response = await ajaxSchool.fetchSchoolNumber();
    if (server_response.status === "OK") {
      //store results
      setSchoolsNumber(server_response.details);
    } else {
      //communicate error
      setSchoolsNumber("404");
    }
  };

  const getUserSchool = async () => {
    const server_response = await ajaxSchool.fetchUserSchool(user.user_id);
    
    if (server_response.status === "OK") {
      setSchoolDetails(server_response.details);
    }
  };

  return (
    <SchoolContext.Provider
      value={{
        schoolList,
        recentSchools,
        schoolGroups,
        schoolsNumber,
        schoolDetails,
        setData,
        getSchoolList,
        getRecentSchools,
        getGroups,
        getSchoolsNumber,
        setSchoolDetails,
        getUserSchool,
      }}
    >
      {props.children}
    </SchoolContext.Provider>
  );
};

export default SchoolContext;
