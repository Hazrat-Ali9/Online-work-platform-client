import { logout } from "@/lib/authOptions";
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
          {/* 
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-5 px-3 text-white"
              >
                Features
              </a>
            </div> */}
          </div>

          <div className="flex items-center space-x-1">
            <button onClick={logout} className="py-5 px-3">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-menu hidden md:hidden">
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>
    </nav>
  );
};

export default AdminNavbar;
