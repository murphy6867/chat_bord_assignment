import { FC } from "react";

import localFont from "next/font/local";
import "./globals.css";

import type { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Data wow blog port",
  description: "Data wow blog port",
};
interface Props {
  children: React.ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-w-full min-h-screen">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
