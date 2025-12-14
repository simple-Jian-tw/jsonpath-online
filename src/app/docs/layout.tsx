import type { ReactNode } from "react";
import { Container } from "@/components/Container";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="py-10">
      <article className="mdx max-w-3xl">{children}</article>
    </Container>
  );
}

