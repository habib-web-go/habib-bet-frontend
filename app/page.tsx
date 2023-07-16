"use client";
import Image from "next/image";
import landing from "@/public/landing.png";
import Link from "next/link";
import useUser from "./hook/useUser";

export default function Home() {
  const { user } = useUser()
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center flex-1 px-8 py-8 md:px-12 lg:flex-none lg:px-24">
        <div className="w-full mx-auto lg:max-w-6xl">
          <div className="max-w-xl mx-auto text-center lg:p-10 lg:text-left">
            <div>
              <p className="text-2xl font-medium tracking-tight text-black sm:text-4xl">
                HabibBet: Your Ultimate Destination for Simple and Exciting
                Betting
              </p>
              <p className="max-w-xl mt-4 text-base tracking-tight text-gray-600">
                Your go-to platform for simple and thrilling betting. Whether
                you are a seasoned bettor or new to the world of gambling,
                HabibBet offers a user-friendly interface and a simple fun bet
                game.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center max-w-lg gap-3 mx-auto mt-10 lg:flex-row lg:justify-start">
              <Link
                href={!user ? "/login": "/home"}
                className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
              >
                Get started
              </Link>
              <a
                href="/public"
                className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
              >
                Public Table
                <span aria-hidden="true"> → </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden lg:block">
        <Image
          className="absolute inset-0 object-cover w-full h-full bg-gray-200 lg:border-l"
          src={landing}
          alt=""
        />
      </div>
    </div>
  );
}
