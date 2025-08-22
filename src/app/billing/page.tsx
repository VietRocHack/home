"use client";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import BillingPlan from "@/components/BillingPlan";
import React from "react";

function BillingPlanWithCheckout(props: {
  price: string;
  period: string;
  features: string[];
  buttonText?: string;
  highlight?: boolean;
  oneTime?: boolean;
  mode: "payment" | "subscription";
  priceId?: string;
}) {
  const [loading, setLoading] = React.useState(false);
  async function handleClick() {
    if (!props.priceId) {
      alert("Support price ID is not configured.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: props.mode, priceId: props.priceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }
  return (
    <BillingPlan
      price={props.price}
      period={props.period}
      features={props.features}
      buttonText={loading ? "Redirecting…" : props.buttonText || "Subscribe"}
      onClick={handleClick}
      highlight={props.highlight}
      oneTime={props.oneTime}
    />
  );
  // End of BillingPlanWithCheckout
}

export default function BillingPage() {
  const NEXT_PUBLIC_PRICE_SUPPORT = process.env.NEXT_PUBLIC_PRICE_SUPPORT;
  const NEXT_PUBLIC_PRICE_TIER1 = process.env.NEXT_PUBLIC_PRICE_TIER1;
  const NEXT_PUBLIC_PRICE_TIER2 = process.env.NEXT_PUBLIC_PRICE_TIER2;
  const NEXT_PUBLIC_PRICE_TIER3 = process.env.NEXT_PUBLIC_PRICE_TIER3;
  return (
    <Layout>
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">
            Join us to unlock the secret sauce
          </h1>
          <div className="flex flex-row gap-10 justify-center mb-8">
            <BillingPlanWithCheckout
              price="$0.69"
              period=""
              features={["Support us"]}
              mode="payment"
              priceId={NEXT_PUBLIC_PRICE_SUPPORT}
              oneTime
            />
            <BillingPlanWithCheckout
              price="$1.99"
              period="/MONTH"
              features={[
                "Share proven hackathon-winning strategies",
                "Step-by-step hackathon idea validation",
                "Help with pitch decks that stand out",
              ]}
              mode="subscription"
              priceId={NEXT_PUBLIC_PRICE_TIER1}
            />
            <BillingPlanWithCheckout
              price="$3.99"
              period="/MONTH"
              features={[
                "Share proven hackathon-winning strategies",
                "Pitch decks that stand out",
                "Personalized resume makeovers",
                "A-Z Guidance to land tech internships",
                "Connect with industry insiders",
                "Mock interviews & prep resources",
              ]}
              mode="subscription"
              priceId={NEXT_PUBLIC_PRICE_TIER2}
              highlight
            />
            <BillingPlanWithCheckout
              price="$100"
              period="/LIFETIME"
              features={["Whatever it is — yep, we help."]}
              mode="payment"
              priceId={NEXT_PUBLIC_PRICE_TIER3}
              oneTime
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
