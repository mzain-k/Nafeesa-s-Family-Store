import Link from "next/link";
import { Tag } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number;
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Tag className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {category.description || "Explore our selection"}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-primary">
          {category.productCount ?? 0} {category.productCount === 1 ? "item" : "items"}
        </span>
        <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          Browse →
        </span>
      </div>
      <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
    </Link>
  );
}