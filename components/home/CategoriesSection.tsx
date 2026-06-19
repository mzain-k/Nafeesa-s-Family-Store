import Link from "next/link";
import { Pencil, BookOpen, Sparkles, Home } from "lucide-react";

const categories = [
  {
    name: "Stationery",
    description: "Pens, notebooks, art supplies & more",
    icon: Pencil,
    count: "120+ items",
    href: "/categories?section=stationery",
  },
  {
    name: "Books",
    description: "Educational, fiction & children books",
    icon: BookOpen,
    count: "200+ items",
    href: "/categories?section=stationery",
  },
  {
    name: "Cosmetics",
    description: "Beauty products & personal care",
    icon: Sparkles,
    count: "80+ items",
    href: "/categories?section=shopping-center",
  },
  {
    name: "House Items",
    description: "Kitchen, storage & home essentials",
    icon: Home,
    count: "100+ items",
    href: "/categories?section=shopping-center",
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Our Categories
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Browse through our carefully organized product categories to find exactly
            what you need for your home and family.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-primary">{c.count}</span>
                <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                  Browse →
                </span>
              </div>
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}