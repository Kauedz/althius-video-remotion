import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const COLORS = { bg: "#000000", white: "#FFFFFF", cyan: "#00D4FF", gray: "#8A8A8A", green: "#00FF88", purple: "#8B5CF6" };
const FONT = "'Inter', 'Poppins', sans-serif";

const AgentCard: React.FC<{ name: string; status: string; action: string; count: number; color: string; delay: number; frame: number }> =
  ({ name, status, action, count, color, delay, frame }) => {
    const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
    const y = interpolate(frame, [delay, delay + 25], [30, 0], { extrapolateRight: "clamp" });
    const pulse = interpolate(Math.sin((frame / 30) * Math.PI * 2 + delay * 0.1), [-1, 1], [0.6, 1]);

    return (
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          background: "#0A0A0A",
          border: `1px solid ${color}44`,
          borderRadius: 12,
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Status dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            opacity: pulse,
            flexShrink: 0,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 4 }}>{name}</div>
          <div style={{ fontSize: 12, color: COLORS.gray }}>{action}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color }}>{count.toLocaleString("pt-BR")}</div>
          <div style={{ fontSize: 11, color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.1em" }}>{status}</div>
        </div>
        {/* Bottom glow */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${color}44, transparent)` }} />
      </div>
    );
  };

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 70 } });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);

  // Contador de pipeline
  const pipelineValue = Math.floor(interpolate(frame, [80, 200], [0, 847000], { extrapolateRight: "clamp" }));

  const agents = [
    { name: "Agent 01 - Prospector", status: "enviados", action: "Identificando contas ICP no LinkedIn", count: 1240, color: COLORS.cyan, delay: 30 },
    { name: "Agent 02 - Qualifier", status: "qualificados", action: "Validando sinais de compra e fit", count: 318, color: COLORS.green, delay: 55 },
    { name: "Agent 03 - Outreacher", status: "em sequencia", action: "Enviando abordagem personalizada", count: 96, color: COLORS.purple, delay: 80 },
    { name: "Agent 04 - Scheduler", status: "reunioes", action: "Agendando demos com decisores", count: 24, color: "#FF9500", delay: 105 },
  ];

  // Relogio - 24h
  const clockAngle = (frame / fps) * 6; // 6 graus por segundo

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
      {/* Bg glow roxo */}
      <div
        style={{
          position: "absolute",
          right: -100,
          top: "50%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purple}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Coluna esquerda */}
      <div
        style={{
          width: "44%",
          padding: "80px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRight: "1px solid #111",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, opacity: titleOpacity }}>
          <div style={{ width: 4, height: 28, background: COLORS.purple, borderRadius: 2 }} />
          <span style={{ fontSize: 14, color: COLORS.purple, letterSpacing: "0.25em", fontWeight: 600, textTransform: "uppercase" }}>
            AGENT-LED GROWTH
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
          PIPELINE QUE
          <br />
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NUNCA DORME.
          </span>
        </h2>

        <p style={{ fontSize: 18, color: COLORS.gray, lineHeight: 1.7, margin: "0 0 48px" }}>
          Agentes de IA identificam,
          <br />
          abordam e qualificam contas
          <br />
          <strong style={{ color: COLORS.white }}>24 horas por dia, 7 dias por semana.</strong>
        </p>

        {/* Pipeline value */}
        <div style={{ opacity: interpolate(frame, [75, 95], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1,
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.green})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            R$ {(pipelineValue / 1000).toFixed(0)}K
          </div>
          <div style={{ fontSize: 14, color: COLORS.gray, letterSpacing: "0.2em", marginTop: 8, textTransform: "uppercase" }}>
            Pipeline gerado este mes
          </div>
        </div>
      </div>

      {/* Coluna direita - agents */}
      <div
        style={{
          flex: 1,
          padding: "60px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 13, color: COLORS.gray, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            &gt; AGENTS OPERANDO — AO VIVO
          </span>
          <span
            style={{
              fontSize: 12,
              color: COLORS.green,
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.green,
                display: "inline-block",
                opacity: interpolate(Math.sin((frame / fps) * Math.PI * 3), [-1, 1], [0.4, 1]),
              }}
            />
            24/7 ONLINE
          </span>
        </div>
        {agents.map((a) => (
          <AgentCard key={a.name} {...a} frame={frame} />
        ))}
      </div>
    </div>
  );
};
