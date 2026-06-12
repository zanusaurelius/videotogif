import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

// Satori accepts plain objects — no React needed
function h(type, props, ...children) {
  const flat = children.flat(Infinity);
  return {
    type,
    props: {
      ...props,
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

export default function handler() {
  return new ImageResponse(
    h("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#0d0d0d",
        position: "relative",
      },
    },
      // Decorative film frames — top-left
      h("div", {
        style: {
          display: "flex",
          position: "absolute",
          top: "48px",
          left: "60px",
          gap: "8px",
          alignItems: "flex-end",
        },
      },
        ...[50, 38, 58, 44, 52].map((height, i) =>
          h("div", {
            key: i,
            style: {
              display: "flex",
              width: "32px",
              height: `${height}px`,
              backgroundColor: i === 2 ? "rgba(108,111,255,0.4)" : "#1c1c1e",
              border: `1px solid ${i === 2 ? "#6c6fff" : "#3a3a3c"}`,
              borderRadius: "4px",
            },
          })
        )
      ),
      // Decorative format badges — bottom-right
      h("div", {
        style: {
          display: "flex",
          position: "absolute",
          bottom: "50px",
          right: "60px",
          gap: "10px",
          opacity: 0.5,
        },
      },
        ...["GIF", "WebP"].map((label, i) =>
          h("div", {
            key: i,
            style: {
              display: "flex",
              backgroundColor: "rgba(108,111,255,0.15)",
              border: "1px solid rgba(108,111,255,0.35)",
              borderRadius: "6px",
              padding: "6px 16px",
            },
          },
            h("span", { style: { color: "#6c6fff", fontSize: "15px", fontWeight: 700 } }, label)
          )
        )
      ),

      // Accent bar
      h("div", {
        style: {
          display: "flex",
          width: "56px",
          height: "5px",
          backgroundColor: "#6c6fff",
          borderRadius: "3px",
          marginBottom: "40px",
        },
      }),

      // Title
      h("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "88px",
          fontWeight: 800,
          color: "#f2f2f7",
          letterSpacing: "-3px",
          marginBottom: "24px",
          lineHeight: 1,
        },
      }, "VideoToGIF"),

      // Tagline
      h("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
          color: "#8e8e93",
          fontWeight: 400,
        },
      }, "Convert video to GIF or WebP — right in your browser"),

      // Bottom feature badges
      h("div", {
        style: {
          display: "flex",
          marginTop: "52px",
          gap: "12px",
        },
      },
        ...["GIF", "WebP", "Browser-only", "No Upload"].map((label) =>
          h("div", {
            style: {
              display: "flex",
              backgroundColor: "#1c1c1e",
              border: "1px solid #3a3a3c",
              borderRadius: "8px",
              padding: "10px 20px",
            },
          },
            h("span", { style: { color: "#8e8e93", fontSize: "18px" } }, label)
          )
        )
      )
    ),
    { width: 1200, height: 630 }
  );
}
