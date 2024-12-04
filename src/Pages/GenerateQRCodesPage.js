import React, {useContext, useEffect, useState} from "react";
import AppContainer from "../Components/Structure/AppContainer.js";
import {Toaster} from "react-hot-toast";
import CardContext from "../Context/CardContext.js";
import QRCode from "react-qr-code";

function GenerateQRCodesPage() {
  const {printableCards, getPrintableCards} = useContext(CardContext);

  useEffect(() => {
    getPrintableCards();
  }, []);

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <AppContainer title="Generate QR Codes">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="pl-20" style={{float: "right"}}>
            <button type="button" className="btn-fill-lmd radius-30 mb-5 text-light shadow-dodger-blue bg-danger" onClick={handlePrint}>
              <i className="fa-solid fa-print mr-1" />Print QR Codes
            </button> 
          </div>
        </div>
        <div className="content">
          <div className="row">
        
            {printableCards.length > 0 ? (
              printableCards.map((item, index) => (
                <div className="col-lg-2 col-md-2" key={index}>
                  <div className="card height-auto">
                    <div className="card-body">
                      <div className="heading-layout1">
                        <div className="item-title">
                          <h5 style={{marginBottom:0}}>{item.card_number}</h5>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <QRCode value={item.card_number} size={64} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : 
            (
                <p style={{ textAlign: "center" }}>
                  No cards registered yet.   
                </p>
            )}
          </div>
        </div>
      </div>
    </AppContainer>
  );
}

export default GenerateQRCodesPage;