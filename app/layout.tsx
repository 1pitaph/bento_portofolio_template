import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const oppoSans = localFont({
  src: "../public/fonts/OPPO-Sans-4.0.ttf",
  variable: "--font-oppo-sans",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono[wght].ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "1pitaph portfolio",
  description: "Personal portfolio of 1pitaph",
  icons: {
    icon: "/avatar.png",
    shortcut: "/avatar.png",
    apple: "/avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oppoSans.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
