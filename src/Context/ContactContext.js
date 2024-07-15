import React, { useEffect, useState } from 'react';
import ajaxParent from '../util/remote/ajaxParent';

const ContactContext = React.createContext();

export const ContactConsumer = ContactContext.Consumer;

export const ContactProvider = (props)=> {

    const [contactsNumber, setContactsNumber] = useState(false);

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
    
    return (
           <ContactContext.Provider value={
               {
                    contactsNumber,
                  getContactsNumber,
               }
               }>
               {props.children}
           </ContactContext.Provider>
        );
    
}

export default ContactContext;