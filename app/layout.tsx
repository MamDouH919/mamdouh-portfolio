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
  title: "Mamdouh Mohammed - Front-End Developer",
  description:
    "Personal portfolio of Mamdouh Mohammed, a skilled Front-End Developer specializing in React, Next.js, and modern web technologies.",
  generator: "v0.app",
  keywords: ["Front-End Developer", "React", "Next.js", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Mamdouh Mohammed" }],
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
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
