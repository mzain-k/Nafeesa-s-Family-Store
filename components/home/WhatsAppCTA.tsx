import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppCTA() {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
            <MessageCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
            Need help? Chat with us!
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Have questions about our products or need assistance with your order?
            We&apos;re just a message away. Reach out to us on WhatsApp for instant
            support.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <a   href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
                asChild
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary"
                >
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us
                </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/60">
            Available Everyday, 9 AM - 9 PM
          </p>
        </div>
      </div>
    </section>
  );
}