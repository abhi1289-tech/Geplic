import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";


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
