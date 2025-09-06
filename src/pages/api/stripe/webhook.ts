import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import nodemailer from "nodemailer";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const customerEmail = session.customer_email || session.customer_details?.email;

    console.log("[Webhook] checkout.session.completed for customer:", customerId, "email:", customerEmail);

    if (customerId) {
      // Create portal session
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: "https://localhost:3000/billing",
      });
      console.log("[Webhook] Created portal session:", portalSession.url);

      // Send email with portalSession.url
      if (customerEmail) {
        try {
          await sendEmail(customerEmail, portalSession.url);
          console.log("[Webhook] Email sent to:", customerEmail);
        } catch (err) {
          console.error("[Webhook] Failed to send email:", err);
        }
      } else {
        console.warn("[Webhook] No customer email found, cannot send portal link.");
      }
    } else {
      console.warn("[Webhook] No customer ID found, skipping portal session creation.");
    }
  }

  res.json({ received: true });
}

// Example email function (configure with your SMTP or use SendGrid/Mailgun)
async function sendEmail(to: string, portalUrl: string) {
  console.log("[sendEmail] Preparing to send email to:", to);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "vietrochack@gmail.com",
      pass: process.env.SMTP_CREDENTIALS, // Your app password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"VietRocHack" <no-reply@vietrochack.com>',
      to,
      subject: "Manage your subscription",
      text: `Thank you for your purchase! You can manage your subscription here: ${portalUrl}`,
      html: `<p>Thank you for your purchase!<br>You can manage your subscription here: <a href="${portalUrl}">${portalUrl}</a></p>`,
    });
    console.log("[sendEmail] Email sent:", info.messageId);
  } catch (err) {
    console.error("[sendEmail] Error sending email:", err);
    throw err;
  }
}
