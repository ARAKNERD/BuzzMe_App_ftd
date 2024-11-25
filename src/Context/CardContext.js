import React, { useEffect, useState } from 'react';
import ajaxCard from '../util/remote/ajaxCard';

const CardContext = React.createContext();

export const CardConsumer = CardContext.Consumer;

export const CardProvider = (props)=> {
  const [cardList, setCardList] = useState([]);
  const [assignedCardList, setAssignedCardList] = useState([]);
  const [unassignedCardList, setUnassignedCardList] = useState([]);
  const [inactiveCardList, setInactiveCardList] = useState([]);

  const [page,setPage] = useState(1)
  const [assignedPage,setAssignedPage] = useState(1)
  const [unassignedPage,setUnassignedPage] = useState(1)
  const [inactivePage,setInactivePage] = useState(1)

  const [meta,setMeta] = useState([])
  const [assignedMeta,setAssignedMeta] = useState([])
  const [unassignedMeta,setUnassignedMeta] = useState([])
  const [inactiveMeta,setInactiveMeta] = useState([])

  
  const [first, setFirst] = useState("");
  const [assignedFirst, setAssignedFirst] = useState("");
  const [unassignedFirst, setUnassignedFirst] = useState("");
  const [inactiveFirst, setInactiveFirst] = useState("");

  const [query, setQuery] = useState("");
  const [assignedQuery, setAssignedQuery] = useState("");
  const [unassignedQuery, setUnassignedQuery] = useState("");
  const [inactiveQuery, setInactiveQuery] = useState("");

  const [allCardsCount, setAllCardsCount] = useState(false);
  const [assignedCardsCount, setAssignedCardsCount] = useState(false);
  const [inactiveCardsCount, setInactiveCardsCount] = useState(false);
  const [unassignedCardsCount, setUnassignedCardsCount] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const getCards = async (currentPage) => {
      setLoading(true)
      const server_response = await ajaxCard.fetchCardList(currentPage);
      setLoading(false)
      if (server_response.status === "OK") {
        setFirst(server_response.details.meta.offset_count);
        setMeta(server_response.details.meta.list_of_pages);
        setCardList(server_response.details.list || []);
      } else {
        setCardList([]);
      }
  };

  const getAssignedCards = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxCard.fetchAssignedCardList(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setAssignedFirst(server_response.details.meta.offset_count);
      setAssignedMeta(server_response.details.meta.list_of_pages);
      setAssignedCardList(server_response.details.list || []);
    } else {
      setAssignedCardList([]);
    }
  };

  const getUnassignedCards = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxCard.fetchUnassignedCardList(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setUnassignedFirst(server_response.details.meta.offset_count);
      setUnassignedMeta(server_response.details.meta.list_of_pages);
      setUnassignedCardList(server_response.details.list || []);
    } else {
      setUnassignedCardList([]);
    }
  };

  const getInactiveCards = async (currentPage) => {
    setLoading(true);
    const server_response = await ajaxCard.fetchInactiveCardList(currentPage);
    setLoading(false);
    if (server_response.status === "OK") {
      setInactiveFirst(server_response.details.meta.offset_count);
      setInactiveMeta(server_response.details.meta.list_of_pages);
      setInactiveCardList(server_response.details.list || []);
    } else {
      setInactiveCardList([]);
    }
  };

  const searchCard = async (e) => {
      if (e) {
        e.preventDefault();
      }
      setLoading2(true)
        const server_response = await ajaxCard.searchCard(query,page);
        setLoading2(false)
        if (server_response.status === "OK") {
          setFirst(server_response.details.meta.offset_count);
          setMeta(server_response.details.meta.list_of_pages);
          setCardList(server_response.details.list || []);
        } else {
          setCardList([]);
        }
  };

  const searchAssignedCard = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading2(true);
      const server_response = await ajaxCard.searchAssignedCard(assignedQuery,assignedPage);
      setLoading2(false);
      if (server_response.status === "OK") {
        setAssignedFirst(server_response.details.meta.offset_count);
        setAssignedMeta(server_response.details.meta.list_of_pages);
        setAssignedCardList(server_response.details.list || []);
      } else {
        setAssignedCardList([]);
      }
  };

  const searchUnassignedCard = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading2(true);
      const server_response = await ajaxCard.searchUnassignedCard(unassignedQuery,unassignedPage);
      setLoading2(false);
      if (server_response.status === "OK") {
        setUnassignedFirst(server_response.details.meta.offset_count);
        setUnassignedMeta(server_response.details.meta.list_of_pages);
        setUnassignedCardList(server_response.details.list || []);
      } else {
        setUnassignedCardList([]);
      }
  };

  const searchInactiveCard = async (e) => {
    if (e) {
      e.preventDefault();
    }
      setLoading2(true);
      const server_response = await ajaxCard.searchInactiveCard(inactiveQuery,inactivePage);
      setLoading2(false);
      if (server_response.status === "OK") {
        setInactiveFirst(server_response.details.meta.offset_count);
        setInactiveMeta(server_response.details.meta.list_of_pages);
        setInactiveCardList(server_response.details.list || []);
      } else {
        setInactiveCardList([]);
      }
  };

  const countAllCards = async () => {
    const server_response = await ajaxCard.countAllCards();
    if (server_response.status === "OK") {
      setAllCardsCount(server_response.details);
    } else {
      setAllCardsCount("404");
    }
  };

  const countInactiveCards = async () => {
    const server_response = await ajaxCard.countInactiveCards();
    if (server_response.status === "OK") {
      setInactiveCardsCount(server_response.details);
    } else {
      //communicate error
      setInactiveCardsCount("404");
    }
  };

  const countUnassignedCards = async () => {
    const server_response = await ajaxCard.countUnassignedCards();
    if (server_response.status === "OK") {
      setUnassignedCardsCount(server_response.details);
    } else {
      //communicate error
      setUnassignedCardsCount("404");
    }
  };

  const countAssignedCards = async () => {
    const server_response = await ajaxCard.countAssignedCards();
    if (server_response.status === "OK") {
      setAssignedCardsCount(server_response.details);
    } else {
      //communicate error
      setAssignedCardsCount("404");
    }
  };


    
  return (
    <CardContext.Provider value={
      {
        cardList,
        first,
        assignedFirst,
        unassignedFirst,
        inactiveFirst,
        meta,
        assignedMeta,
        unassignedMeta,
        inactiveMeta,
        inactiveQuery,
        unassignedQuery,
        assignedQuery,
        query,
        page,
        assignedPage,
        unassignedPage,
        inactivePage,
        loading,
        loading2,
        allCardsCount,
        inactiveCardsCount,
        unassignedCardsCount,
        assignedCardsCount,
        assignedCardList,
        unassignedCardList,
        inactiveCardList,
        setInactiveCardList,
        setUnassignedCardList,
        setAssignedCardList,
        setCardList,
        setAllCardsCount,
        setAssignedCardsCount,
        setInactiveCardsCount,
        setUnassignedCardsCount,
        setPage,
        setMeta,
        setFirst,
        setQuery,
        setAssignedPage,
        setAssignedMeta,
        setAssignedFirst,
        setAssignedQuery,
        setUnassignedPage,
        setUnassignedMeta,
        setUnassignedFirst,
        setUnassignedQuery,
        setInactivePage,
        setInactiveMeta,
        setInactiveFirst,
        setInactiveQuery,
        getCards,
        searchCard,
        countAllCards,
        countInactiveCards,
        countAssignedCards,
        countUnassignedCards,
        getAssignedCards,
        searchAssignedCard,
        getUnassignedCards,
        searchUnassignedCard,
        getInactiveCards,
        searchInactiveCard

      }
    }>
    {props.children}
    </CardContext.Provider>
  );
    
}

export default CardContext;