import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/01-reset.css";
import "./styles/02-tokens.css";
import "./styles/03-typography.css";
import "./styles/04-layout.css";
import "./styles/05-components.css";
import "./styles/06-document.css";
import "./styles/07-agreement.css";
import "./styles/08-home.css";
import "./styles/09-dashboard.css";
import "./styles/10-auth.css";
import "./styles/11-profile.css";
import "./styles/12-verify.css";
import "./styles/13-legal.css";
import "./styles/14-print.css";
import "./styles/15-application-polish.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geplic - Digital Agreements Built on Trust",
  description:
    "Create digital agreements, personal pacts, loan agreements, freelance contracts and promises online with Geplic.",

  keywords: [
    "digital agreements",
    "loan agreement",
    "freelance contract",
    "personal pact",
    "online agreement",
    "Geplic",
  ],

  metadataBase: new URL("https://geplic.com"),

  openGraph: {
    title: "Geplic",
    description:
      "Create digital agreements, personal pacts, loan agreements and freelance contracts online.",
    url: "https://geplic.com",
    siteName: "Geplic",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
