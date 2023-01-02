import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Create a Stripe Checkout session
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const customerId = req.query.customer;

  const invoice = await stripe.invoices.retrieveUpcoming({
    customer: customerId,
  });

  res.send(invoice);
};

export default handler;
