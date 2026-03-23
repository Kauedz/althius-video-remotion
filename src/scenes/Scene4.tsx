import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const COLORS = { bg: "#000000", white: "#FFFFFF", cyan: "#00D4FF", gray: "#8A8A8A", green: "#00FF88" };
const FONT = "'Inter', 'Poppins', sans-serif";

const DataRow: React.FC<{ label: string; value: string; tag: string; tagColor: string; delay: number; frame: number }> =
  ({ label, value, tag, tagColor, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
    const x = interpolate(frame, [delay, delay + 20], [-40, 0], { extrapolateRight: "clamp" });
    return (
      <div
        style={{
          opacity,
          transform: `translateX(${x}px)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "18px 24px",
          background: "#0D0D0D",
          border: "1px solid #1A1A1A",
          borderRadius: 10,
          fontFamily: FONT,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: tagColor, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: COLORS.gray, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 18, color: COLORS.white, fontWeight: 600 }}>{value}</div>
        </div>
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            background: `${tagColor}22`,
            border: `1px solid ${tagColor}44`,
            fontSize: 12,
            color: tagColor,
            fontWeight: 600,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          {tag}
        </div>
      </div>
    );
  };

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  // Contador animado de leads
  const leadsCount = Math.floor(interpolate(frame, [60, 140], [0, 2847], { extrapolateRight: "clamp" }));

  const dataRows = [
    { label: "Empresa", value: "TechCorp Brasil Ltda", tag: "Sinal: Nova Vaga Aberta", tagColor: COLORS.cyan, delay: 30 },
    { label: "Segmento", value: "SaaS B2B - Series A", tag: "ICP Match: 94%", tagColor: COLORS.green, delay: 50 },
    { label: "Decisor", value: "Carlos Mendes - VP Sales", tag: "LinkedIn Ativo", tagColor: "#FF9500", delay: 70 },
    { label: "Sinal de Compra", value: "Crescimento 40%+ no tri", tag: "Alta Prioridade", tagColor: COLORS.green, delay: 90 },
    { label: "Fonte", value: "LinkedIn + Receita Federal", tag: "Enriquecido", tagColor: COLORS.cyan, delay: 110 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.bg,
        display: "flex",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Coluna esquerda */}
      <div
        style={{
          width: "42%",
          padding: "80px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: `1px solid #111`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: titleOpacity }}>
          <div style={{ width: 4, height: 28, background: COLORS.cyan, borderRadius: 2 }} />
          <span style={{ fontSize: 14, color: COLORS.cyan, letterSpacing: "0.25em", fontWeight: 600, textTransform: "uppercase" }}>
            DATA ENRICHMENT
          </span>
        </div>

        <h2
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.1,
            margin: "0 0 24px",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          DADOS QUE
          <br />
          <span style={{ color: COLORS.cyan }}>CONVERTEM.</span>
        </h2>

        <p style={{ fontSize: 18, color: COLORS.gray, lineHeight: 1.7, margin: "0 0 48px" }}>
          Coletamos e enriquecemos dados
          <br />
          das contas com <strong style={{ color: COLORS.white }}>maior probabilidade</strong>
          <br />
          de comprar de voce.
        </p>

        {/* Contador */}
        <div
          style={{
            opacity: interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 900, color: COLORS.cyan, lineHeight: 1 }}>
            {leadsCount.toLocaleString("pt-BR")}
          </div>
          <div style={{ fontSize: 15, color: COLORS.gray, letterSpacing: "0.2em", marginTop: 8, textTransform: "uppercase" }}>
            Contas enriquecidas
          </div>
        </div>
      </div>

      {/* Coluna direita - feed de dados */}
      <div
        style={{
          flex: 1,
          padding: "60px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 13, color: COLORS.gray, letterSpacing: "0.2em", marginBottom: 8, textTransform: "uppercase" }}>
          &gt; LEAD ENRICHMENT FEED — LIVE
        </div>
        {dataRows.map((row) => (
          <DataRow key={row.label} {...row} frame={frame} />
        ))}
      </div>

      {/* Linha de scan animada */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${interpolate(frame, [0, 200], [0, 100], { extrapolateRight: "clamp" })}%`,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}44, transparent)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
