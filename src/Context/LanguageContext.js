import React, { useEffect, useState } from 'react';
import eng from '../util/eng';
import sw from '../util/sw';

const LanguageContext = React.createContext();

export const LanguageConsumer = LanguageContext.Consumer;

export const LanguageProvider = (props)=> {

   
    const [lang, setLang] = useState('sw');
    // const {user} = useContext(AuthContext);

   const translations = {
    en: eng,
    sw: sw
  };

   const translate = (word) => translations[lang][word] || word;
    return (
           <LanguageContext.Provider value={
               {
                  translate
               }
               }>
               {props.children}
           </LanguageContext.Provider>
        );
    
}

export default LanguageContext;