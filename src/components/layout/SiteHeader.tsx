import { profile } from "@/content/profile";
import { getResumeHref } from "@/lib/site";
import { Header } from "./Header";

const items = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <Header
      name={profile.name}
      monogram={profile.monogram}
      items={items}
      resumeHref={getResumeHref()}
    />
  );
}
