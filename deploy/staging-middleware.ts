import { NextResponse, type NextRequest } from "next/server";

/**
 * Usuario y contraseña para staging (staging.mostrateonline.com.ar).
 * No es parte del sitio: el workflow de deploy lo copia como `middleware.ts` solo al
 * publicar en staging, así cualquier rama sale protegida y producción no lo carga.
 * STAGING_PASSWORD y STAGING_USER (opcional: vacío = acepta cualquier usuario) son env
 * vars del proyecto de Vercel `mostrateonline-staging`. Ver DOCS.md, sección 11.
 */
export function middleware(request: NextRequest) {
  const password = process.env.STAGING_PASSWORD;
  if (!password) return NextResponse.next();

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = decodeBasic(header.slice(6));
    const expectedUser = process.env.STAGING_USER?.trim().toLowerCase();
    if (
      decoded &&
      (!expectedUser || decoded.user.trim().toLowerCase() === expectedUser) &&
      safeEqual(decoded.password, password)
    ) {
      const response = NextResponse.next();
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }
  }

  return new NextResponse("Acceso restringido: es la versión de prueba de Mostrate.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Staging Mostrate", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function decodeBasic(value: string): { user: string; password: string } | null {
  try {
    const text = new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0)));
    const i = text.indexOf(":");
    return i === -1 ? null : { user: text.slice(0, i), password: text.slice(i + 1) };
  } catch {
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
