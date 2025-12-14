import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/site";
import { baseMetadata } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...baseMetadata(),
  title: {
    default: "JSONPath Online Evaluator & Validator | JSONPath Online",
    template: "%s",
  },
  description:
    "Validate JSONPath online with a modern editor. Test JSONPath queries, debug errors, and generate code snippets for Java, Go, Python, JavaScript, PHP, and C#.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE.gaMeasurementId}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <footer className="mt-16 border-t border-black/10 py-10 text-sm text-black/60 dark:border-white/10 dark:text-white/60">
          <div className="mx-auto w-full max-w-6xl px-4">
            <p>
              © {new Date().getFullYear()} {SITE.domain}. JSONPath evaluator,
              validator, and code generator.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
