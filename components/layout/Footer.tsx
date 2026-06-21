import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";

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
  { name: "Instagram", icon: SiInstagram, href: "https://www.instagram.com/nafeesas_the_family_store/" },
  { name: "WhatsApp Channel", icon: SiWhatsapp, href: "https://whatsapp.com/channel/0029Vb7ojzKGehEH3XjJlT42" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <img src="/logo.png" alt="Nafeesa Family Store" className="h-full w-full object-cover" />
              </div>
              <span className="font-serif text-xl font-semibold leading-tight text-background sm:text-2xl">
                Nafeesa Family Store
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/70">
              Your trusted family store for quality products. Serving families with care
              since 2014.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Nafeesa's Family Store, Archer Road, Quetta, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+92 334 2797314</span>
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

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-background/10 pt-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} Nafeesa Family Store. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-background/30">
              Built by Muhammad Zain Khan
              Phone: +92 3184749779
              Email: mzaink.22@gmail.com
            </p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
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