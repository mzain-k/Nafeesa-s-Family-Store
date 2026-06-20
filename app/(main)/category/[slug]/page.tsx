import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { ProductCard } from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getData(slug: string) {
  await connectDB();
  const category = await Category.findOne({ slug }).lean<any>();
  if (!category) return null;

  const products = await Product.find({ category: category._id })
    .populate("category", "name slug")
    .sort({ createdAt: -1 })
    .lean();

  return {
    category: JSON.parse(JSON.stringify(category)),
    products: JSON.parse(JSON.stringify(products)),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) notFound();
  const { category, products } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-primary">Categories</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </div>

      <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
        {category.name}
      </h1>
      {category.description && (
        <p className="mt-3 max-w-xl text-muted-foreground">{category.description}</p>
      )}
      <p className="mt-2 text-sm text-muted-foreground">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-10">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-secondary/30 py-16 text-center">
            <div className="text-5xl">📦</div>
            <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
              No products yet
            </h3>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}