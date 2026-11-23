import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import Container from "@/components/ui/Container";
import { navItems } from "@/data/nav";
import { tr } from "@/lib/localize";

describe("Button", () => {
  test("external links open in a new tab safely", () => {
    const html = renderToStaticMarkup(
      h(Button, { href: "https://hirara.uz", variant: "ghost", external: true }, "Visit site"),
    );
    expect(html).toContain('href="https://hirara.uz"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  test("internal links stay in the tab", () => {
    const html = renderToStaticMarkup(h(Button, { href: "#work", variant: "primary" }, "See work"));
    expect(html).toContain('href="#work"');
    expect(html).not.toContain("_blank");
    expect(html).toContain("See work");
  });
});

describe("Section", () => {
  test("renders section id, mono eyebrow and serif h2 title", () => {
    const html = renderToStaticMarkup(
      h(Section, { id: "websites", eyebrow: "Websites", title: "Sites I built" }, h("p", null, "body")),
    );
    expect(html).toMatch(/<section[^>]*id="websites"/);
    expect(html).toMatch(/class="[^"]*font-mono[^"]*"[^>]*>Websites</);
    expect(html).toMatch(/<h2[^>]*class="[^"]*font-serif[^"]*"[^>]*>Sites I built<\/h2>/);
    expect(html).toContain("<p>body</p>");
  });
});

describe("Reveal", () => {
  test("SSR markup carries data-reveal and is never inline-hidden", () => {
    const html = renderToStaticMarkup(h(Reveal, { delay: 0.2 }, h("p", null, "hello")));
    expect(html).toContain("data-reveal");
    expect(html).toContain("<p>hello</p>");
    expect(html).not.toMatch(/opacity:\s*0/);
    expect(html).not.toContain("visibility:hidden");
  });
});

describe("Tag and Container", () => {
  test("render children", () => {
    expect(renderToStaticMarkup(h(Tag, null, "Next.js"))).toContain("Next.js");
    expect(renderToStaticMarkup(h(Container, null, "x"))).toContain("x");
  });
});

describe("navItems", () => {
  test("are the five sections in order", () => {
    expect(navItems.map((n) => [tr(n.label, "en"), n.href])).toEqual([
      ["Websites", "#websites"],
      ["Branding", "#branding"],
      ["Ads & Content", "#ads"],
      ["About", "#about"],
      ["Contact", "#contact"],
    ]);
  });
});
