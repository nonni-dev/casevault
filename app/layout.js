import { Geist, Geist_Mono, Raleway, Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/layout/Provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "CaseVault",
  description: "A Case Study Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f5f5f5] dark:bg-[#0f172a] text-black dark:text-[#f5f5f5]">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}