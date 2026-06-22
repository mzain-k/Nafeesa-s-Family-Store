"use client";
import { useState } from "react";
import { X, Minus, Plus, Trash2, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

function formatPrice(price?: number): string {
  if (!price || price === 0) return "Contact for price";
  return `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const buildOrderMessage = () => {
    if (items.length === 0) return "";
    let msg = "Hi! I'd like to order the following items:\n\n";
    items.forEach((item, i) => {
      const lineTotal = (item.price || 0) * item.quantity;
      msg += `${i + 1}. ${item.name} x${item.quantity}`;
      if (item.price) msg += ` — Rs. ${new Intl.NumberFormat("en-PK").format(lineTotal)}`;
      msg += "\n";
    });
    msg += `\nTotal: Rs. ${new Intl.NumberFormat("en-PK").format(totalPrice)}`;
    return msg;
  };

  const handleWhatsApp = () => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    const url = `https://wa.me/${number}?text=${encodeURIComponent(buildOrderMessage())}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || ""}`;
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-serif text-xl font-bold text-foreground">Your Order</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
              <p className="mt-4 text-muted-foreground">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Add products to start your order
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 rounded-xl border border-border p-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/50">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl">{item.emoji || "📦"}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground line-clamp-1">{item.name}</h4>
                    <p className="mt-0.5 text-sm font-semibold text-primary">{formatPrice(item.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-border">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 hover:bg-secondary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 hover:bg-secondary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-muted-foreground underline hover:text-destructive"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-serif text-2xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button onClick={handleWhatsApp} size="lg">
                <MessageCircle className="mr-2 h-4 w-4" />
                Order on WhatsApp
              </Button>
              <Button onClick={handleCall} size="lg" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call to Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}