import ReactDOM from "react-dom/client"
import { Provider } from "react-redux";
import { store } from "./app/store"
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PayPalScriptProvider options={
        {
            "clientId": "ARsqEf9uupraJwNxRNj4a0snJ2kh9AFrqd7EpUhH3VrYHD93sBAUuTIZni9zAYxx0LLXJxsMvCPjmgWa",
            "currency": "USD"
        }
    }>
        <Provider store={store}>
            <App />
        </Provider>
    </PayPalScriptProvider>
)