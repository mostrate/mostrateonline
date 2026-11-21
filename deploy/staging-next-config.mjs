/**
 * Config de Next para staging. No es parte del sitio: el workflow de deploy renombra el
 * next.config.mjs de la rama a next.config.base.mjs y copia este archivo en su lugar.
 *
 * Desactiva la optimización de imágenes: /_next/image pide la imagen original por
 * dentro sin las credenciales de Basic Auth, el middleware la rechaza y la respuesta
 * es un 400. Sin optimizar, el navegador pide cada imagen directo, con la contraseña.
 */
import base from "./next.config.base.mjs";

const withStaging = (config) => ({
  ...config,
  images: { ...config.images, unoptimized: true },
});

export default typeof base === "function"
  ? async (...args) => withStaging(await base(...args))
  : withStaging(base);
