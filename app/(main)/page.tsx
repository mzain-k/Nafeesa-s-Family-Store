import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { WhatsAppCTA } from "@/components/home/WhatsAppCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <WhatsAppCTA />
    </main>
  );
}