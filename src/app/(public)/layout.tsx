import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import LocalStorageProvider from "@/lib/LocalStorageProviders";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);


  return (
    <LocalStorageProvider accessToken={session?.accessToken}>
      <Navbar />
      {children}
      <Footer />
    </LocalStorageProvider>
  );
};

export default PublicLayout;
