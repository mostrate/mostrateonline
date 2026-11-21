/**
 * config.ts — Fuente única de verdad para textos, precios y datos de contacto
 * de la landing de Mostrate.
 *
 * Editá SOLO este archivo para actualizar precios, copy, links de contacto,
 * servicios, templates, etc. Ningún componente hardcodea estos valores.
 */

/* ─────────────────────────────  PRECIOS  ───────────────────────────── */
/* Editá acá los precios. Ejemplos: "USD 200", "$150.000", "A consultar". */
export const pricing = {
  landing: "$ 250.000",
  landingPro: "$ 400.000",
  sistemaBase: "$ 600.000 a $ 1.000.000",
  sistemaPersonalizado: "Valor a convenir",
};

/* ─────────────────────────────  DATOS DE CONTACTO  ─────────────────── */
export const contact = {
  email: "info@mostrate.com.ar",
  whatsapp: {
    label: "WhatsApp disponible",
    // Número en formato internacional sin "+" ni espacios, ej: "5491122334455".
    // Dejar vacío si todavía no hay número.
    number: "",
  },
};

/* ─────────────────────────────  SITIO / MARCA  ─────────────────────── */
export const site = {
  name: "Mostrate",
  url: "https://mostrateonline.com.ar",
  // El logo se pinta como: [first][accent] → "mos" + "trate" (acento en color)
  logo: { first: "mos", accent: "trate" },
  description:
    "Creamos, renovamos y mejoramos páginas web y sistemas para negocios y pymes de Argentina, con diseño personalizado y acompañamiento.",
};

/* ─────────────────────────────  NAV  ───────────────────────────────── */
export const nav = {
  links: [
    { label: "Servicios", href: "/#servicios", newTab: false, inFooter: true },
    { label: "Plantillas", href: "/biblioteca-templates", newTab: true, inFooter: false },
    { label: "Cómo trabajamos", href: "/#como-trabajamos", newTab: false, inFooter: true },
    { label: "Precios", href: "/#precios", newTab: false, inFooter: true },
    { label: "Preguntas frecuentes", href: "/#faq", newTab: false, inFooter: true },
  ],
  cta: { label: "Hablemos", href: "/#contacto" },
};

/* ─────────────────────────────  HERO  ──────────────────────────────── */
export const hero = {
  eyebrow: "PÁGINAS WEB HECHAS A TU MEDIDA",
  // El título se arma en 3 partes; "highlight" toma el color de acento.
  title: {
    before: "Tu página web, ",
    highlight: "sin vueltas.",
    after: "",
  },
  subtitle:
    "Mostrá tu negocio con una web profesional, adaptada a tu estilo y lista para que tus clientes te encuentren.",
  actions: {
    primary: { label: "Explorar diseños", href: "/biblioteca-templates" },
    secondary: { label: "Contarnos tu idea", href: "#contacto" },
  },
  preview: {
    label: "Previsualización de los cuatro modelos en computadora y celular",
    selector: "Elegir modelo de la portada",
  },
};

/* ─────────────────────────────  SERVICIOS  ─────────────────────────── */
export const servicios = {
  label: "Qué ofrecemos",
  title: ["Todo lo que necesitás", "para estar online"],
  subtitle: "Nosotros nos encargamos de todo el proceso, vos solo te ocupás de tu negocio.",
  items: [
    {
      icon: "diseno" as const,
      title: "Diseño personalizado",
      desc: "Armamos una web con la identidad de tu empresa, con tus colores, tu contenido y tu estilo.",
    },
    {
      icon: "hosting" as const,
      title: "Tu lugar en internet",
      desc: "Nos ocupamos de publicar tu página y mantenerla disponible en tu propio dominio.",
    },
    {
      icon: "responsive" as const,
      title: "Se ve bien en cualquier pantalla",
      desc: "Tus clientes van a poder navegarla cómodamente desde el celular, la tablet o la computadora.",
    },
    {
      icon: "mantenimiento" as const,
      title: "Mantenimiento",
      desc: "Cambios de contenido, actualizaciones y soporte.",
    },
  ],
};

/* ─────────────────────────────  TEMPLATES  ─────────────────────────── */
export const templates = {
  label: "Plantillas",
  title: ["Elegís el diseño,", "nosotros lo adaptamos"],
  subtitle:
    "Cuatro diseños pensados para distintos rubros. Mismo proceso, resultado único para cada cliente.",
  cta: "Ver demo en vivo",
  items: [
    {
      slug: "profesional",
      name: "Profesional",
      previewAddress: "estudiorivas.com",
      desc: "Ideal para contadores, abogados, consultores.",
      tag: "Servicios profesionales",
    },
    {
      slug: "comercio",
      name: "Comercio",
      previewAddress: "casabonita.com.ar",
      desc: "Para tiendas, locales, productos físicos.",
      tag: "Comercio local",
    },
    {
      slug: "gastronomia",
      name: "Gastronomía",
      previewAddress: "cantinasorrento.com.ar",
      desc: "Restaurantes, cafés, deliveries, catering.",
      tag: "Gastronomía",
    },
    {
      slug: "bienestar",
      name: "Bienestar",
      previewAddress: "nucleotraining.com.ar",
      desc: "Gimnasios, nutricionistas, psicólogos, coaches.",
      tag: "Salud y bienestar",
    },
  ],
};

/* ─────────────────────────────  PRECIOS (SECCIÓN)  ─────────────────── */
export const precios = {
  label: "Precios",
  title: "Sin letras chicas",
  subtitle: "Elegí el plan que mejor se adapte a lo que necesitás.",
  plans: [
    {
      name: "Landing",
      price: pricing.landing,
      features: [
        "1 página sin espacio para cargar o modificar contenido",
        "1 año de hosting y dominio gratis",
        "3 meses de soporte bonificados",
        "Entrega en 7 días hábiles",
        "Hasta 7 secciones",
      ],
    },
    {
      name: "Landing Pro",
      price: pricing.landingPro,
      features: [
        "Hasta 5 páginas sin espacio para cargar o modificar contenido",
        "1 año de hosting y dominio gratis",
        "3 meses de soporte bonificados",
        "Entrega en 10 días hábiles",
      ],
    },
    {
      name: "Sistema base",
      price: pricing.sistemaBase,
      features: [
        "Sistema personalizado con posibilidad de agregar, quitar y modificar contenido",
        "1 año de hosting y dominio gratis",
        "4 meses de soporte bonificados",
      ],
    },
    {
      name: "Sistema personalizado",
      price: pricing.sistemaPersonalizado,
      features: [
        "Sistema personalizado con funciones a determinar según la lógica de negocio de cada cliente",
        "1 año de hosting y dominio gratis",
        "6 meses de soporte",
        "Entrega a convenir",
      ],
    },
  ],
};

/* ──────────────────────── CÓMO TRABAJAMOS ─────────────────────────── */
export const comoTrabajamos = {
  label: "Cómo trabajamos",
  title: "Tu web en 4 pasos",
  subtitle: "Te acompañamos desde la primera idea hasta la publicación.",
  items: [
    { number: "01", title: "Nos contás", desc: "Conocemos lo que ofrecés y qué necesitás comunicar." },
    { number: "02", title: "Lo desarrollamos", desc: "Tomamos lo que nos contaste y empezamos a darle forma a tu página." },
    { number: "03", title: "Lo revisamos juntos", desc: "Te mostramos cómo quedó para ajustar los detalles antes de publicarla." },
    { number: "04", title: "Lo publicamos", desc: "Dejamos la web online, lista para potenciar tu negocio." },
  ],
};

/* ───────────────────────────── FAQ ────────────────────────────────── */
export const faq = {
  label: "Preguntas frecuentes",
  title: "Antes de empezar",
  subtitle: "Las respuestas a las dudas más comunes sobre el proceso.",
  items: [
    { question: "¿Qué información necesito preparar?", answer: "Una descripción de tu negocio, servicios o productos, datos de contacto e imágenes. Si algo falta, te ayudamos a ordenarlo." },
    { question: "¿Necesito tener un dominio?", answer: "No, nosotros nos encargamos de registrarlo y dejarlo funcionando con tu página." },
    { question: "¿La página se puede ver en el celular?", answer: "Sí, cada diseño se adapta para poder usarlo en teléfonos, tablets y computadoras." },
    { question: "¿Puedo cambiar textos o fotos una vez que quedó publicada?", answer: "Sí, todos los planes incluyen desde 3 meses de soporte bonificado." },
    { question: "¿Cuánto demora?", answer: "El plazo depende del servicio que elijas y de que cuentes con el contenido necesario para armar la web." },
  ],
};

/* ─────────────────────────────  CONTACTO (SECCIÓN)  ────────────────── */
export const contacto = {
  label: "Contacto",
  title: "¿Arrancamos?",
  subtitle: "Contanos un poco sobre tu negocio y te respondemos a la brevedad.",
  // Rótulos de los datos de contacto (los valores salen de `contact`).
  infoLabels: {
    email: "Email",
    whatsapp: "WhatsApp",
  },
  form: {
    name: { label: "Nombre", placeholder: "Tu nombre o el de tu negocio" },
    email: { label: "Email", placeholder: "tucorreo@ejemplo.com" },
    message: {
      label: "Mensaje",
      placeholder: "Contanos brevemente qué necesitás...",
    },
    submit: "Enviar consulta",
  },
};

/* ─────────────────────────────  FOOTER  ────────────────────────────── */
export const footer = {
  text: `© ${new Date().getFullYear()} Mostrate · Hecho con cuidado en Buenos Aires`,
};
