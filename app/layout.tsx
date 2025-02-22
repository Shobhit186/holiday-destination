import type { Metadata } from "next";
import  { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holiday Destination",
  description: "Plan your next holiday destination with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <Navbar />
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
