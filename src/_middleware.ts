import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const random = Math.random().toString();

  console.log("Request", req.cookies);

  const res = NextResponse.next();

  res.cookies.set("userCookie", random, { sameSite: "strict" });

  return res;
}
