import { ImageResponse } from "next/og";

export const alt = "Mostrate: páginas web para negocios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F1117",
          color: "#F0EEE9",
          padding: "68px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 48, fontWeight: 700 }}>
          mos<span style={{ color: "#4F7FFF" }}>trate</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#4F7FFF", fontSize: 24, fontWeight: 700, letterSpacing: 3 }}>
            PÁGINAS WEB PARA NEGOCIOS
          </div>
          <div style={{ marginTop: 24, maxWidth: 950, fontSize: 78, fontWeight: 700, lineHeight: 1.12 }}>
            Tu página web, sin vueltas.
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(240,238,233,0.2)", paddingTop: 24, fontSize: 23 }}>
          mostrateonline.com.ar
        </div>
      </div>
    ),
    size,
  );
}
