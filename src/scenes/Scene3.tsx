import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const COLORS = { bg: "#000000", white: "#FFFFFF", cyan: "#00D4FF", gray: "#8A8A8A", dark: "#0A0A0F" };
const FONT = "'Inter', 'Poppins', sans-serif";

const PersonaCard: React.FC<{
  title: string;
  subtitle: string;
  icon: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ title, subtitle, icon, delay, frame, fps }) => {
  const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 70 } });
  const cardY = interpolate(cardSpring, [0, 1], [80, 0]);
  const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        background: "linear-gradient(135deg, #0D0D0D, #1A1A1A)",
        border: `1px solid ${COLORS.cyan}33`,
        borderRadius: 16,
        padding: "36px 32px",
        width: 280,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 2,
          background: COLORS.cyan,
          borderRadius: 1,
        }}
      />
      <div style={{ fontSize: 48 }}>{icon}</div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.white,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textAlign: "center",
          fontFamily: FONT,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 14,
          color: COLORS.gray,
          textAlign: "center",
          lineHeight: 1.5,
          fontFamily: FONT,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  const subOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  // Linha de orbita
  const orbitWidth = interpolate(frame, [30, 70], [0, 100], { extrapolateRight: "clamp" });

  const personas = [
    { title: "Decisor", subtitle: "CEO, Diretor, VP de Vendas", icon: "👔", delay: 40 },
    { title: "Influenciador", subtitle: "Head de Marketing, RevOps", icon: "📊", delay: 60 },
    { title: "Campeao", subtitle: "SDR Lead, Gerente Comercial", icon: "🏆", delay: 80 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 20% 50%, #001824 0%, ${COLORS.bg} 60%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 100px",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid de fundo sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.cyan}08 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cyan}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Coluna esquerda - texto */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 480,
        }}
      >
        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
            opacity: titleOpacity,
          }}
        >
          <div style={{ width: 4, height: 28, background: COLORS.cyan, borderRadius: 2 }} />
          <span style={{ fontSize: 15, color: COLORS.cyan, letterSpacing: "0.25em", fontWeight: 600, textTransform: "uppercase" }}>
            MAPEAMENTO ICP
          </span>
        </div>

        <h2
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.1,
            margin: "0 0 28px",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          NOS MAPEAMOS
          <br />
          <span style={{ color: COLORS.cyan }}>SEU MERCADO</span>
          <br />
          B2B.
        </h2>

        <p
          style={{
            fontSize: 20,
            color: COLORS.gray,
            lineHeight: 1.6,
            margin: 0,
            opacity: subOpacity,
          }}
        >
          Contas ideais, sinais de compra
          <br />
          e as <strong style={{ color: COLORS.white }}>3 personas-chave</strong> dentro
          <br />
          de cada conta.
        </p>

        {/* Linha de orbita */}
        <div
          style={{
            marginTop: 40,
            width: `${orbitWidth}%`,
            height: 1,
            background: `linear-gradient(90deg, ${COLORS.cyan}, transparent)`,
            maxWidth: 300,
          }}
        />
      </div>

      {/* Cards das personas - direita */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        {personas.map((p) => (
          <PersonaCard key={p.title} {...p} frame={frame} fps={fps} />
        ))}
      </div>
    </div>
  );
};
