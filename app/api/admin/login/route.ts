import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ success: false, error: "Password required" }, { status: 400 });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", process.env.ADMIN_PASSWORD as string, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_token");
  return res;
}