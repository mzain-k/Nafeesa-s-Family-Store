import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Product from "@/models/Product";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const { slug } = await params;
    await connectDB();
    const category = await Category.findOne({ slug }).lean();
    if (!category) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const { slug } = await params;
    await connectDB();
    const cat = await Category.findOne({ slug });
    if (!cat) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    await Product.deleteMany({ category: cat._id });
    await Category.deleteOne({ _id: cat._id });
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}