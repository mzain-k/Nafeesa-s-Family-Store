"use client";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

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
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      emoji: product.emoji,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block">
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
        <div className="p-4 pb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category?.name || "—"}
          </span>
          <h3 className="mt-1 font-medium text-foreground line-clamp-1">{product.name}</h3>
          <p className="mt-2 text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}