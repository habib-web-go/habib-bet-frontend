"use client";
import useUser from "@/app/hook/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBitcoin } from "react-icons/fa";

import React, { useEffect } from "react";

function Navbar() {
  const router = useRouter();
  const { logout, loading, user } = useUser();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [router, user, loading]);
  return (
    <div className="w-full mx-auto bg-white border-b 2xl:max-w-7xl">
      <div className="relative flex w-full p-5 mx-auto bg-white md:items-center md:justify-between flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link
            className="text-lg tracking-tight text-black uppercase focus:outline-none focus:ring lg:text-2xl"
            href="/home"
          >
            <span className="lg:text-lg uppecase focus:ring-0">Habib Bet</span>
            <span className="text-sm"> / {user?.username} </span>
            <span className="text-sm">
              / {user?.coins ?? "-"} <FaBitcoin className="inline-block" />
            </span>
          </Link>
        </div>
        <nav className="items-center flex-grow pb-0 flex justify-end flex-row">
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            {loading ? (
              "Loading..."
            ) : (
              <button
                onClick={() => {
                  logout();
                }}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-black rounded-full group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-700 active:bg-gray-800 active:text-white focus-visible:outline-black"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
