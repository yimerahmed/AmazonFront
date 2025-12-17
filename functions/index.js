

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express=require("express")
const cors=require('cors')
const dotenv=require('dotenv');
const { Message } = require("firebase-functions/pubsub");
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app=express()
app.use(cors({origin:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        Message:"success"
    })
})

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    console.log("payment received", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    console.log(paymentIntent);

    return res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    return res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

exports.api=onRequest(app)



// setGlobalOptions({ maxInstances: 10 });

