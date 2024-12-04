import React, { useContext, useEffect, useState } from 'react';
import ajaxCallStation from '../util/remote/ajaxCallStation';
import ajaxStation from '../util/remote/ajaxStation';
import SchoolContext from './SchoolContext';
const StationContext = React.createContext();

export const StationConsumer = StationContext.Consumer;

export const StationProvider = (props)=> {

   
    const [stationNumber, setStationNumber] = useState(false);
    const [schoolDashboardStations, setSchoolDashboardStations] = useState([]);

    const [stationList, setStationList] = useState([]);
    const [stationTimeRanges, setStationTimeRanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [query, setQuery] = useState("");

    const [page, setPage] = useState(1);
    const { schoolDetails } = useContext(SchoolContext);

    const [meta, setMeta] = useState([]);
    const schoolID = schoolDetails.school_id;

    useEffect(()=>{
         getStationNumber();
   }, [])
  
   const getStationNumber = async () => {
    setStationNumber(false)
    const server_response = await ajaxCallStation.countAllStations();
    if (server_response.status === "OK") {
      //store results
      setStationNumber(server_response.details);
    } else {
      //communicate error
      setStationNumber("404");
    }
  };

  const getStations = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxStation.listAllStations(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      const stations = server_response.details.list || [];
      setStationList(stations);
      stations.forEach(station => {
        getStationTimeRanges(station.station_id);
      });
    } else {
      setStationList([]);
    }
  };

  const getSchoolStations = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxStation.fetchStationList(schoolID,currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      const stations = server_response.details.list || [];
      setStationList(stations);
      stations.forEach(station => {
        getStationTimeRanges(station.station_id); // Fetch time ranges for each station
      });
    } else {
      setStationList([]);
    }
  };

  const getStationTimeRanges = async (stationId) => {
    const server_response = await ajaxStation.fetchStationTimeRanges(stationId);
    if (server_response.status === "OK") {
      setStationTimeRanges(prevState => ({
        ...prevState,
        [stationId]: server_response.details || [],
      }));
    } else {
      setStationTimeRanges(prevState => ({
        ...prevState,
        [stationId]: [],
      }));
    }
  };

  const searchStations = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxStation.searchAllStations(query,page);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStationList(server_response.details.list || []);
    } else {
      setStationList([]);
    }
  };

  const searchSchoolStations = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxStation.searchStation(
      schoolID,
      query,
      page
    );
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setStationList(server_response.details.list || []);
    } else {
      setStationList([]);
    }
  };

  const getSchoolDashboardStations = async () => {
    const server_response = await ajaxStation.fetchFewStations(schoolID);
    if (server_response.status === "OK") {
      setSchoolDashboardStations(server_response.details);
    } else {
      setSchoolDashboardStations("404");
    }
  };
    
    return (
           <StationContext.Provider value={
               {
                    stationNumber,
                    stationList,
                    stationTimeRanges,
                    query,
                    page,
                    meta,
                    loading,
                    loading2,
                    schoolID,
                    schoolDashboardStations,
                    setQuery,
                    setPage,
                    setMeta,
                  getStationNumber,
                  getStations,
                  getSchoolStations,
                  searchStations,
                  searchSchoolStations,
                  getSchoolDashboardStations
               }
               }>
               {props.children}
           </StationContext.Provider>
        );
    
}

export default StationContext;