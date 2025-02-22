import type { Metadata } from "next";
import  { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./Providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";

const geistSans = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holiday Destination",
  description: "Plan your next holiday destination with us",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
