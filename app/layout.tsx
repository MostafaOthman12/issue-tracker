import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import NavBar from "@/app/NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className=" h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <ClerkProvider>
          <Theme accentColor="violet" appearance="light" radius="medium">
            <NavBar />
            <main className="p-4">{children}</main>
          </Theme>
        </ClerkProvider>
      </body>
    </html>
  );
}
