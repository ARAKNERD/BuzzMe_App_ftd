import React, { useState } from "react"
import Loader from "../../Components/Common/Loader";
import SystemModal from "../../Components/Common/SystemModal";
import QRCode from "react-qr-code";


const PrintQRCode=(props)=>{
    const [loading, setLoading] = useState(false)
    
    const handlePrint = () => {
        setLoading(true)
        window.print();
        setLoading(false)
    };

    const RenderFooter=(controls)=>{

        if(loading){
            return <Loader/>
        }else{

            return <> 
                    <button className="btn-fill-md text-light bg-martini shadow-martini" type="button" onClick={controls.close}>Close</button>
                    <button 
                        type="button" 
                        className={`btn-fill-md text-light bg-danger`} 
                        onClick={handlePrint}>Print<i class="fas fa-print mg-l-15"></i></button>
                    </>
        }
    }

    return(
        <SystemModal
            title="Print QR Code"
            id="model-print-qrcode"
            size="md"
            footer={RenderFooter}
        >
            <div className="content">
                <div className="heading-layout1">
                    <div className="item-title">
                        <h5 style={{marginBottom:0}}>{props.cardNumber}</h5>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <QRCode value={props.cardNumber} size={128} />
                </div>
            </div>
       
        </SystemModal>
    )
}

export default PrintQRCode
