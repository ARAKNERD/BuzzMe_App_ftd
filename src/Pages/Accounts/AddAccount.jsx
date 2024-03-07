import React, {useContext, useState} from "react";
import {Toaster, toast} from "react-hot-toast";
import WalletAccountContext from "../../Context/WalletAccountContext";
import ajaxAccounts from "../../util/remote/ajaxAccounts";

function AddAccount() {
  const {getAccountList} = useContext(WalletAccountContext);
  const [accountCode, setAccountCode] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (accountCode.length > 0) {
      const data = {
        account_code: accountCode,
        description: description,
      };
      const server_response = await ajaxAccounts.createAccount(data);
      if (server_response.status === "OK") {
        toast.success(server_response.message);
        getAccountList();
        resetForm();
      } else {
        toast.error(server_response.message);
      }
    } else {
      toast.error("Complete all fields and try again");
    }
  };

  const resetForm = () => {
    setAccountCode("");
    setDescription("");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row">
        <br />
        <br />
        <br />
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card" style={{borderRadius: "10px"}}>
            <div className="card-body">
              <div>
                <h6 className="card-title mb-4">Add New Wallet Account</h6>
              </div>

              <form
                onSubmit={(e) => handleAdd(e)}
                method="post"
                class="new-added-form">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5 radius-30">
                    <label htmlFor="">Account Code</label>
                    <input
                      type="text"
                      value={accountCode}
                      onChange={(e) => setAccountCode(e.target.value)}
                      className=" colo-12 form-control"
                    />
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5">
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className=" colo-12 form-control"
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 form-group mt-5 ">
                  <button
                    type="submit"
                    className="col-xl-12 col-lg-12 col-12 btn-fill-lmd radius-30 text-light shadow-dodger-blue bg-dodger-blue">
                    Save Wallet Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAccount;
