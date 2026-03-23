import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

// Paleta Althius
const COLORS = {
  bg: "#000000",
  white: "#FFFFFF",
  cyan: "#00D4FF",
  gray: "#8A8A8A",
  darkGray: "#111111",
};

const FONT = "'Inter', 'Poppins', sans-serif";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade-in geral da cena
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Linha vermelha (noise bar) que pisca no inicio
  const noiseBars = [0.15, 0.38, 0.62, 0.80];

  // Texto principal entra com spring
  const textSlide = spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 80 } });
  const textY = interpolate(textSlide, [0, 1], [60, 0]);

  // Subtexto entra depois
  const subSpring = spring({ frame: frame - 35, fps, config: { damping: 18, stiffness: 80 } });
  const subY = interpolate(subSpring, [0, 1], [40, 0]);
  const subOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });

  // Tag de alerta aparece por ultimo
  const tagOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 120px",
        fontFamily: FONT,
        opacity: fadeIn,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Barras de "noise" decorativas */}
      {noiseBars.map((top, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${top * 100}%`,
            left: 0,
            width: `${interpolate(frame, [i * 8, i * 8 + 30], [0, 100], { extrapolateRight: "clamp" })}%`,
            height: "1px",
            background: i === 1 ? COLORS.cyan : COLORS.darkGray,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Tag "CENARIO ATUAL" */}
      <div
        style={{
          opacity: tagOpacity * 0,
          // escondida - aparece via texto abaixo
        }}
      />

      {/* Tag de problema */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 40,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        <div
          style={{
            width: 4,
            height: 28,
            background: COLORS.cyan,
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontSize: 18,
            color: COLORS.cyan,
            letterSpacing: "0.25em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          CENARIO ATUAL
        </span>
      </div>

      {/* Headline principal */}
      <div
        style={{
          transform: `translateY(${textY}px)`,
          maxWidth: 900,
          marginBottom: 48,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          SEU CRESCIMENTO
          <br />
          <span style={{ color: COLORS.gray }}>AINDA DEPENDE DE</span>
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, #0099BB)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MAIS LIGACOES FRIAS?
          </span>
        </h1>
      </div>

      {/* Subtexto */}
      <p
        style={{
          fontSize: 26,
          color: COLORS.gray,
          maxWidth: 700,
          lineHeight: 1.6,
          margin: 0,
          fontWeight: 400,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        Enquanto o time se esforca, a operacao
        <br />
        continua <strong style={{ color: COLORS.white }}>imprevísivel, cara e difícil de escalar.</strong>
      </p>

      {/* Linha lateral direita decorativa */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "10%",
          width: 2,
          height: `${interpolate(frame, [10, 60], [0, 80], { extrapolateRight: "clamp" })}%`,
          background: `linear-gradient(180deg, ${COLORS.cyan}00, ${COLORS.cyan}, ${COLORS.cyan}00)`,
          opacity: 0.3,
        }}
      />
    </div>
  );
};
