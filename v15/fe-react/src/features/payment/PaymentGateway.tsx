import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendTransaction } from './paymentSlice'; // Adjust path
import { useAppDispatch } from './hooks';

interface PaymentProps {
  amount: number;
}

const PaymentGateway: React.FC<PaymentProps> = ({ amount }) => {
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
                  value: (amount / 80).toFixed(2),
                },
              },
            ],
            intent: 'CAPTURE'
          });
        }}
        onApprove={(data, actions) => {
          if (actions.order) {
            return actions.order.capture().then((details) => {
              // const emailid = localStorage.getItem("emailid");
              const emailid = JSON.parse(localStorage.getItem("auth") || "{}")?.emailid;
              const transaction = {
                id: details.id,
                payer: details,
                create_time: details.create_time,
                status: details.status,
              };

              dispatch(sendTransaction({ emailid: emailid || '', transaction }))
                .unwrap()
                .then(() => {
                  alert(`Transaction completed by ${details.payer?.name?.given_name}`);
                  navigate('/ordercreate', { state: { transaction } }); // Pass transaction
                })
                .catch((err) => {
                  alert('Payment record failed to save');
                  console.error(err);
                })

            });
          }
          return Promise.resolve();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentGateway;
