import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loci",
  description: "blah blah",
  icons: {
    icon: "/icons/mars_onboarding_icon.png",
  },
};

export default function RootLayout({children}: { children: React.ReactNode }){
  return (
    <html lang="en" className = "select-none">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={`${inter.className} flex-col h-screen`}>
        { children }
        {/* <footer className = "bottom-0 fixed">
          <small>
            <small className="mix-blend-difference">
              &nbsp; 🚧 Last updated: Sep 14th, 2024
            </small>
          </small>
        </footer> */}
      </body>
    </html>
  );
};
