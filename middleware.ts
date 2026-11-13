import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical host — everything else (www, and any other alias Vercel has
// pointed at this project) gets a permanent redirect here so Google only
// ever sees one URL per page. Without this, www and the apex domain serve
// identical content and get flagged in Search Console as duplicates with
// no canonical picked, which keeps affected pages out of the index.
const CANONICAL_HOST = "biggysmallzspitmasters.co.za";

// The project's own production address on vercel.app. It serves the same
// pages as the real domain, so it is redirected too. Preview deployments
// (other *.vercel.app hosts) are left alone so branches can be reviewed.
const VERCEL_PRODUCTION_HOST = "biggysmallz-spitmasters.vercel.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (
    host &&
    host !== CANONICAL_HOST &&
    (host === VERCEL_PRODUCTION_HOST || !host.endsWith(".vercel.app"))
  ) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internals and static assets, so the
     * host check runs on every real page without adding overhead to
     * _next/* or public files.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)",
  ],
};
