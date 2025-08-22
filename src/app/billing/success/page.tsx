"use client";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Button from "@/components/Button";
import React from "react";
import { useRouter } from "next/navigation";

export default function BillingSuccessPage() {
  const router = useRouter();
  return (
    <Layout>
      <Container>
        <div className="flex flex-col items-center justify-center py-48 min-h-[80vh]">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-yellow-400 drop-shadow-lg tracking-tight">
            Thank you!!!
          </h1>
          <p className="text-lg mb-8 text-center text-gray-300 font-medium">
            We will reach out to you in less than 24 hours.
          </p>
          <Button variant="primary" size="lg" onClick={() => router.push("/")}>Go back to Home</Button>
        </div>
      </Container>
    </Layout>
  );
}
