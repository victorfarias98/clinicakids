import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function buildContentSecurityPolicy(
  nonce: string,
  isDevelopment = process.env.NODE_ENV === "development",
): string {
  return `
    default-src 'self';
    script-src 'self' ${isDevelopment ? "'unsafe-eval' 'unsafe-inline'" : `'nonce-${nonce}' 'strict-dynamic'`};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    media-src 'self' blob:;
    connect-src 'self'${isDevelopment ? " ws: wss:" : ""};
    worker-src 'self' blob:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Optional HTTP Basic Auth gate for temporary/staging deploys, before real
 * client content and domain are ready. Inactive unless both ADMIN_USER and
 * ADMIN_PASSWORD are set — unset both for the real public launch.
 */
function checkStagingAuth(request: NextRequest): Response | null {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword) return null;

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    const providedUser = decoded.slice(0, separatorIndex);
    const providedPassword = decoded.slice(separatorIndex + 1);
    if (providedUser === expectedUser && providedPassword === expectedPassword) {
      return null;
    }
  }

  return new Response("Autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Acesso temporário", charset="UTF-8"',
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export function proxy(request: NextRequest) {
  const unauthorized = checkStagingAuth(request);
  if (unauthorized) return unauthorized;

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  return response;
}

export const config = {
  matcher: [
    {
      // Includes /api, robots.txt and sitemap.xml so the optional staging
      // auth gate (checkStagingAuth) also protects them when active; only
      // static build output and binary assets are excluded.
      source:
        "/((?!_next/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
