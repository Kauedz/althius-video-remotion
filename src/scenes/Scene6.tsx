import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const COLORS = { bg: "#000000", white: "#FFFFFF", cyan: "#00D4FF", gray: "#8A8A8A", metal: "#C0C0C0" };
const FONT = "'Inter', 'Poppins', sans-serif";

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in geral
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Logo scale in
  const logoSpring = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 55 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);

  // Texto principal
  const textOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });
  const textSpring = spring({ frame: frame - 25, fps, config: { damping: 18, stiffness: 70 } });
  const textY = interpolate(textSpring, [0, 1], [40, 0]);

  // CTA button
  const ctaOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateRight: "clamp" });
  const ctaSpring = spring({ frame: frame - 60, fps, config: { damping: 18, stiffness: 70 } });
  const ctaY = interpolate(ctaSpring, [0, 1], [30, 0]);

  // URL
  const urlOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" });

  // Pulse no botao CTA
  const ctaPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.8, 1]
  );

  // Linha expansiva
  const lineWidth = interpolate(frame, [20, 60], [0, 100], { extrapolateRight: "clamp" });

  // Partículas de fundo
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 47.3) % 100,
    y: (i * 31.7) % 100,
    size: 1 + (i % 3),
    speed: 0.3 + (i % 5) * 0.1,
  }));

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
        opacity: fadeIn,
      }}
    >
      {/* Particulas de fundo */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${(p.y + (frame * p.speed * 0.05)) % 100}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: COLORS.cyan,
            opacity: interpolate(
              Math.sin((frame / fps) * Math.PI * p.speed + i),
              [-1, 1],
              [0.02, 0.15]
            ),
          }}
        />
      ))}

      {/* Glow central */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyan}08 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Logo Althius grande */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          transformOrigin: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            background: "linear-gradient(135deg, #E8E8E8, #808080, #C0C0C0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            position: "relative",
          }}
        >
          A
          <span
            style={{
              position: "absolute",
              top: 6,
              right: -12,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.cyan,
              display: "block",
              WebkitTextFillColor: "unset",
              boxShadow: `0 0 12px ${COLORS.cyan}`,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: "0.2em",
            background: "linear-gradient(90deg, #C0C0C0, #E8E8E8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ALTHIUS
        </div>
      </div>

      {/* Linha divisora expandindo */}
      <div
        style={{
          width: `${lineWidth}%`,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
          maxWidth: 500,
          marginBottom: 48,
        }}
      />

      {/* Texto principal */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <p
          style={{
            fontSize: 26,
            color: COLORS.gray,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: 760,
          }}
        >
          Empresas B2B que querem crescer com
          <br />
          <strong style={{ color: COLORS.white }}>previsibilidade, nao com sorte.</strong>
        </p>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            padding: "22px 64px",
            borderRadius: 60,
            background: `linear-gradient(135deg, ${COLORS.cyan}, #0099BB)`,
            fontSize: 20,
            fontWeight: 800,
            color: "#000000",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transform: `scale(${ctaPulse})`,
            boxShadow: `0 0 40px ${COLORS.cyan}44`,
            cursor: "pointer",
          }}
        >
          AGENDAR DEMONSTRACAO
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: COLORS.gray,
              opacity: 0.4,
            }}
          />
          <p
            style={{
              fontSize: 22,
              color: COLORS.white,
              letterSpacing: "0.15em",
              margin: 0,
              fontWeight: 500,
            }}
          >
            althius.com.br
          </p>
        </div>
      </div>

      {/* Cantos decorativos */}
      {[
        { top: 40, left: 40, rotate: 0 },
        { top: 40, right: 40, rotate: 90 },
        { bottom: 40, left: 40, rotate: 270 },
        { bottom: 40, right: 40, rotate: 180 },
      ].map((corner, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...corner,
            width: 30,
            height: 30,
            borderTop: `2px solid ${COLORS.cyan}`,
            borderLeft: `2px solid ${COLORS.cyan}`,
            transform: `rotate(${corner.rotate}deg)`,
            opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 0.4], { extrapolateRight: "clamp" }),
          }}
        />
      ))}
    </div>
  );
};
