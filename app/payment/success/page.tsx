"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Public page — no auth required.
 * MonCash redirects the user (or the WebView) here after a successful payment.
 *
 * Two possible consumers:
 * 1. **In-app WebView**: The URL change is intercepted by MoncashWebView.tsx
 *    (pattern: /payment/success), so the app handles the success natively.
 * 2. **External browser**: The page fires the `xentra://deposit-success`
 *    deep link and shows a fallback UI for users who opened it outside the app.
 */
export default function PaymentSuccessPage() {
  const [deepLinkFired, setDeepLinkFired] = useState(false);

  useEffect(() => {
    // Attempt to open the app via deep link
    const deepLink = "xentra://deposit-success";
    window.location.href = deepLink;

    const timer = setTimeout(() => {
      setDeepLinkFired(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#BEE3FF] to-white px-6 text-center">
      {/* ── Logo / Icon ── */}
      <div className="mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-[#16467A] shadow-xl shadow-blue-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* ── Heading ── */}
      <h1 className="text-3xl font-extrabold text-[#16467A] mb-3">
        Payment Successful!
      </h1>
      <p className="text-gray-600 text-base leading-relaxed max-w-xs mb-8">
        Your MonCash deposit has been confirmed. Your Xentra wallet will be
        credited shortly.
      </p>

      {/* ── Deep-link CTA ── */}
      <a
        href="xentra://deposit-success"
        className="inline-block bg-[#16467A] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg hover:bg-[#1a56a0] active:scale-95 transition-all duration-150"
      >
        Return to Xentra App
      </a>

      {deepLinkFired && (
        <p className="mt-5 text-sm text-gray-400">
          Didn&apos;t open automatically?{" "}
          <a
            href="xentra://deposit-success"
            className="text-[#16467A] font-semibold underline"
          >
            Tap here
          </a>
        </p>
      )}

      {/* ── Footer note ── */}
      <p className="mt-12 text-xs text-gray-400">
        Powered by{" "}
        <Link
          href="https://www.digicelgroup.com/ht/en/moncash.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          MonCash
        </Link>{" "}
        &amp; Xentra Sports
      </p>
    </main>
  );
}
