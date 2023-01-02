import type { NextApiRequest, NextApiResponse } from "next";
import { generateAPIKey } from "../../utils/apiKeyGen";
import { setAPIKeyData, setCustomerData } from "../../utils/database";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body, // req["rawBody"]
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.status(400).json({});
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case "checkout.session.completed":
      console.log(data);
      // Data included in the event object:
      const customerId = data.object.customer;
      const subscriptionId = data.object.subscription;

      console.log(
        `💰 Customer ${customerId} subscribed to plan ${subscriptionId}`
      );

      // Get the subscription. The first item is the plan the user subscribed to.
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const itemId = subscription.items.data[0].id;

      // Generate API key
      const apiKeysData = await generateAPIKey();

      if (!apiKeysData) {
        console.log(
          `UNABLE TO GENERATE API KEY FOR THE CUSTOMER! customerId: ${customerId}`
        );
        break;
      }

      const { apiKey, hashedAPIKey } = apiKeysData;

      console.log(`User's API Key: ${apiKey}`);
      console.log(`Hashed API Key: ${hashedAPIKey}`);

      // Store the API key in your database.
      // customers[customerId] = { apikey: hashedAPIKey, itemId, active: true };
      // apiKeys[hashedAPIKey] = customerId;

      setCustomerData(customerId, {
        apikey: hashedAPIKey,
        itemId,
        active: true,
      });
      setAPIKeyData(hashedAPIKey, customerId);

      break;
    case "invoice.paid":
      break;
    case "invoice.payment_failed":
      break;
    default:
    // Unhandled event type
  }

  res.status(200).json({});
};

export default handler;
