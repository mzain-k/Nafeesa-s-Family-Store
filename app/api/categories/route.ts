import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");

    const filter: Record<string, unknown> = {};
    if (section) filter.section = section;

    const categories = await Category.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: categories });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, image, icon, section, description } = body;

    if (!name || !section) {
      return NextResponse.json(
        { success: false, error: "Name and section are required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");
    const exists = await Category.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "Category already exists" },
        { status: 409 }
      );
    }

    const category = await Category.create({ name, slug, image, icon, section, description });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}