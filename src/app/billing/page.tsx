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
    />
  );
  // End of BillingPlanWithCheckout
}

export default function BillingPage() {
  // const NEXT_PUBLIC_PRICE_SUPPORT = process.env.NEXT_PUBLIC_PRICE_SUPPORT;
const NEXT_PUBLIC_PRICE_TIER1 = process.env.NEXT_PUBLIC_VRH_PRO;
const NEXT_PUBLIC_PRICE_TIER2 = process.env.NEXT_PUBLIC_VRH_PREMIUM;
const NEXT_PUBLIC_PRICE_TIER3 = process.env.NEXT_PUBLIC_VRH_FOUNDER;
  return (
    <Layout>
      <Container>
        <div className="pt-12 pb-8">
          <div className="mb-10 text-center pb-25">
            <h1 className="text-7xl font-extrabold mb-3 text-center drop-shadow-lg text-yellow-400">Our Story</h1>
            <h2 className="text-3xl text-red-500 mb-2 font-semibold">From zero to tech job</h2>
              <p className="max-w-2xl mx-auto text-base text-justify">All four of us started from zero—just as lost and unsure as any CS student trying to figure out where to begin. What changed everything for us was discovering the hidden power of hackathons. They aren’t just about coding under pressure; they’re the easiest gateway to building real networks, gaining confidence, and finding opportunities that most students never realize exist. Through hackathons, we reshaped how we approached career-building and uncovered a unique path to break into tech. Now, we’re bringing that experience full circle to help you—step by step, from absolute beginner to hackathon winner, and eventually to landing your dream job in tech. Join us at VietRoHack, and let us guide you on the same journey that transformed our own careers.</p>
          </div>
          <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">
            Join us to unlock the secret sauce
          </h1>
          <div className="flex flex-row gap-10 justify-center mb-8">
            {/* <BillingPlanWithCheckout
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
            /> */}
            <BillingPlanWithCheckout
              price="$2.99"
              period="/month"
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
              period="/month"
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
                "Includes personalized resume/idea review to kickstart your journey.",
                "Lock in early-adopter status and never worry about monthly fees again.",
              ]}
              buttonText="Join Founders Club"
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
