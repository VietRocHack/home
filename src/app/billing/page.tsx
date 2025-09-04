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
              price="$0"
              period="forever"
              features={[
                "Get a taste of how we win hackathons and land internships.",
                "Access to sample resources",
              ]}
              buttonText="Get Started"
              mode="payment"
              priceId={NEXT_PUBLIC_PRICE_SUPPORT}
              oneTime
            />
            <BillingPlanWithCheckout
              price="$2.99"
              period="/month (or $29/year)"
              features={[
                "Full access to step-by-step hackathon strategies we’ve used to win.",
                "Templates & pitch decks that impress judges.",
                "Resume tips that actually land interviews.",
              ]}
              buttonText="Go Pro"
              mode="subscription"
              priceId={NEXT_PUBLIC_PRICE_TIER1}
            />
            <BillingPlanWithCheckout
              price="$5.99"
              period="/month (or $59/year)"
              features={[
                "Everything in Pro + personalized feedback on your resume or pitch.",
                "Mock interview prep & insider guides to land tech internships.",
                "Priority access to connect with mentors & industry insiders.",
              ]}
              buttonText="Go Premium"
              mode="subscription"
              priceId={NEXT_PUBLIC_PRICE_TIER2}
              highlight
            />
            <BillingPlanWithCheckout
              price="$49"
              period="one-time (limited spots)"
              features={[
                "Pay once, get everything forever.",
                "Includes 1 personalized resume/idea review to kickstart your journey.",
                "Lock in early-adopter status and never worry about monthly fees again.",
              ]}
              buttonText="Join Founders Club"
              mode="payment"
              priceId={NEXT_PUBLIC_PRICE_TIER3}
              oneTime
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <ManageSubscriptionButton />
        </div>
      </Container>
    </Layout>
  );
}

function ManageSubscriptionButton() {
  const [loading, setLoading] = React.useState(false);
  async function handleManage() {
    setLoading(true);
    // TODO: Replace with actual customerId from user session/database
    const customerId = window.localStorage.getItem('stripeCustomerId');
    if (!customerId) {
      alert('Stripe customer ID not found. Please log in.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ customerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create portal session');
      window.location.href = data.url;
    } catch (err) {
      alert('Error: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all duration-200"
      onClick={handleManage}
      disabled={loading}
    >
      {loading ? 'Redirecting…' : 'Manage Subscription'}
    </button>
  );
}
