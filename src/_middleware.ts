import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.cookies.get("userCookie")) {
    return;
  }

  const random = Math.random().toString();

  console.log("Request", req.cookies);

  const res = NextResponse.next();

  res.cookies.set("userCookie", random, { sameSite: "strict" });

  return res;
}
