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
              alert(`Transaction completed by ${details.payer?.name?.given_name}`);
            });
          }
          return Promise.resolve();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentGateway;