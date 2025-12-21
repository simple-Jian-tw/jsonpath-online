import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/", label: "Evaluator" },
  { href: "/docs", label: "Cheatsheet" },
  { href: "/integrations", label: "Integrations" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white/50 backdrop-blur dark:border-white/10 dark:bg-black/20">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/logo.png"
            alt={`${SITE.name} logo`}
            width={28}
            height={28}
            className="h-8 w-8 rounded-md"
            priority
          />
          <span className="text-sm sm:text-base">{SITE.domain}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={SITE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border border-black/10 px-3 py-1.5 text-sm text-black/80 hover:bg-black/5 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10"
          >
            GitHub
          </Link>
        </div>
      </Container>
    </header>
  );
}
