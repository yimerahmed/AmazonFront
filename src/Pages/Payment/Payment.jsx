import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Context/DataContext";
import Classes from "./Payment.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);

  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const total =
    basket?.reduce((amount, item) => amount + item.price * item.amount, 0) || 0;

  const handleChange = (event) => {
    setCardError(event.error ? event.error.message : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    // Normally you fetch clientSecret from backend here
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: user?.email,
      },
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
    } else {
      setCardError(null);
      alert("Payment successful (demo)");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={Classes.payment_header}>
        Checkout ({basket.length} items)
      </div>

      <section className={Classes.payment}>
        {/* Address */}
        <div className={Classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>

        <hr />

        {/* Products */}
        <div className={Classes.flex}>
          <h3>Review items</h3>
          <div>
            {basket.map((item) => (
              <ProductCard key={item.id} product={item} flex />
            ))}
          </div>
        </div>

        <hr />

        {/* Payment */}
        <div className={Classes.flex}>
          <h3>Payment Method</h3>

          <div className={Classes.payment_card_container}>
            <form onSubmit={handleSubmit}>
              {/* Card */}
              <CardElement onChange={handleChange} />

              {/* Error */}
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}

              {/* Price */}
              <div className={Classes.payment_price}>
                <span>
                  Total | <CurrencyFormat amount={total} />
                </span>

                <button disabled={processing || !!cardError}>
                  {processing ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
