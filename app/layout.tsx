import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Shell } from "@/components/layout/shell";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://astra.example.com"),
  title: {
    default: "ASTRA - Decision Intelligence Platform",
    template: "%s | ASTRA",
  },
  description: "AI-powered Decision Intelligence Platform. Think clearly. Decide intelligently.",
  openGraph: {
    title: "ASTRA - Decision Intelligence Platform",
    description: "AI-powered Decision Intelligence Platform.",
    url: "https://astra.example.com",
    siteName: "Astra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Astra Decision Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASTRA - Decision Intelligence Platform",
    description: "AI-powered Decision Intelligence Platform.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Shell>{children}</Shell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
