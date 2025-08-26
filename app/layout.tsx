import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AuthContextProvider } from "@/context/AuthContext"
import "./globals.css"

/* Updated fonts to match design brief */
const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Mamdouh Mohammed | Front-End Developer Portfolio",
  description:
    "Portfolio of Mamdouh Mohammed, a Front-End Developer specializing in React, Next.js, and modern web technologies. Explore my projects, skills, and experience.",
  generator: "Next.js",
  keywords: [
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Development",
    "JavaScript",
    "Frontend Engineer",
    "UI Developer",
    "Portfolio",
    "Mamdouh Mohammed"
  ],
  authors: [{ name: "Mamdouh Mohammed", url: "https://mamdouh.mountain-egy.site" }],
  creator: "Mamdouh Mohammed",
  publisher: "Mamdouh Mohammed",
  openGraph: {
    title: "Mamdouh Mohammed | Front-End Developer",
    description:
      "Showcasing my work as a Front-End Developer specializing in React, Next.js, TypeScript, and modern web development.",
    url: "https://mamdouh.mountain-egy.site",
    siteName: "Mamdouh Mohammed Portfolio",
    images: [
      {
        url: "https://mamdouh.mountain-egy.site/logo.png",
        width: 1200,
        height: 630,
        alt: "Mamdouh Mohammed Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mamdouh Mohammed | Front-End Developer",
    description:
      "Personal portfolio of Mamdouh Mohammed, a skilled Front-End Developer specializing in React, Next.js, and TypeScript.",
    creator: "@your_twitter_handle",
    images: ["https://mamdouh.mountain-egy.site/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://mamdouh.mountain-egy.site",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased">
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
