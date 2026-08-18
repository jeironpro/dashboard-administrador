import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ActivityChartProps {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
}

const WIDTH = 720;
const PAD = { top: 16, right: 8, bottom: 30, left: 40 };

// Gráfico de barras de actividad reciente. Las barras crecen con animejs;
// la barra de "hoy" es el único acento (señal, no inundación).
export function ActivityChart({ data, height = 220, className }: ActivityChartProps) {
  const barsRef = useRef<SVGGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll<SVGRectElement>("rect.bar");
    if (!bars || bars.length === 0) return;

    if (reduced) return;

    const animation = animate(Array.from(bars), {
      scaleY: [0, 1],
      duration: 620,
      ease: "outExpo",
      delay: stagger(18),
    });
    return () => {
      animation.pause();
    };
  }, [reduced]);

  const max = Math.max(...data.map((point) => point.value));
  const plotW = WIDTH - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const step = plotW / data.length;
  const barW = Math.max(step * 0.6, 3);

  const gridValues = [0.25, 0.5, 0.75, 1].map((fraction) =>
    Math.round((max * fraction) / 100) * 100,
  );

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Actividad de pedidos de los últimos 30 días"
    >
      {/* Rejilla horizontal (hairlines) */}
      {gridValues.map((value) => {
        const y = PAD.top + plotH - (value / max) * plotH;
        return (
          <g key={value}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={y}
              y2={y}
              className="stroke-border"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 8}
              y={y + 3}
              textAnchor="end"
              className="mono-label fill-muted-foreground"
              fontSize="10"
            >
              {formatNumber(value)}
            </text>
          </g>
        );
      })}

      {/* Barras */}
      <g ref={barsRef}>
        {data.map((point, index) => {
          const barH = (point.value / max) * plotH;
          const x = PAD.left + index * step + (step - barW) / 2;
          const y = PAD.top + plotH - barH;
          const isToday = index === data.length - 1;
          return (
            <rect
              key={point.label}
              className="bar"
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="2"
              style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
              fill={isToday ? "var(--color-accent)" : "var(--color-rule-2)"}
            >
              <title>{`${point.label}: ${formatNumber(point.value)} pedidos`}</title>
            </rect>
          );
        })}
      </g>

      {/* Etiquetas del eje x (cada ~5 días) */}
      {data.map((point, index) => {
        if (index % 5 !== 0 && index !== data.length - 1) return null;
        const x = PAD.left + index * step + step / 2;
        return (
          <text
            key={point.label}
            x={x}
            y={height - 8}
            textAnchor="middle"
            className="mono-label fill-muted-foreground"
            fontSize="10"
          >
            {point.label.slice(5).replace("-", "/")}
          </text>
        );
      })}
    </svg>
  );
}
