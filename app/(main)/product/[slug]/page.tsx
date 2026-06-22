import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Phone, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton.tsx";

function formatPrice(price?: number): string {
  if (!price || price === 0) return "Contact for price";
  return `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;
}

function getWhatsAppLink(productName?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const msg = productName
    ? `Hi! I'm interested in ordering: *${productName}*. Please share more details.`
    : `Hi! I'm interested in your products at Nafeesa Family Store.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

function getCallLink(): string {
  return `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || ""}`;
}

async function getProduct(slug: string) {
  await connectDB();
  const product = await Product.findOne({ slug }).populate("category", "name slug").lean<any>();
  if (!product) return null;

  const related = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id },
  })
    .populate("category", "name slug")
    .limit(4)
    .lean();

  return {
    product: JSON.parse(JSON.stringify(product)),
    related: JSON.parse(JSON.stringify(related)),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) notFound();
  const { product, related } = data;
  const cat = product.category;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-primary">Categories</Link>
        {cat?.slug && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/category/${cat.slug}`} className="hover:text-primary">{cat.name}</Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <ProductGallery images={product.images} name={product.name} emoji={product.emoji} />

        <div>
          {cat?.name && (
            <Link href={`/category/${cat.slug}`} className="text-xs font-medium uppercase tracking-widest text-primary hover:underline">
              {cat.name}
            </Link>
          )}
          <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.badge && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                {product.badge}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                product.inStock ? "border border-primary/30 text-primary" : "border border-destructive/30 text-destructive"
              }`}
            >
              {product.inStock ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h3>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/90">
              {product.description}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <AddToCartButton product={product} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild size="lg">
                <a href={getWhatsAppLink(product.name)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                <a href={getCallLink()}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call to inquire
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary/40 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div>
              <div className="mt-1 font-medium text-foreground">
                {product.section === "shopping-center" ? "Shopping Center" : "Stationery"}
              </div>
            </div>
            <div className="rounded-xl bg-secondary/40 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Category</div>
              <div className="mt-1 font-medium text-foreground">{cat?.name || "—"}</div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Related products
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}