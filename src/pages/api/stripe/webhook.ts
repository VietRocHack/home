import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function buffer(readable: Readable) {
  const chunks: Buffer[] = [];
  for await (const chunk of readable)
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(
        "✅ checkout.session.completed",
        session.id,
        session.customer_email
      );
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`🔄 ${event.type}`, sub.id, sub.status);
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("❌ payment failed", pi.id, pi.last_payment_error?.message);
      break;
    }

    default:
      console.log("ℹ️ unhandled event", event.type);
  }

  res.json({ received: true });
}
