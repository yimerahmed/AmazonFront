import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Context/DataContext";
import Classes from "./Payment.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { db } from "../../Pages/Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../API/axios";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const total =
    basket?.reduce((amount, item) => amount + item.price * item.amount, 0) || 0;

  // ✅ Card validation
  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : null);
  };

  // ✅ Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Payment system not ready. Please try again.");
      return;
    }

    if (!user || !user.uid) {
      setCardError("Please sign in to complete payment.");
      navigate("/login");
      return;
    }

    if (basket.length === 0) {
      setCardError("Your basket is empty.");
      navigate("/");
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      console.log("Creating payment intent for amount:", total * 100);

      // 1️⃣ Get client secret from Firebase Cloud Function
      // const response = await axiosInstance.post("/payment/create", {
      //   total: Math.round(total * 100), // Amount in cents
      //   currency: "usd",
      // });
      // REPLACE WITH:
      const response = await axiosInstance.post(
        `/payment/create?total=${Math.round(total * 100)}`,
        {
          currency: "usd",
        }
      );

      console.log("Payment intent response:", response.data);

      if (!response.data.clientSecret) {
        throw new Error("No client secret in response");
      }

      const clientSecret = response.data.clientSecret;
      console.log("Client secret obtained");

      // 2️⃣ Confirm card payment with Stripe
      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: user.email,
            },
          },
        });

      if (stripeError) {
        console.error("Stripe payment error:", stripeError);
        setCardError(
          stripeError.message || "Payment failed. Please try again."
        );
        setProcessing(false);
        return;
      }

      console.log("Payment successful! PaymentIntent:", paymentIntent);

      // 3️⃣ Save order to Firestore
      try {
        const orderData = {
          basket: basket.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            amount: item.amount,
            image: item.image,
            rating: item.rating,
          })),
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
          currency: paymentIntent.currency,
          userId: user.uid,
          userEmail: user.email,
          timestamp: new Date().toISOString(),
          shippingAddress: {
            name: user.displayName || user.email,
            address: "123 React Lane",
            city: "Chicago",
            state: "IL",
            country: "US",
          },
        };

        const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);
        await setDoc(orderRef, orderData);

        console.log("Order saved to Firestore");
      } catch (firestoreError) {
        console.error("Firestore save error:", firestoreError);
        // Log but don't fail the transaction
      }

      // 4️⃣ Clear basket
      dispatch({ type: "EMPTY_BASKET" });

      // 5️⃣ Show success and redirect
      setSuccess(true);
      setTimeout(() => {
        navigate("/orders", {
          state: {
            paymentSuccess: true,
            orderId: paymentIntent.id,
            amount: total,
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Payment process error:", error);

      let errorMessage = "Payment failed. Please try again.";

      if (error.code === "permission-denied") {
        errorMessage =
          "Firestore permission denied. Please check your security rules.";
      } else if (error.response) {
        // Server responded with error
        console.error("Server error data:", error.response.data);
        errorMessage =
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response
        console.error(
          "No response received. Is your Firebase function running?"
        );
        errorMessage =
          "Cannot connect to payment server. Please ensure the backend is running.";
      } else {
        // Other errors
        errorMessage = error.message || "Unknown error occurred";
      }

      setCardError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  // Loading state
  if (!stripe || !elements) {
    return (
      <Layout>
        <div className={Classes.payment}>
          <div className={Classes.loading}>Loading payment system...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={Classes.payment_header}>
        Checkout ({basket?.length || 0} items)
      </div>

      <section className={Classes.payment}>
        {success ? (
          <div className={Classes.success_message}>
            <h3>✅ Payment Successful!</h3>
            <p>Your order has been placed successfully.</p>
            <p>Redirecting to orders page...</p>
          </div>
        ) : (
          <>
            {/* Address */}
            <div className={Classes.flex}>
              <h3>Delivery Address</h3>
              <div>
                <p>
                  <strong>{user?.email}</strong>
                </p>
                <p>123 React Lane</p>
                <p>Chicago, IL 60601</p>
                <p>United States</p>
              </div>
            </div>

            <hr />

            {/* Products */}
            <div className={Classes.flex}>
              <h3>Review Items & Delivery</h3>
              <div className={Classes.items_container}>
                {basket?.length > 0 ? (
                  basket.map((item) => (
                    <ProductCard key={item.id} product={item} flex hideButton />
                  ))
                ) : (
                  <p>Your basket is empty</p>
                )}
              </div>
            </div>

            <hr />

            {/* Payment */}
            <div className={Classes.flex}>
              <h3>Payment Method</h3>
              <div className={Classes.payment_card_container}>
                <form onSubmit={handleSubmit}>
                  <div className={Classes.card_section}>
                    <h4>Credit or Debit Card</h4>
                    <div className={Classes.card_element_container}>
                      <CardElement
                        onChange={handleChange}
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#424770",
                              fontFamily:
                                '"Helvetica Neue", Helvetica, sans-serif',
                              "::placeholder": {
                                color: "#aab7c4",
                              },
                              padding: "10px",
                            },
                            invalid: {
                              color: "#9e2146",
                            },
                          },
                          hidePostalCode: true,
                        }}
                      />
                    </div>
                  </div>

                  {cardError && (
                    <div className={Classes.error_message}>
                      <p>❌ {cardError}</p>
                    </div>
                  )}

                  <div className={Classes.order_summary}>
                    <div className={Classes.summary_row}>
                      <span>Items:</span>
                      <span>
                        <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <div className={Classes.summary_row}>
                      <span>Shipping:</span>
                      <span>
                        <CurrencyFormat amount={0} />
                      </span>
                    </div>
                    <div className={Classes.total_row}>
                      <span>
                        <strong>Order Total:</strong>
                      </span>
                      <span>
                        <strong>
                          <CurrencyFormat amount={total} />
                        </strong>
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      processing ||
                      !!cardError ||
                      !stripe ||
                      basket?.length === 0 ||
                      !user
                    }
                    className={Classes.pay_button}
                  >
                    {processing ? (
                      <>
                        <span className={Classes.spinner}></span>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay ${CurrencyFormat({ amount: total })}`
                    )}
                  </button>

                  <div className={Classes.security_note}>
                    <p>🔒 Your payment is secure and encrypted</p>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Payment;
