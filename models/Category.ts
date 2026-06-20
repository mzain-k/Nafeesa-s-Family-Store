import { Schema, models, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    image: { type: String, default: "" },
    icon: { type: String, default: "" },
    description: { type: String, default: "" },
    section: {
      type: String,
      enum: ["shopping-center", "stationery"],
      required: true,
    },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);
export default Category;