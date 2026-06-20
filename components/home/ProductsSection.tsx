export const revalidate = 0;

import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category";

function formatPrice(price?: number): string {
  if (!price || price === 0) return "Contact for price";
  return `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;
}

async function getFeatured() {
  await connectDB();
  const products = await Product.find({ featured: true })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();
  return JSON.parse(JSON.stringify(products));
}

export async function ProductsSection() {
  const products = await getFeatured();

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
          <Link href="/categories" className="text-sm font-medium text-primary hover:text-primary/80">
            View all products →
          </Link>
        </div>

        <div className="mt-12">
          {products.length === 0 ? (
            <div className="rounded-2xl bg-secondary/30 py-16 text-center">
              <div className="text-5xl">⭐</div>
              <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                No featured products yet
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mark products as "Featured" in the admin panel to show them here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p: any) => (
                <Link
                  key={p._id}
                  href={`/product/${p.slug}`}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-square bg-secondary/50">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                          {p.emoji || "📦"}
                        </span>
                      </div>
                    )}
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                        {p.badge}
                      </span>
                    )}
                    {!p.inStock && (
                      <span className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-medium text-white">
                        Out of stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {p.category?.name || "—"}
                    </span>
                    <h3 className="mt-1 font-medium text-foreground line-clamp-1">{p.name}</h3>
                    <p className="mt-2 text-lg font-semibold text-primary">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}