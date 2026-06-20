import Link from "next/link";

const products = [
  {
    name: "Premium Notebook Set",
    category: "Stationery",
    price: "Rs. 450",
    badge: "Popular",
    emoji: "📓",
  },
  {
    name: "Children's Story Collection",
    category: "Books",
    price: "Rs. 850",
    badge: "New",
    emoji: "📚",
  },
  {
    name: "Organic Skincare Kit",
    category: "Cosmetics",
    price: "Rs. 1,200",
    badge: "Bestseller",
    emoji: "🧴",
  },
  {
    name: "Kitchen Storage Set",
    category: "House Items",
    price: "Rs. 750",
    badge: "",
    emoji: "🫙",
  },
  {
    name: "Art Supplies Bundle",
    category: "Stationery",
    price: "Rs. 550",
    badge: "Sale",
    emoji: "🎨",
  },
  {
    name: "Educational Workbooks",
    category: "Books",
    price: "Rs. 380",
    badge: "",
    emoji: "📖",
  },
  {
    name: "Hair Care Essentials",
    category: "Cosmetics",
    price: "Rs. 680",
    badge: "Popular",
    emoji: "💆",
  },
  {
    name: "Home Decor Items",
    category: "House Items",
    price: "Rs. 920",
    badge: "New",
    emoji: "🏺",
  },
];

export function ProductsSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              Featured Products
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Bestsellers
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <div
              key={i}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-square bg-secondary/50">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                    {p.emoji}
                  </span>
                </div>
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </span>
                <h3 className="mt-1 font-medium text-foreground">{p.name}</h3>
                <p className="mt-2 text-lg font-semibold text-primary">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}