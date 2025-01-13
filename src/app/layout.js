import "./globals.css";

import Navbar from "./components/shared/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const metadata = {
  title: "EventEase Platform",
  description:
    "a simplified event management platform for creating and managing events, registering attendees, and providing real-time updates.",
};

export default async function RootLayout({ children }) {
   const session = await getServerSession(authOptions);
  return (
    <html lang="en" data-theme="light">
      <body>
        <Navbar />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
