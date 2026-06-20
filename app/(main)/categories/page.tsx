import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { CategoryCard } from "@/components/product/CategoryCard";
import Link from "next/link";

async function getCategories(section?: string) {
  await connectDB();
  const filter: Record<string, unknown> = {};
  if (section) filter.section = section;

  const cats = await Category.find(filter).sort({ createdAt: -1 }).lean();
  const withCounts = await Promise.all(
    cats.map(async (c: any) => {
      const productCount = await Product.countDocuments({ category: c._id });
      return { ...c, productCount };
    })
  );
  return JSON.parse(JSON.stringify(withCounts));
}

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const categories = await getCategories(section);

  const tabs = [
    { label: "All", value: "" },
    { label: "Shopping Center", value: "shopping-center" },
    { label: "Stationery", value: "stationery" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Categories</span>
      </div>

      <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
        Our Categories
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Explore products across our two store sections.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const href = t.value ? `/categories?section=${t.value}` : "/categories";
          const active = (section || "") === t.value;
          return (
            <Link
              key={t.value || "all"}
              href={href}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-10">
        {categories.length === 0 ? (
          <div className="rounded-2xl bg-secondary/30 py-16 text-center">
            <div className="text-5xl">📂</div>
            <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
              No categories yet
            </h3>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c: any) => (
              <CategoryCard key={c._id} category={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}