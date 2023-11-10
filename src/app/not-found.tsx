"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFound = () => {
  const router = useRouter();
  const [count, setCount] = useState(7);

  // Redirect to home page after 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(interval);
      router.push("/");
    }
    return () => clearInterval(interval);
  }, [count, router]);

  return (
    <div className="h-screen flex flex-col gap-y-10 justify-center items-center text-center">
      <h2 className="text-primary text-3xl md:text-8xl">404 Error</h2>
      <div className="text-white text-xl md:text-3xl">
        You will be redirected to{" "}
        <Link href="/" className="underline text-primary">
          Homepage
        </Link>{" "}
        after {count} seconds
      </div>
    </div>
  );
};

export default NotFound;
