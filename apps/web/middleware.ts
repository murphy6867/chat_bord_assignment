import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const middleware = async (req: NextRequest) => {
  const session = await getSession();
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  NextResponse.next();
};

export const config = {
  matcher: ["/ourblog"],
};

export default middleware;
