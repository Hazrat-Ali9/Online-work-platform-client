"use client";

import { useProfileQuery } from "@/redux/features/profile/profileApi";

import logo from "@/assets/svg/logo-white-text.svg";
import { logout } from "@/lib/authOptions";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import "./Navbar.css";
import Button from "./Button";

const Navbar = () => {
  const { data, isLoading } = useProfileQuery(undefined);

  return (
    <Container>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
              {!isLoading && data?.name && (
                <li className="cursor-pointer" onClick={logout}>
                  <span>Logout</span>
                </li>
              )}
            </ul>
          </div>
          <Link href={"/"}>
            <Image src={logo} width={300} height={50} alt="logo" />
          </Link>
        </div>
        <div className="navbar-end gap-x-5">
          <ul className="menu menu-horizontal px-1 hidden lg:flex font-bold">
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/contact-us"}>Contact Us</Link>
            </li>
          </ul>
          {!isLoading && data?.name ? (
            <>
              {!data.avatarUrl && data.name && (
                <button
                  onClick={logout}
                  className="btn-sm text-sm text-bold hidden md:block"
                >
                  Logout
                </button>
              )}
              {data.avatarUrl && (
                <details className="dropdown">
                  <summary className="m-1 ">
                    <div className="avatar cursor-pointer">
                      <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image
                          src={data?.avatarUrl}
                          width={20}
                          height={20}
                          alt="Avatar"
                        />
                      </div>
                    </div>
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li className="cursor-pointer" onClick={logout}>
                      Logout
                    </li>
                  </ul>
                </details>
              )}
            </>
          ) : (
            <Link href={"/login"} className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
