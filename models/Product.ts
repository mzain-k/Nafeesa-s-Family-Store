import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String }],
    emoji: { type: String, default: "" },
    badge: { type: String, default: "" },
    featured: { type: Boolean, default: false, index: true },
    inStock: { type: Boolean, default: true },
    section: {
      type: String,
      enum: ["shopping-center", "stationery"],
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text" });

const Product = models.Product || model("Product", ProductSchema);
export default Product;