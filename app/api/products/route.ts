import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const section = searchParams.get("section");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};

    if (category) {
      const cat = await Category.findOne({ slug: category }).lean<{ _id: any }>();
      if (cat) filter.category = cat._id;
      else return NextResponse.json({ success: true, data: [] });
    }
    if (section) filter.section = section;
    if (featured === "true") filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: products });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, description, category, section } = body;

    if (!name || !description || !category || !section) {
      return NextResponse.json(
        { success: false, error: "name, description, category and section are required" },
        { status: 400 }
      );
    }

    let slug = name.toLowerCase().trim().replace(/\s+/g, "-");
    const existing = await Product.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const product = await Product.create({ ...body, slug });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}