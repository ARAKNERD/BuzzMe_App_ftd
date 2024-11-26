import React, { useState } from 'react';
import ajaxBank from '../util/remote/ajaxBank';

const TransactionsContext = React.createContext();

export const TransactionsConsumer = TransactionsContext.Consumer;

export const TransactionsProvider = (props)=> {
  const [accountActivations, setAccountActivations] = useState(false);
  const [transactionList, setTransactionList] = useState(false);
  const [mmTransactions, setMMTransactions] = useState(false);
  const [buzztimeTransactions, setBuzztimeTransactions] = useState(false);
  const [callTransactions, setCallTransactions] = useState(false);
  const [messageTransactions, setMessageTransactions] = useState(false);

  const [activationSearchTerm, setActivationSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mmSearchTerm, setMmSearchTerm] = useState("");
  const [buzztimeSearchTerm, setBuzztimeSearchTerm] = useState("");
  const [callSearchTerm, setCallSearchTerm] = useState("");
  const [messageSearchTerm, setMessageSearchTerm] = useState("");

  const [activationStartDate, setActivationStartDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [mmStartDate, setMmStartDate] = useState("");
  const [buzztimeStartDate, setBuzztimeStartDate] = useState("");
  const [callStartDate, setCallStartDate] = useState("");
  const [messageStartDate, setMessageStartDate] = useState("");

  const [activationEndDate, setActivationEndDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mmEndDate, setMmEndDate] = useState("");
  const [buzztimeEndDate, setBuzztimeEndDate] = useState("");
  const [callEndDate, setCallEndDate] = useState("");
  const [messageEndDate, setMessageEndDate] = useState("");

  const [activationPage,setActivationPage] = useState(1)
  const [page,setPage] = useState(1)
  const [mmPage,setMmPage] = useState(1)
  const [buzztimePage,setBuzztimePage] = useState(1)
  const [callPage,setCallPage] = useState(1)
  const [messagePage,setMessagePage] = useState(1)

  const [activationMeta,setActivationMeta] = useState([])
  const [meta,setMeta] = useState([])
  const [mmMeta,setMmMeta] = useState([])
  const [buzztimeMeta,setBuzztimeMeta] = useState([])
  const [callMeta,setCallMeta] = useState([])
  const [messageMeta,setMessageMeta] = useState([])

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const getAccountActivations = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxBank.fetchAccountActivationInvoices(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setActivationMeta(server_response.details.meta.list_of_pages);
      setAccountActivations(server_response.details.list || []);
    } else {
      setAccountActivations([]);
    }
  };

  const getTransactions = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxBank.fetchInvoices(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setTransactionList(server_response.details.list || []);
    } else {
      setTransactionList([]);
    }
  };

  const fetchMMTransactions = async (currentPage) => {
    setLoading(true);
    const response = await ajaxBank.fetchMMTransactions(currentPage);
    setLoading(false);
    if (response.status === "OK") {
      setMmMeta(response.details.meta.list_of_pages);
      setMMTransactions(response.details.list || []);
    } else {
      setMMTransactions([]);
    }
  };

  const getBuzztimeTransactions = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxBank.fetchBuzztimeTransactions(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setBuzztimeMeta(server_response.details.meta.list_of_pages);
      setBuzztimeTransactions(server_response.details.list || []);
    } else {
      setBuzztimeTransactions([]);
    }
  };

  const getCallTransactions = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxBank.fetchCallTransactions(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setCallMeta(server_response.details.meta.list_of_pages);
      setCallTransactions(server_response.details.list || []);
    } else {
      setCallTransactions([]);
    }
  };

  const getMessageTransactions = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxBank.fetchMessageTransactions(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setMessageMeta(server_response.details.meta.list_of_pages);
      setMessageTransactions(server_response.details.list || []);
    } else {
      setMessageTransactions([]);
    }
  };

  const searchAccountActivations = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxBank.searchAccountActivationInvoices(activationSearchTerm,activationStartDate,activationEndDate,activationPage);
    setLoading2(false);
    if (server_response.status === "OK") {
      setActivationMeta(server_response.details.meta.list_of_pages);
      setAccountActivations(server_response.details.list || []);
    } else {
      setAccountActivations([]);
    }
    
  };

  const searchTransactions = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxBank.searchAllInvoices(page, startDate, endDate, searchTerm);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMeta(server_response.details.meta.list_of_pages);
      setTransactionList(server_response.details.list || []);
    } else {
      setTransactionList([]);
    } 
  };

  const searchMMTransactions = async (e) => {
    if (e) e.preventDefault();
    setLoading2(true);

    const response = await ajaxBank.searchMMTransactions(mmPage, mmStartDate, mmEndDate, mmSearchTerm);
    setLoading2(false);

    if (response.status === "OK") {
      setMmMeta(response.details.meta.list_of_pages);
      setMMTransactions(response.details.list || []);
    } else {
      setMMTransactions([]);
    }
  };

  const searchBuzztimeLoadTransactions = async (e) => {
    if (e) {
        e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxBank.searchBuzztimeTransactions(buzztimeSearchTerm, buzztimeStartDate, buzztimeEndDate, buzztimePage);
    setLoading2(false);
    if (server_response.status === "OK") {
      setBuzztimeMeta(server_response.details.meta.list_of_pages);
      setBuzztimeTransactions(server_response.details.list || []);
    } else {
      setBuzztimeTransactions([]);
    }
    
  };

  const searchCallTransactions = async (e) => {
    if (e) {
        e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxBank.searchCallTransactions(callSearchTerm, callStartDate, callEndDate, callPage);
    setLoading2(false);
    if (server_response.status === "OK") {
      setCallMeta(server_response.details.meta.list_of_pages);
      setCallTransactions(server_response.details.list || []);
    } else {
      setCallTransactions([]);
    }
  
  };

  const searchMessageTransactions = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading2(true);
    const server_response = await ajaxBank.searchMessageTransactions(messageSearchTerm, messageStartDate, messageEndDate, messagePage);
    setLoading2(false);
    if (server_response.status === "OK") {
      setMessageMeta(server_response.details.meta.list_of_pages);
      setMessageTransactions(server_response.details.list || []);
    } else {
      setMessageTransactions([]);
    }
  
  };




    
  return (
    <TransactionsContext.Provider value={
      {
        accountActivations,
        transactionList,
        mmTransactions,
        buzztimeTransactions,
        callTransactions,
        messageTransactions,
        meta,
        activationMeta,
        mmMeta,
        buzztimeMeta,
        callMeta,
        messageMeta,
        page,
        activationPage,
        mmPage,
        buzztimePage,
        callPage,
        messagePage,
        searchTerm,
        activationSearchTerm,
        mmSearchTerm,
        buzztimeSearchTerm,
        callSearchTerm,
        messageSearchTerm,
        startDate,
        activationStartDate,
        mmStartDate,
        buzztimeStartDate,
        callStartDate,
        messageStartDate,
        endDate,
        activationEndDate,
        mmEndDate,
        buzztimeEndDate,
        callEndDate,
        messageEndDate,
        loading,
        loading2,
        setMeta,
        setActivationMeta,
        setMmMeta,
        setBuzztimeMeta,
        setCallMeta,
        setMessageMeta,
        setPage,
        setActivationPage,
        setMmPage,
        setBuzztimePage,
        setCallPage,
        setMessagePage,
        setSearchTerm,
        setActivationSearchTerm,
        setMmSearchTerm,
        setBuzztimeSearchTerm,
        setCallSearchTerm,
        setMessageSearchTerm,
        setStartDate,
        setActivationStartDate,
        setMmStartDate,
        setBuzztimeStartDate,
        setCallStartDate,
        setMessageStartDate,
        setEndDate,
        setActivationEndDate,
        setMmEndDate,
        setBuzztimeEndDate,
        setMessageEndDate,
        setCallEndDate,
        getTransactions,
        getAccountActivations,
        fetchMMTransactions,
        getBuzztimeTransactions,
        getCallTransactions,
        getMessageTransactions,
        searchAccountActivations,
        searchTransactions,
        searchMMTransactions,
        searchBuzztimeLoadTransactions,
        searchMessageTransactions,
        searchCallTransactions

      }
    }>
    {props.children}
    </TransactionsContext.Provider>
  );
    
}

export default TransactionsContext;