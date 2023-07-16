import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "HabibBet",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="h-full overflow-y-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}