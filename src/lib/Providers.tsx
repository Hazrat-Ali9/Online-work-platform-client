"use client";

import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
