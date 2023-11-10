"use client";

import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";

const AdminContent = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div
      className={`bg-gray-100 min-h-screen ${
        isOpen ? "ml-40 w-[calc(100%-160px)]" : "ml-16 w-[calc(100%-64px)]"
      }`}
    >
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminContent;
