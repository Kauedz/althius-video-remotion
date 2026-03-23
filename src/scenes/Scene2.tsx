import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const COLORS = {
  bg: "#000000",
  white: "#FFFFFF",
  cyan: "#00D4FF",
  gray: "#8A8A8A",
  metal: "#C0C0C0",
};
const FONT = "'Inter', 'Poppins', sans-serif";

// Logo Althius renderizado como SVG inline
const AlthiusLogo: React.FC<{ opacity: number; scale: number }> = ({ opacity, scale }) => (
  <div
    style={{
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
    }}
  >
    {/* Simbolo A com ponto */}
    <div
      style={{
        fontSize: 140,
        fontWeight: 900,
        color: COLORS.metal,
        fontFamily: FONT,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        background: "linear-gradient(135deg, #C0C0C0, #808080, #E8E8E8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        position: "relative",
      }}
    >
      A
      <span
        style={{
          position: "absolute",
          top: 8,
          right: -18,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: COLORS.cyan,
          WebkitTextFillColor: "unset",
          display: "block",
        }}
      />
    </div>
    {/* Wordmark */}
    <div
      style={{
        fontSize: 52,
        fontWeight: 700,
        color: COLORS.metal,
        letterSpacing: "0.15em",
        fontFamily: FONT,
        textTransform: "uppercase",
        background: "linear-gradient(90deg, #C0C0C0, #E8E8E8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      ALTHIUS
    </div>
  </div>
);

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo fade + scale
  const logoSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 60 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Linha divisora
  const lineWidth = interpolate(frame, [25, 55], [0, 100], { extrapolateRight: "clamp" });

  // Subtexto
  const subOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });
  const subSpring = spring({ frame: frame - 50, fps, config: { damping: 18, stiffness: 70 } });
  const subY = interpolate(subSpring, [0, 1], [30, 0]);

  // Glow pulsante no logo
  const glow = interpolate(
    Math.sin((frame / fps) * Math.PI * 1.5),
    [-1, 1],
    [0.3, 0.8]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow circular atras do logo */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyan}${Math.round(glow * 30).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Logo Althius */}
      <AlthiusLogo opacity={logoOpacity} scale={logoScale} />

      {/* Linha divisora */}
      <div
        style={{
          width: `${lineWidth}%`,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
          marginTop: 40,
          maxWidth: 600,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          marginTop: 32,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 22,
            color: COLORS.cyan,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 600,
            margin: 0,
          }}
        >
          GTM ENGINEERING B2B
        </p>
        <p
          style={{
            fontSize: 18,
            color: COLORS.gray,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 400,
            margin: "12px 0 0",
          }}
        >
          PROSPECÇÃO INTELIGENTE COM IA
        </p>
      </div>

      {/* Particulas de canto */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: COLORS.cyan,
            left: `${[10, 90, 15, 85][i]}%`,
            top: `${[20, 25, 75, 70][i]}%`,
            opacity: interpolate(
              Math.sin((frame / fps) * Math.PI * 2 + i),
              [-1, 1],
              [0.1, 0.6]
            ),
          }}
        />
      ))}
    </div>
  );
};
