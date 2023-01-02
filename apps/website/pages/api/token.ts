import type { NextApiRequest, NextApiResponse } from "next";
import { hashAPIKey } from "../../utils/apiKeyGen";
import {
  getCustomerDataWithCustomerId,
  getCustomerDataWithHashedAPIKey,
} from "../../utils/database";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // res.setHeader('Cache-Control', 's-maxage=86400');
  const { apiKey } = req.query;

  if (!apiKey || typeof apiKey !== "string") {
    res.status(400).json({ message: "Wrong or No API KEY" }); // bad request
  }

  const hashedAPIKey = hashAPIKey(`${apiKey}`);

  const customerData = await getCustomerDataWithHashedAPIKey(hashedAPIKey);
  const customer = await getCustomerDataWithCustomerId(customerData.customerId);

  if (!customer || !customer.active) {
    res.status(403).json({}); // not authorized
  } else {
    // Record usage with Stripe Billing
    const record = await stripe.subscriptionItems.createUsageRecord(
      customer.itemId,
      {
        quantity: 1,
        timestamp: "now",
        action: "increment",
      }
    );

    res.send({ data: "🔥🔥🔥🔥🔥🔥🔥🔥", usage: record });
  }
};

export default handler;
