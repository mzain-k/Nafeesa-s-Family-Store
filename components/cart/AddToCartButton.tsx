"use client";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

interface Props {
  product: {
    _id: string;
    name: string;
    slug: string;
    price?: number;
    images?: string[];
    emoji?: string;
    inStock: boolean;
  };
}

export function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
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
    <Button
      onClick={handleClick}
      disabled={!product.inStock}
      size="lg"
      variant="outline"
      className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
        </>
      )}
    </Button>
  );
}