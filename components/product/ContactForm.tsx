"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      alert("Please enter your name and message");
      return;
    }
    const text = `Hi! My name is ${form.name}.${form.phone ? ` Phone: ${form.phone}.` : ""}\n\n${form.message}`;
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Your name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Muhammad Ali"
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Phone (optional)</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="03001234567"
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Message</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help you?"
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        <MessageCircle className="mr-2 h-4 w-4" />
        Send via WhatsApp
      </Button>
    </form>
  );
}