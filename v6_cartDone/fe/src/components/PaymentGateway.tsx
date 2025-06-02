import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaymentGateway = () => {
     const initialOptions = {
        clientId: "test",
        currency: "USD",
        intent: "capture",
    };
  return (
    <div>
    <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons />
            </PayPalScriptProvider>  
    </div>
  )
}
export default PaymentGateway