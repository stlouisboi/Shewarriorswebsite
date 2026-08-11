import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || "";

export const PayPalGive = ({ lookup, amount }) => {
  if (!PAYPAL_CLIENT_ID) return null;
  return (
    <div data-testid={`paypal-give-${amount}`} className="mt-4 w-full border-t border-white/10 pt-4">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-parchment/50">
        or give with PayPal
      </p>
      <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
        <PayPalButtons
          style={{ layout: "horizontal", color: "gold", shape: "pill", height: 40, tagline: false }}
          createOrder={async () => {
            const { data } = await axios.post(`${API}/paypal/orders`, { lookup_key: lookup });
            return data.order_id;
          }}
          onApprove={async (d) => {
            try {
              const { data } = await axios.post(`${API}/paypal/orders/${d.orderID}/capture`);
              if (data.payment_status === "paid") {
                toast.success("Your gift was received.", {
                  description: `Thank you, sister — your $${amount} gift just became someone's steady ground.`,
                });
              } else {
                toast.error("Payment didn't complete", { description: "No charge was made. Please try again." });
              }
            } catch (e) {
              console.error(e);
              toast.error("Something went wrong", { description: "No charge was made. Please try again." });
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
