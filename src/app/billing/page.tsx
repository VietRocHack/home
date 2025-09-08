"use client";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
  useEffect(() => {
    router.replace('/rsvp');
  }, [router]);
  return (
    <Layout>
      <Container>
        <div className="pt-24 pb-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Billing is currently disabled</h1>
          <p className="text-[var(--foreground-secondary)] mb-6 max-w-2xl mx-auto">
            Please RSVP instead to join the team.
          </p>
          <Link href="/rsvp" className="inline-block bg-[var(--accent-red)] text-white px-5 py-2 rounded-md hover:bg-opacity-90">
            Go to RSVP
          </Link>
        </div>
      </Container>
    </Layout>
  );
}
