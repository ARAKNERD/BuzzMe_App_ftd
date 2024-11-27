import React, { useState } from 'react';
import ajaxCallStation from '../util/remote/ajaxCallStation';

const CallContext = React.createContext();

export const CallConsumer = CallContext.Consumer;

export const CallProvider = (props)=> {

    const [twilioLogsList, setTwilioLogsList] = useState([]);
    const [zegoLogsList, setZegoLogsList] = useState([]);

    const [twilioStartDate, setTwilioStartDate] = useState("");
    const [zegoStartDate, setZegoStartDate] = useState("");

    const [twilioEndDate, setTwilioEndDate] = useState("");
    const [zegoEndDate, setZegoEndDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [twilioPage,setTwilioPage] = useState(1)
    const [zegoPage,setZegoPage] = useState(1)

    const [twilioMeta,setTwilioMeta] = useState([])
    const [zegoMeta,setZegoMeta] = useState([])

    const [twilioCaller, setTwilioCaller] = useState("");
    const [zegoCaller, setZegoCaller] = useState("");

    const [twilioCallee, setTwilioCallee] = useState("");
    const [zegoCallee, setZegoCallee] = useState("");

    const [isTwilioSearching, setIsTwilioSearching] = useState(false);
    const [isZegoSearching, setIsZegoSearching] = useState(false);

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);

    const getTwilioLogsList = async (currentPage) => {
        if (isFirstLoad) setLoading(true);
      
        try {
          const server_response = await ajaxCallStation.listTwilioCallLogs(currentPage);
          if (server_response.status === "OK") {
            setTwilioMeta(server_response.details.meta.list_of_pages);
            setTwilioLogsList(server_response.details.list || []);
          } else {
            setTwilioLogsList([]);
          }
        } catch (error) {
          console.error("Error fetching Twilio logs:", error);
        } finally {
          setLoading(false);
          if (isFirstLoad) setIsFirstLoad(false); // Disable loader after the first load
        }
    };

    const getZegoLogsList = async (currentPage) => {
        if (isFirstLoad) setLoading(true);
      
        try {
          const server_response = await ajaxCallStation.listZegoCallLogs(currentPage);
          if (server_response.status === "OK") {
            setZegoMeta(server_response.details.meta.list_of_pages);
            setZegoLogsList(server_response.details.list || []);
          } else {
            setZegoLogsList([]);
          }
        } catch (error) {
          console.error("Error fetching Zego logs:", error);
        } finally {
          setLoading(false);
          if (isFirstLoad) setIsFirstLoad(false); 
        }
    };

    const searchTwilioLogs = async (e) => {
        if (e) {
          e.preventDefault();
        }
        setLoading2(true);
        setIsTwilioSearching(true);
        const server_response = await ajaxCallStation.searchTwilioLogs(twilioPage, twilioCaller, twilioCallee, twilioStartDate, twilioEndDate);
        setLoading2(false);
        if (server_response.status === "OK") {
          setTwilioMeta(server_response.details.meta.list_of_pages);
          setTwilioLogsList(server_response.details.list || []);
        } else {
          setTwilioLogsList([]);
        }     
    };

    const searchZegoLogs = async (e) => {
        if (e) {
          e.preventDefault();
        }
        setLoading2(true);
        setIsZegoSearching(true);
        const server_response = await ajaxCallStation.searchZegoLogs(zegoPage, zegoCaller, zegoCallee, zegoStartDate, zegoEndDate);
        setLoading2(false);
        if (server_response.status === "OK") {
          setZegoMeta(server_response.details.meta.list_of_pages);
          setZegoLogsList(server_response.details.list || []);
        } else {
          setZegoLogsList([]);
        }     
    };

    
  return (
    <CallContext.Provider value={
      {
        twilioLogsList,
        zegoLogsList,
        twilioCallee,
        zegoCallee,
        twilioCaller,
        zegoCaller,
        twilioEndDate,
        zegoEndDate,
        twilioStartDate,
        zegoStartDate,
        twilioMeta,
        zegoMeta,
        twilioPage,
        zegoPage,
        isTwilioSearching,
        isZegoSearching,
        isFirstLoad,
        isRealTimeEnabled,
        loading,
        loading2,
        searchTwilioLogs,
        searchZegoLogs,
        getTwilioLogsList,
        getZegoLogsList,
        setTwilioPage,
        setZegoPage,
        setIsRealTimeEnabled,
        setTwilioCallee,
        setZegoCallee,
        setTwilioCaller,
        setZegoCaller,
        setTwilioEndDate,
        setZegoEndDate,
        setTwilioStartDate,
        setZegoStartDate,
        setIsTwilioSearching,
        setIsZegoSearching

        

      }
    }>
    {props.children}
    </CallContext.Provider>
  );
    
}

export default CallContext;