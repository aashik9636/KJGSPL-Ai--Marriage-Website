"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/register/step-1");
  }, [router]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center text-sm text-[#725763]">
        Loading AI Marriage registration...
      </div>
    </div>
  );
}
