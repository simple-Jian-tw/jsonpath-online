import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE.url),
    alternates: { canonical: "/" },
    icons: {
      icon: "/icon.png",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      url: SITE.url,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function buildMetadata({
  title,
  description,
  canonicalPath,
}: {
  title: string;
  description: string;
  canonicalPath: string;
}): Metadata {
  const canonical = new URL(canonicalPath, SITE.url).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
