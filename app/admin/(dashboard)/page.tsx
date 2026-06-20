import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Link from "next/link";
import { Package, Tag, Star, AlertCircle } from "lucide-react";

async function getStats() {
  await connectDB();
  const [totalProducts, totalCategories, featured, outOfStock] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Product.countDocuments({ featured: true }),
    Product.countDocuments({ inStock: false }),
  ]);
  return { totalProducts, totalCategories, featured, outOfStock };
}

export default async function AdminHome() {
  const stats = await getStats();
  const cards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package, color: "bg-primary/10 text-primary" },
    { title: "Categories", value: stats.totalCategories, icon: Tag, color: "bg-accent/10 text-accent" },
    { title: "Featured Items", value: stats.featured, icon: Star, color: "bg-primary/10 text-primary" },
    { title: "Out of Stock", value: stats.outOfStock, icon: AlertCircle, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your store products and categories</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-card p-5 shadow-sm">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${c.color}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <div className="font-serif text-3xl font-bold text-foreground">{c.value}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{c.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link href="/admin/products" className="rounded-2xl bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Manage Products</h3>
              <p className="text-sm text-muted-foreground">Add, edit, delete & feature products</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/categories" className="rounded-2xl bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Manage Categories</h3>
              <p className="text-sm text-muted-foreground">Organize products by type</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}