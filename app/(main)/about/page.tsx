import { Clock, MapPin, Heart, Award, ShoppingBag, BookOpen } from "lucide-react";

export const metadata = { title: "About Us | Nafeesa Family Store" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-secondary/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            About Nafeesa
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Story
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Two trusted names. One family. Serving our community with quality and care since 2014.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">Our Mission</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Family-first, quality-always
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            At Nafeesa Family Store, we believe shopping should be simple, friendly, and trustworthy.
            For years we've served our neighbourhood with a wide selection of daily essentials and
            quality stationery — all under one trusted family name.
          </p>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              Two Stores, One Family
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Sections
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-card p-8 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">Nafeesa Shopping Center</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Your one-stop neighbourhood shop for cosmetics, personal care
                products, snacks, household items, and everyday essentials.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-sm">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">AbuBakar Stationery</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                A complete stationery destination for students, professionals, and offices —
                textbooks, notebooks, pens, art supplies, bags and office equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              What We Stand For
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, title: "Family-Owned", desc: "Personal service you can trust." },
              { icon: Award, title: "Quality First", desc: "Only the best on our shelves." },
              { icon: Clock, title: "Open 7 Days", desc: "Convenient hours for busy families." },
              { icon: MapPin, title: "Local & Loved", desc: "Proudly serving our community." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-20 sm:py-24">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">Visit Us</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Store Timings
            </h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl bg-card shadow-sm">
            {[
              { day: "Sunday – Thursday", time: "9:00 AM – 10:00 PM" },
              { day: "Friday", time: "9:00 AM – 8:00 PM" },
            ].map((row, i, arr) => (
              <div key={row.day} className={`flex items-center justify-between px-6 py-4 ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <span className="font-medium text-foreground">{row.day}</span>
                <span className="text-muted-foreground">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}