/**
 * Config de Next para staging. No es parte del sitio: el workflow de deploy renombra el
 * next.config.mjs de la rama a next.config.base.mjs y copia este archivo en su lugar.
 *
 * - Desactiva la optimización de imágenes: /_next/image pide la imagen original por
 *   dentro sin las credenciales de Basic Auth, el middleware la rechaza y la respuesta
 *   es un 400. Sin optimizar, el navegador pide cada imagen directo, con la contraseña.
 * - Agrega `X-Robots-Tag: noindex` a todas las rutas. En Vercel, el header que pone el
 *   middleware no llega a las páginas autenticadas; el de `headers()` sí.
 */
import base from "./next.config.base.mjs";

const NOINDEX = { source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] };

const withStaging = (config) => ({
  ...config,
  images: { ...config.images, unoptimized: true },
  async headers() {
    const own = config.headers ? await config.headers() : [];
    return [...own, NOINDEX];
  },
});

export default typeof base === "function"
  ? async (...args) => withStaging(await base(...args))
  : withStaging(base);
