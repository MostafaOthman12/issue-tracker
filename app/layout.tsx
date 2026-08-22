import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavBar from "@/app/NavBar";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <SessionProvider>
          <Theme accentColor="mint" appearance="light" radius="medium">
            <NavBar />
            <main className="p-4">{children}</main>
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
