import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

const footerLinks = {
  shop: [
    { name: "All Categories", href: "/categories" },
    { name: "Shopping Center", href: "/categories?section=shopping-center" },
    { name: "Stationery", href: "/categories?section=stationery" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: SiFacebook, href: "#" },
  { name: "Instagram", icon: SiInstagram, href: "#" },
  { name: "Twitter", icon: SiX, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">N</span>
              </div>
              <span className="font-serif text-2xl font-semibold text-background">
                Nafeesa
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/70">
              Your trusted family store for quality products. Serving families with care
              since 2014.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Main Market, Your City, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@nafeesastore.com</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background">
                Shop
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} Nafeesa Family Store. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={social.name}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}