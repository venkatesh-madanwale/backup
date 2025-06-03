import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaymentProps {
  amount: number;
}

const PaymentGateway: React.FC<PaymentProps> = ({ amount }) => {
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: (amount / 80).toFixed(2), // Assuming ₹ to $ conversion
                },
              },
            ],
            intent: 'CAPTURE'
          });
        }}

        onApprove={(data, actions) => {
          if (actions.order) {
            return actions.order.capture().then((details) => {
              const emailid = localStorage.getItem("emailid");
              const transaction = {
                id: details.id,
                // amount: details.purchase_units[0].amount.value,
                payer: details,
                create_time: details.create_time,
                status: details.status,
              };

              fetch("http://localhost:3005/payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailid, transaction }),
              })
                .then((res) => res.json())
                .then(() => {
                  alert(`Transaction completed by ${details.payer?.name?.given_name}`);
                });
            });
          }
          return Promise.resolve();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentGateway;