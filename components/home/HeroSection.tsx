import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: Text */}
          <div className="flex flex-col items-start">
            <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Welcome to Nafeesa
            </span>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Quality products for your family
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Discover our curated collection from{" "}
              <span className="font-medium text-foreground">
                Nafeesa Shopping Center
              </span>{" "}
              and{" "}
              <span className="font-medium text-foreground">
                AbuBakar Stationery
              </span>
              . Quality products with exceptional service.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/categories">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/20 hover:bg-primary/5"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-8 border-t border-border pt-8">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Years Serving</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Happy Families</p>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-card shadow-sm">
                    <span className="text-5xl">📚</span>
                  </div>
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-card shadow-sm">
                    <span className="text-5xl">✏️</span>
                  </div>
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-card shadow-sm">
                    <span className="text-5xl">💄</span>
                  </div>
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-card shadow-sm">
                    <span className="text-5xl">🏠</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent/10" />
          </div>

        </div>
      </div>
    </section>
  );
}