"use client";

import { useSearchParams } from "next/navigation";
import SignUpForm from "./SignUpForm";
import { useState, useEffect } from "react";

const SignUpContent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams(); // Only use in client-side component

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering until client-side
  }

  // You can access searchParams here, for example:
  const referralCode = searchParams.get("ref");

  return (
    <div>
      <SignUpForm referralCode={referralCode} />
    </div>
  );
};

export default SignUpContent;
