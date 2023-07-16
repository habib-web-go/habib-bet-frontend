import { PropsWithChildren } from "react";
import Image from "next/image";
import login from "@/public/login.svg";

export default function AuthRootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen">
        <section>
          <div className="relative flex justify-center lg:px-0 md:px-12">
            <div className="relative z-10 flex flex-col flex-1 px-4 py-10 bg-white rounded-lg m-5 lg:py-24 md:flex-none md:px-28 sm:justify-center">
              {children}
            </div>
            <div className="hidden bg-white lg:block lg:flex-1 lg:relative sm:contents">
              <div className="absolute  w-full h-screen bg-white overflow-hidden">
                <Image
                  className="object-center w-full h-auto bg-gray-200"
                  src={login}
                  alt="Login Image"
                  width="1310"
                  height="2000"
                />
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
