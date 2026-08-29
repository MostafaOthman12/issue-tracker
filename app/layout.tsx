import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import "@/app/globals.css";
import NavBar from "@/app/NavBar";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import ReactQuery from "./components/ReactQuery";
import { Analytics } from "@vercel/analytics/next";
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
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif" }}
      >
        <ReactQuery>
          <SessionProvider>
            <Theme
              accentColor="violet"
              appearance="light"
              grayColor="slate"
              radius="medium"
            >
              <NavBar />
              <main className="p-6">{children}</main>
            </Theme>
          </SessionProvider>
        </ReactQuery>
      </body>
    </html>
  );
}
