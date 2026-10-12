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
  inicial: "A consultar",
  mensual: "A consultar",
};

/* ─────────────────────────────  DATOS DE CONTACTO  ─────────────────── */
export const contact = {
  email: "hola@mostrate.com.ar",
  whatsapp: {
    label: "WhatsApp disponible",
    // Número en formato internacional sin "+" ni espacios, ej: "5491122334455".
    // Dejar vacío si todavía no hay número.
    number: "",
  },
  location: "Buenos Aires, Argentina",
};

/* ─────────────────────────────  SITIO / MARCA  ─────────────────────── */
export const site = {
  name: "Mostrate",
  // El logo se pinta como: [first][accent] → "mos" + "trate" (acento en color)
  logo: { first: "mos", accent: "trate" },
  description:
    "Landing pages profesionales para emprendedores, pequeños negocios y monotributistas en Argentina.",
};

/* ─────────────────────────────  NAV  ───────────────────────────────── */
export const nav = {
  links: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Templates", href: "/#templates" },
    { label: "Cómo trabajamos", href: "/#como-trabajamos" },
    { label: "Precios", href: "/#precios" },
    { label: "Preguntas frecuentes", href: "/#faq" },
  ],
  cta: { label: "Hablemos", href: "/#contacto" },
};

/* ─────────────────────────────  HERO  ──────────────────────────────── */
export const hero = {
  eyebrow: "PÁGINAS WEB PARA NEGOCIOS REALES",
  // El título se arma en 3 partes; "highlight" toma el color de acento.
  title: {
    before: "Tu negocio merece una ",
    highlight: "presencia digital",
    after: " que lo represente.",
  },
  subtitle:
    "Una página clara y propia para que quien llegue entienda tu propuesta y dé el próximo paso.",
  actions: {
    primary: { label: "Ver templates", href: "#templates" },
    secondary: { label: "Contactar", href: "#contacto" },
  },
  proof: "Diseño, tiempos y precio claros desde el comienzo.",
  preview: {
    label: "Tu próxima página",
    identity: "Diseño a medida",
    detail: "01 / Tu identidad",
  },
};

export const demos = {
  label: "Demos en vivo",
  title: "Mirá cada diseño en funcionamiento",
  subtitle:
    "Explorá los templates en escritorio y celular antes de elegir el punto de partida para tu página.",
  openDemo: "Abrir demo",
  library: "Ver todos los templates",
};

export const library = {
  backToHome: "Volver al inicio",
};

/* ─────────────────────────────  SERVICIOS  ─────────────────────────── */
export const servicios = {
  label: "Qué ofrecemos",
  title: ["Todo lo que necesitás", "para estar online"],
  subtitle: "Nos encargamos de todo el proceso, vos solo nos mandás el contenido.",
  items: [
    {
      icon: "diseno" as const,
      title: "Diseño personalizado",
      desc: "Adaptamos el template a la identidad de tu negocio: colores, tipografías, imágenes y textos.",
    },
    {
      icon: "hosting" as const,
      title: "Dominio y hosting",
      desc: "Gestionamos el dominio y el hosting por vos. Tu página disponible en internet, sin complicaciones técnicas.",
    },
    {
      icon: "responsive" as const,
      title: "Diseño responsive",
      desc: "Tu página se ve bien en celular, tablet y computadora. Siempre.",
    },
    {
      icon: "mantenimiento" as const,
      title: "Mantenimiento mensual",
      desc: "Cambios de contenido, actualizaciones y soporte incluidos en el abono mensual.",
    },
  ],
};

/* ─────────────────────────────  TEMPLATES  ─────────────────────────── */
export const templates = {
  label: "Templates",
  title: ["Elegís el diseño,", "nosotros lo adaptamos"],
  subtitle:
    "Cuatro diseños pensados para distintos rubros. Mismo proceso, resultado único para cada cliente.",
  cta: "Ver demo en vivo",
  items: [
    {
      slug: "profesional",
      name: "Profesional",
      desc: "Ideal para contadores, abogados, consultores.",
      tag: "Servicios profesionales",
    },
    {
      slug: "comercio",
      name: "Comercio",
      desc: "Para tiendas, locales, productos físicos.",
      tag: "Comercio local",
    },
    {
      slug: "gastronomia",
      name: "Gastronomía",
      desc: "Restaurantes, cafés, deliveries, catering.",
      tag: "Gastronomía",
    },
    {
      slug: "bienestar",
      name: "Bienestar",
      desc: "Gimnasios, nutricionistas, psicólogos, coaches.",
      tag: "Salud y bienestar",
    },
  ],
};

/* ─────────────────────────────  PRECIOS (SECCIÓN)  ─────────────────── */
export const precios = {
  label: "Precios",
  title: "Sin letras chicas",
  subtitle:
    "Un pago inicial para arrancar, y un abono mensual para que todo funcione siempre.",
  note: {
    question: "¿Tenés dudas?",
    link: { label: "Hablemos antes de decidir — sin compromisos.", href: "#contacto" },
  },
  plans: [
    {
      name: "Pago inicial",
      price: pricing.inicial,
      period: "único · incluye diseño y desarrollo",
      featured: false,
      badge: "",
      features: [
        "Template personalizado con tu contenido",
        "Dominio propio (.com.ar o .com)",
        "Hasta 5 secciones",
        "Entrega en 7 días hábiles",
      ],
      cta: { label: "Consultar", href: "#contacto", style: "outline" as const },
    },
    {
      name: "Abono mensual",
      price: pricing.mensual,
      period: "por mes · a partir del segundo mes",
      featured: true,
      badge: "Más elegido",
      features: [
        "Hosting y dominio incluidos",
        "Hasta 2 cambios de contenido por mes",
        "Soporte ante cualquier problema",
        "Página siempre online",
      ],
      cta: { label: "Empezar ahora", href: "#contacto", style: "solid" as const },
    },
  ],
};

/* ──────────────────────── CÓMO TRABAJAMOS ─────────────────────────── */
export const comoTrabajamos = {
  label: "Cómo trabajamos",
  title: "Un proceso claro, de principio a fin",
  subtitle:
    "Avanzamos con pasos simples para que tu página refleje el negocio y llegue a publicarse sin complicaciones.",
  items: [
    { number: "01", title: "Nos contás", desc: "Conocemos tu negocio, lo que ofrecés y qué necesitás comunicar." },
    { number: "02", title: "Lo diseñamos", desc: "Adaptamos el template a tus colores, textos, imágenes e identidad." },
    { number: "03", title: "Lo revisamos", desc: "Te mostramos la página para ajustar los detalles antes de publicarla." },
    { number: "04", title: "La publicamos", desc: "Dejamos la web online, lista para que la compartas con tus clientes." },
  ],
};

/* ───────────────────────────── FAQ ────────────────────────────────── */
export const faq = {
  label: "Preguntas frecuentes",
  title: "Antes de empezar",
  subtitle: "Las respuestas a las dudas más comunes sobre el proceso.",
  items: [
    { question: "¿Necesito tener un dominio?", answer: "No. Podemos orientarte para registrarlo y dejarlo funcionando junto con tu página." },
    { question: "¿Qué información necesito preparar?", answer: "Una descripción de tu negocio, servicios o productos, datos de contacto e imágenes. Si algo falta, te ayudamos a ordenarlo." },
    { question: "¿La página funciona en celular?", answer: "Sí. Cada diseño se adapta para verse y usarse bien en celular, tablet y computadora." },
    { question: "¿Puedo cambiar textos o fotos después?", answer: "Sí. Los cambios de contenido se incluyen dentro del mantenimiento mensual acordado." },
    { question: "¿Cuánto demora?", answer: "El plazo depende del alcance y de contar con el contenido necesario. Lo definimos antes de empezar." },
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
    location: "Ubicación",
  },
  form: {
    name: { label: "Nombre", placeholder: "Tu nombre o el de tu negocio" },
    email: { label: "Email", placeholder: "tucorreo@ejemplo.com" },
    rubro: {
      label: "Rubro",
      placeholder: "Seleccioná tu rubro",
      options: [
        "Servicios profesionales",
        "Comercio local",
        "Gastronomía",
        "Salud y bienestar",
        "Otro",
      ],
    },
    message: {
      label: "Mensaje (opcional)",
      placeholder: "Contanos brevemente qué necesitás...",
    },
    submit: "Enviar consulta",
  },
};

/* ─────────────────────────────  FOOTER  ────────────────────────────── */
export const footer = {
  text: `© ${new Date().getFullYear()} Mostrate · Hecho con cuidado en Buenos Aires`,
};
