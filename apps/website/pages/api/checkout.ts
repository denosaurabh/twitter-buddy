import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const PRICE_ID = process.env.STRIPE_PRICE_ID;

// Create a Stripe Checkout session
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { apiKey } = req.query;

  if (req.method === "POST") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICE_ID,
        },
      ],
      success_url: `http://localhost:5000/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5000/error`,
    });

    res.status(200).send(session);
  } else {
    res.status(400).json({
      message: "Wrong Method! Only POST is support in this endpoint!",
    });
  }
};

export default handler;
