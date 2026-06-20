"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";

interface Category {
  _id: string;
  name: string;
  section: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  category: Category | string;
  section: string;
  emoji?: string;
  badge?: string;
  images: string[];
  featured: boolean;
  inStock: boolean;
}

type FormState = {
  name: string;
  description: string;
  price: number;
  category: string;
  section: string;
  emoji: string;
  badge: string;
  images: string[];
  featured: boolean;
  inStock: boolean;
};

const emptyForm: FormState = {
  name: "",
  description: "",
  price: 0,
  category: "",
  section: "shopping-center",
  emoji: "",
  badge: "",
  images: [],
  featured: false,
  inStock: true,
};

function formatPrice(price?: number): string {
  if (!price || price === 0) return "Contact for price";
  return `Rs. ${new Intl.NumberFormat("en-PK").format(price)}`;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([fetch("/api/products"), fetch("/api/categories")]);
      const [pData, cData] = await Promise.all([pRes.json(), cRes.json()]);
      if (pData.success) setProducts(pData.data);
      if (cData.success) setCategories(cData.data);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingSlug(null);
    setError("");
    setForm({
      ...emptyForm,
      category: categories[0]?._id || "",
      section: categories[0]?.section || "shopping-center",
    });
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    const catId = typeof p.category === "string" ? p.category : (p.category as Category)._id;
    setEditingSlug(p.slug);
    setError("");
    setForm({
      name: p.name,
      description: p.description,
      price: p.price ?? 0,
      category: catId || "",
      section: p.section,
      emoji: p.emoji || "",
      badge: p.badge || "",
      images: p.images || [],
      featured: p.featured,
      inStock: p.inStock,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category) {
      setError("Name, description and category are required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      const url = editingSlug ? `/api/products/${editingSlug}` : "/api/products";
      const method = editingSlug ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setOpen(false);
      load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleField = async (p: Product, field: "featured" | "inStock") => {
    try {
      const res = await fetch(`/api/products/${p.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !p[field] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const noCategories = categories.length === 0;

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add, edit, feature, and remove products</p>
        </div>
        <Button onClick={openCreate} disabled={noCategories}>
          <Plus className="mr-2 h-4 w-4" /> New product
        </Button>
      </div>

      {noCategories && (
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm">
          You need to{" "}
          <a href="/admin/categories" className="font-medium text-primary underline">
            create at least one category
          </a>{" "}
          before adding products.
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="rounded-2xl bg-card p-10 text-center text-sm text-muted-foreground shadow-sm">
            Loading…
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-card p-10 text-center shadow-sm">
            <div className="text-5xl">📦</div>
            <p className="mt-3 text-muted-foreground">
              No products yet — click <span className="font-medium">New product</span> to add one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-card shadow-sm">
            <table className="w-full min-w-[700px]">
              <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {products.map((p) => {
                  const cat = p.category as Category;
                  return (
                    <tr key={p._id} className="hover:bg-secondary/30">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-xl">
                            {p.emoji || "📦"}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">{cat?.name || "—"}</td>
                      <td className="px-6 py-3 text-foreground">{formatPrice(p.price)}</td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-1">
                          <button onClick={() => toggleField(p, "featured")} title="Toggle featured">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                p.featured ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                              }`}
                            >
                              <Star className="h-3 w-3" />
                              {p.featured ? "Featured" : "Feature"}
                            </span>
                          </button>
                          <button onClick={() => toggleField(p, "inStock")} title="Toggle stock status">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                p.inStock ? "border border-primary/30 text-primary" : "bg-destructive text-white"
                              }`}
                            >
                              {p.inStock ? "In stock" : "Out of stock"}
                            </span>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button onClick={() => openEdit(p)} className="rounded-lg p-2 hover:bg-secondary" aria-label="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.slug)}
                            className="rounded-lg p-2 text-destructive hover:bg-destructive/10"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-foreground">
                {editingSlug ? "Edit product" : "New product"}
              </h3>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Premium Notebook Set"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product…"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Price (Rs.)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-muted-foreground">Leave 0 to show "Contact for price"</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const cat = categories.find((c) => c._id === e.target.value);
                      setForm({ ...form, category: e.target.value, section: cat?.section || form.section });
                    }}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Emoji (fallback icon)</label>
                  <input
                    value={form.emoji}
                    onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                    placeholder="📓"
                    maxLength={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Badge</label>
                  <input
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="Popular / New / Sale (optional)"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <ImageUploader
                images={form.images}
                onChange={(images) => setForm({ ...form, images })}
                />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">Featured on homepage</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">In stock</span>
                </label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : editingSlug ? "Save changes" : "Create product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}