// functions/index.js
const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// CORS configuration
app.use(cors({ origin: true }));
app.use(express.json());

// Set global options for v2
setGlobalOptions({ maxInstances: 10 });

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Amazon Clone API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Payment endpoint
app.post("/payment/create", async (req, res) => {
  try {
    const total = req.query.total || req.body.total;

    if (!total) {
      return res.status(400).json({
        message: "Missing 'total' parameter",
      });
    }

    const totalAmount = parseInt(total);

    if (totalAmount > 0) {
      logger.info("Payment request received", { amount: totalAmount });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
      });

      logger.info("PaymentIntent created", {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      });

      return res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } else {
      return res.status(403).json({
        message: "Total must be greater than 0",
      });
    }
  } catch (error) {
    logger.error("Stripe API error", { error: error.message });
    return res.status(500).json({
      message: "Payment processing failed",
      error: error.message,
    });
  }
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint works!" });
});

// Export as Firebase Cloud Function v2
exports.api = onRequest(app);