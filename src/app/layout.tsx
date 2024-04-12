import "~/styles/globals.css";

import { Roboto } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { MainLayout } from "./_layout";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Re:boot Bazaar",
  description: "Re:boot Bazaar",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <TRPCReactProvider>
          <MainLayout>{children}</MainLayout>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
