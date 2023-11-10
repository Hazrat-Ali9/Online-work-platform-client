"use client";
import { AUTH_KEY } from "@/constants/storageKey";
import { setToLocalStorage } from "@/utils/local-storage";
import React, { useEffect } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";

const LocalStorageProvider = ({
  accessToken,
  children,
}: {
  children: React.ReactNode;
  accessToken: string;
}) => {
  useEffect(() => {
    if (accessToken) {
      setToLocalStorage(AUTH_KEY, accessToken);
    }
  }, [accessToken]);
  
  useEffect(() => {
    AOS.init();
  }, []);

  return <>{children}</>;
};

export default LocalStorageProvider;
