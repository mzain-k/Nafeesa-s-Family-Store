import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price?: number;
  emoji?: string;
  badge?: string;
  inStock: boolean;
  images?: string[];
  category?: { name: string; slug: string };
}

function formatPrice(price?: number): string {
  if (!price || price === 0) return "Contact for price";
  return `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square bg-secondary/50">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
              {product.emoji || "📦"}
            </span>
          </div>
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-medium text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category?.name || "—"}
        </span>
        <h3 className="mt-1 font-medium text-foreground line-clamp-1">{product.name}</h3>
        <p className="mt-2 text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}