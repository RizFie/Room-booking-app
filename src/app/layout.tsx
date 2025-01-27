import type { Metadata } from "next";
import {Roboto, Inter} from 'next/font/google'
import "./globals.css";
import { Toaster } from "react-hot-toast";

const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100','300','400','500','700','900'],
  variable: "--font-roboto",
});

const inter_init = Inter({
  subsets: ["latin"],
  weight: ['100','300','400','500','700','900'],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "eTEMPAH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${roboto_init.variable} ${inter_init.variable} font-inter antialiased relative 
          bg-wave bg-no-repeat bg-cover bg-fixed container`}
      >
        
        <Toaster/>
        {children}

      </body>
    </html>
  );
}
