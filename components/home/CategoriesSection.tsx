import Link from "next/link";
import { Tag } from "lucide-react";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";

async function getCategories() {
  await connectDB();
  const cats = await Category.find().sort({ createdAt: -1 }).limit(8).lean();
  const withCounts = await Promise.all(
    cats.map(async (c: any) => {
      const productCount = await Product.countDocuments({ category: c._id });
      return { ...c, productCount };
    })
  );
  return JSON.parse(JSON.stringify(withCounts));
}

export async function CategoriesSection() {
  const categories = await getCategories();

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

        <div className="mt-16">
          {categories.length === 0 ? (
            <div className="rounded-2xl bg-card py-16 text-center">
              <div className="text-5xl">📂</div>
              <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                No categories yet
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Categories will appear here once added via the admin panel.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((c: any) => (
                <Link
                  key={c._id}
                  href={`/category/${c.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {c.images && c.images.length > 0 ? (
                      <img src={c.images[0]} alt={c.name} className="h-full w-full object-cover" />
                    ) : c.icon ? (
                      <span className="text-2xl">{c.icon}</span>
                    ) : (
                      <Tag className="h-7 w-7" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {c.description || "Explore our selection"}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-primary">
                      {c.productCount ?? 0} {c.productCount === 1 ? "item" : "items"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      Browse →
                    </span>
                  </div>
                  <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}