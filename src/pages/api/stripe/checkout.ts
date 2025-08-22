import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, mode } = req.body;
    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode || "payment",
      success_url: "http://localhost:3000/billing/success",
      cancel_url: "http://localhost:3000/billing",
    };
    if ((mode || "payment") === "payment") {
      sessionConfig.customer_creation = "always";
    }
    const session = await stripe.checkout.sessions.create(sessionConfig);
    return res.status(200).json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unknown error occurred." });
  }
}
