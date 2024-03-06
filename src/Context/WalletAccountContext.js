import React, {useEffect, useState} from "react";
import ajaxAccounts from "../util/remote/ajaxAccounts";

const WalletAccountContext = React.createContext();

export const WalletAccountConsumer = WalletAccountContext.Consumer;

export const WalletAccountProvider = (props) => {
  const [accountList, setAccountList] = useState(false);
  const [data, setData] = useState({page: "1"});

  useEffect(() => {
    getAccountList();
  }, [data]);

  const getAccountList = async () => {
    const server_response = await ajaxAccounts.fetchAccount(data);
    if (server_response.status === "OK") {
      //store results
      setAccountList(server_response.details);
    } else {
      //communicate error
      setAccountList("404");
    }
  };

  return (
    <WalletAccountContext.Provider
      value={{
        accountList,
        setData,
        getAccountList,
      }}>
      {props.children}
    </WalletAccountContext.Provider>
  );
};

export default WalletAccountContext;
