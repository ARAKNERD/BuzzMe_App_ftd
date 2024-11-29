import React, { useEffect, useState } from 'react';
import ajaxParent from '../util/remote/ajaxParent';
import ajaxBank from '../util/remote/ajaxBank';
import ajaxCallStation from '../util/remote/ajaxCallStation';

const ContactContext = React.createContext();

export const ContactConsumer = ContactContext.Consumer;

export const ContactProvider = (props)=> {

  const [contactsNumber, setContactsNumber] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [contactId, setContactId] = useState(null);
  const [contactUserId, setContactUserId] = useState(null);

  const [contactProfile, setContactProfile] = useState(false);
  const [contactChildren, setContactChildren] = useState([]);
  const [contactCount, setContactCount] = useState(false);
  const [contactWalletBalance, setContactWalletBalance] = useState(false);
  const [userContacts, setUserContacts] = useState([]);
  const [contactLogs, setContactLogs] = useState([]);
  const [schoolParents, setSchoolParents] = useState([]);
  const [loading3,setLoading3] = useState(false)
  const [contactTransactions, setContactTransactions] = useState([]);

  const [transactionPage, setTransactionPage] = useState(1);
  const [transactionMeta, setTransactionMeta] = useState([]);

  const [page,setPage] = useState(1)
  const [meta,setMeta] = useState([])
  const [first, setFirst] = useState("");
  const [query, setQuery] = useState("");

  const [deletedContactList, setDeletedContactList] = useState([]);
  const [deletedPage,setDeletedPage] = useState(1)
  const [deletedMeta,setDeletedMeta] = useState("")
  const [deletedLoading, setDeletedLoading] = useState(false);
  const [deletedLoading2, setDeletedLoading2] = useState(false);
  const [deletedQuery, setDeletedQuery] = useState("");
  const [deletedFirst, setDeletedFirst] = useState("");
 

  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)


  useEffect(() => {
    if (contactId) {
      getContactProfile();
    }
  }, [contactId]);

  useEffect(() => {
    if (contactUserId) {
      getContactChildren();
      countContactContacts();
      getContactWalletBalance();
      getUserContacts();
      getContactLogs();

    }
  }, [contactUserId]);

  useEffect(() => {
    if (contactUserId) {
      getContactWalletTransactions(transactionPage, contactUserId);
    }
  }, [transactionPage, contactUserId]);

  useEffect(()=>{
    getContactsNumber();
  }, [])
  
  const getContactsNumber = async () => {
    setContactsNumber(false)
    const server_response = await ajaxParent.countParents();
    if (server_response.status === "OK") {
      //store results
      setContactsNumber(server_response.details);
    } else {
      //communicate error
      setContactsNumber("404");
    }
  };

  const getContactChildren =async()=>{
    if (!contactUserId) return;

    const server_response = await ajaxParent.fetchChildren(contactUserId);
    if(server_response.status==="OK"){
        setContactChildren(server_response.details);
    }else{
        setContactChildren("404");
    }
  };

  const getContactLogs =async()=>{
    if (!contactUserId) return;
    const server_response = await ajaxCallStation.listUserCallLogs(contactUserId);
    if(server_response.status==="OK"){
        setContactLogs(server_response.details);
    }else{
        setContactLogs("404");
    }
  }

  const getUserContacts =async()=>{
    if (!contactUserId) return;
    const server_response = await ajaxParent.listParentContacts(contactUserId);
    if(server_response.status==="OK"){
        setUserContacts(server_response.details);
    }else{
        //communicate error
        setUserContacts("404");
    }
  }

  const getContactProfile =async()=>{
    if (!contactId) return;
    const server_response = await ajaxParent.fetchParentInfo(contactId);
    if(server_response.status==="OK"){
      setContactProfile(server_response.details);
    }else{
      setContactProfile("404");
    }
  }

  const countContactContacts =async()=>{
    if (!contactUserId) return;
    setContactCount(false)
    const server_response = await ajaxParent.countUserContacts(contactUserId);
    if(server_response.status==="OK"){
        setContactCount(server_response.details);
    }else{
        setContactCount("404");
    }
  }

  const getContactWalletBalance = async () => {
    if (!contactUserId) return;
    setContactWalletBalance(false)
    const server_response = await ajaxBank.fetchStudentWalletBalance(contactUserId);
    if (server_response.status === "OK") {
      setContactWalletBalance(server_response.details);
    } else {
      setContactWalletBalance('0');
    }
  };

  const getContactWalletTransactions = async (currentPage) => {
    if (!contactUserId) return;
    setLoading3(true);
    const server_response = await ajaxBank.fetchUserWalletTransactions(currentPage, contactUserId);
    setLoading3(false);
    if (server_response.status === "OK") {
      setTransactionMeta(server_response.details.meta.list_of_pages);
      setContactTransactions(server_response.details.list || []);
    } else {
      //communicate error
      setContactTransactions([]);
    }
  };

  const getContactList = async (currentPage) => {
    setLoading(true)
    const server_response = await ajaxParent.listParents(currentPage);
    setLoading(false)
    if (server_response.status === "OK") {
      setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setContactList(server_response.details.list || []);
    } else {
      setContactList([]);
    }
  };

  const searchContacts = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading2(true);
      const server_response = await ajaxParent.searchAllParents(query, page);
      setLoading2(false);
      if (server_response.status === "OK") {
        setFirst(server_response.details.meta.offset_count);
      setMeta(server_response.details.meta.list_of_pages);
      setContactList(server_response.details.list || []);
    } else {
      setContactList([]);
      }
  };

  const getDeletedContactList = async (currentPage) => {
    setDeletedLoading(true)
    const server_response = await ajaxParent.listDeletedParents(currentPage);
    setDeletedLoading(false)
    if (server_response.status === "OK") {
      setDeletedFirst(server_response.details.meta.offset_count);
      setDeletedMeta(server_response.details.meta.list_of_pages);
      setDeletedContactList(server_response.details.list || []);
    } else {
      setDeletedContactList([]);
    }
  };

  const searchDeletedContacts = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setDeletedLoading2(true);
      const server_response = await ajaxParent.searchAllDeletedParents(deletedQuery, deletedPage);
      setDeletedLoading2(false);
      if (server_response.status === "OK") {
        setDeletedFirst(server_response.details.meta.offset_count);
      setDeletedMeta(server_response.details.meta.list_of_pages);
      setDeletedContactList(server_response.details.list || []);
    } else {
      setDeletedContactList([]);
      }
  };
    
    return (
           <ContactContext.Provider value={
               {
                    contactsNumber,
                    contactProfile,
                    contactChildren,
                    contactCount,
                    contactList,
                    contactTransactions,
                    userContacts,
                    contactLogs,
                    contactWalletBalance,
                    deletedContactList,
                    deletedFirst,
                    deletedLoading,
                    deletedLoading2,
                    deletedMeta,
                    deletedQuery,
                    deletedPage,
                    query,
                    page,
                    meta,
                    loading,
                    loading2,
                    loading3,
                    transactionMeta,
                    transactionPage,
                    first,
                    contactId,
                    contactUserId,
                    setContactUserId,
                    setContactId,
                    setTransactionMeta,
                    setTransactionPage,
                    setPage,
                    setMeta,
                    setQuery,
                    setDeletedPage,
                    setDeletedMeta,
                    setDeletedQuery,
                  getContactsNumber,
                  getContactList,
                  searchContacts,
                  getDeletedContactList,
                  searchDeletedContacts,
                  getContactProfile,
                  getContactChildren,
                  countContactContacts,
                  getUserContacts,
                  getContactLogs,
                  getContactWalletTransactions
               }
               }>
               {props.children}
           </ContactContext.Provider>
        );
    
}

export default ContactContext;