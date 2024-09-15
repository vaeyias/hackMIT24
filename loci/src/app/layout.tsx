import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loci",
  description: "A memory palace for your learning",
  // icons: {
  //   icon: "/icons/something.png",
  // },
};

export default function RootLayout({children}: { children: React.ReactNode }){
  return (
    <html lang="en" className = "select-none">
      <head>
        <meta name="viewport" content="width=device-width"/>
      </head>
      <body className={`${inter.className} flex-col h-screen`}>
        <Header/>
        { children }
      </body>
    </html>
  );
};
