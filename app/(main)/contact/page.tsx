import { MapPin, Phone, Clock, MessageCircle, Mail } from "lucide-react";
import { ContactForm } from "@/components/product/ContactForm";

export const metadata = { title: "Contact Us | Nafeesa Family Store" };

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || "";

  return (
    <>
      <section className="bg-secondary/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Get in touch</span>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Reach out via WhatsApp, call us, or send us a message.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Contact Information</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Store Address</div>
                    <div className="mt-1 text-sm text-muted-foreground">Nafeesa's Family Store, Archer Road, Quetta, Pakistan</div>
                  </div>
                </div>

                <a href={`tel:${phoneNumber}`} className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Call us</div>
                    <div className="mt-1 text-sm text-muted-foreground">{phoneNumber}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">WhatsApp</div>
                    <div className="mt-1 text-sm text-muted-foreground">Quickest way to reach us</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Open Hours</div>
                    <div className="mt-1 text-sm text-muted-foreground">Everyday, 9 AM – 9 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="mt-1 text-sm text-muted-foreground">hello@nafeesastore.com</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-border bg-secondary/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231823.30!2d66.93!3d24.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi!5e0!3m2!1sen!2s!4v0"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Store location"
                />
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-serif text-2xl font-bold text-foreground">Send us a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your message will be sent directly to our WhatsApp.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}