import React, { useEffect, useState } from "react";
import ajaxSchool from "../util/remote/ajaxSchool";
import ajaxStudentGroup from "../util/remote/ajaxStudentGroup";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import ajaxStudent from "../util/remote/ajaxStudent";
import ajaxCallStation from "../util/remote/ajaxCallStation";
import ajaxStation from "../util/remote/ajaxStation";

const SchoolContext = React.createContext();

export const SchoolConsumer = SchoolContext.Consumer;

export const SchoolProvider = (props) => {
  const [schoolList, setSchoolList] = useState(false);
  const [schoolListByPage, setSchoolListByPage] = useState(false);
  const [schoolId, setSchoolId] = useState(null);
  const [schoolProfile, setSchoolProfile] = useState(false);
  const [studentCount, setStudentCount] = useState(false);
  const [schoolStudents, setSchoolStudents] = useState([]);
  const [stationCount, setStationCount] = useState(false);
  const [schoolStations, setSchoolStations] = useState([]);

  const [schoolsNumber, setSchoolsNumber] = useState(false);
  const { user } = useContext(AuthContext);
  const [recentSchools, setRecentSchools] = useState(false);
  const [schoolGroups, setSchoolGroups] = useState(false);
  const [data, setData] = useState({ page: "1" });
  const [schoolDetails, setSchoolDetails] = useState(false);
  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState([])
  const [first, setFirst] = useState("");
  const [query, setQuery] = useState("");

  const [studentsPage,setStudentsPage] = useState(1)
  const [studentsMeta,setStudentsMeta] = useState([])
  const [studentsFirst, setStudentsFirst] = useState("");
  const [studentsQuery, setStudentsQuery] = useState("");

  const [stationPage,setStationPage] = useState(1)
  const [stationMeta,setStationMeta] = useState([])
  const [stationFirst, setStationFirst] = useState("");
  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)
  const [loading3,setLoading3] = useState(false)
  const [loading4,setLoading4] = useState(false)

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
    if (schoolId) {
      getSchoolProfile();
      countSchoolStudents();
      countSchoolStations();
    }
  }, [schoolId]);

  useEffect(() => {
    if (schoolId) {
      getSchoolStations(stationPage);
    }
  }, [schoolId, stationPage]);

  useEffect(() => {
    getGroups();
  }, [schoolDetails.school_id]);

  const countSchoolStations = async () => {
    const server_response = await ajaxCallStation.callStation_count(schoolId);
    if (server_response.status === "OK") {
        setStationCount(server_response.details);
    } else {
        setStationCount("404");
    }
};

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

  const getSchoolListByPage = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxSchool.fetchSchools(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setSchoolListByPage(server_response.details.list || []);
    } else {
      setSchoolListByPage([]);
    }
  };

  const getSchoolStudents = async (currentPage) => {
    setLoading3(true);
    const server_response = await ajaxStudent.fetchStudentList(currentPage, schoolId);
    setLoading3(false);
    if (server_response.status === "OK") {
      setStudentsFirst(server_response.details.meta.offset_count);
      setStudentsMeta(server_response.details.meta.list_of_pages);
      setSchoolStudents(server_response.details.list || []);
    } else {
      setSchoolStudents([]);
    }
  };

  const searchSchoolStudents = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading4(true);
      const server_response = await ajaxStudent.searchSchoolStudents(studentsQuery, schoolId, studentsPage);
      setLoading4(false);
      if (server_response.status === "OK") {
        setStudentsFirst(server_response.details.meta.offset_count);
        setStudentsMeta(server_response.details.meta.list_of_pages);
        setSchoolStudents(server_response.details.list || []);
      } else {
        setSchoolStudents([]);
      }
  };

  const searchSchools = async (e) => {
    if (e) {
        e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxSchool.searchSchoolList(query, page);
    setLoading2(false);
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setSchoolListByPage(server_response.details.list || []);
    } else {
      setSchoolListByPage([]);
    }    
  };

  const getSchoolProfile = async () => {
    if (!schoolId) return;
    const server_response = await ajaxSchool.fetchSchoolProfile(schoolId);
    if (server_response.status === "OK") {
      setSchoolProfile(server_response.details);
    } else {
      setSchoolProfile("404");
    }
  };

  const countSchoolStudents = async () => {
    if (!schoolId) return;
    const server_response = await ajaxStudent.fetchStudentNumber(schoolId);
    if (server_response.status === "OK") {
        setStudentCount(server_response.details);
    } else {
        setStudentCount("404");
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

  const getSchoolStations =async(currentPage)=>{
    setLoading3(true)
    const server_response = await ajaxStation.fetchStationList(schoolId,currentPage);
    setLoading3(false)
    if(server_response.status==="OK"){
      setStationFirst(server_response.details.meta.offset_count);
      setStationMeta(server_response.details.meta.list_of_pages);
      setSchoolStations(server_response.details.list || []);
    } else {
      setSchoolStations([]);
    }
  }

  return (
    <SchoolContext.Provider
      value={{
        schoolList,
        schoolStations,
        recentSchools,
        schoolGroups,
        schoolsNumber,
        schoolStudents,
        schoolDetails,
        schoolListByPage,
        studentCount,
        stationCount,
        loading,
        loading2,
        loading3,
        loading4,
        stationFirst,
        stationMeta,
        stationPage,
        page,
        meta,
        first,
        query,
        schoolProfile,
        schoolId,
        studentsPage,
        studentsMeta,
        studentsQuery,
        studentsFirst,
        setStationFirst,
        setStationMeta,
        setStationPage,
        setData,
        setPage,
        setMeta,
        setQuery,
        setStudentsPage,
        setStudentsMeta,
        setStudentsQuery,
        getSchoolList,
        getRecentSchools,
        getGroups,
        getSchoolsNumber,
        setSchoolDetails,
        getUserSchool,
        getSchoolProfile,
        getSchoolListByPage,
        setSchoolId,
        searchSchools,
        getSchoolStudents,
        searchSchoolStudents,
        getSchoolStations
      }}
    >
      {props.children}
    </SchoolContext.Provider>
  );
};

export default SchoolContext;
