import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import { generateCandles } from "../../data/mockCandles";

type Timeframe = "1H" | "1D" | "1W" | "1M" | "1Y" | "5Y";

export function TradingChart({
  basePrice,
  timeframe,
}: {
  basePrice: number;
  timeframe: Timeframe;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0b0f14" },
        textColor: "#8b95a7",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)" },
        horzLines: { color: "rgba(255,255,255,0.04)" },
      },
      width: containerRef.current.clientWidth,
      height: 390,
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
        timeVisible: timeframe === "1H" || timeframe === "1D",
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { labelBackgroundColor: "#2563eb" },
        horzLine: { labelBackgroundColor: "#2563eb" },
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    series.setData(generateCandles(basePrice, timeframe));
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [basePrice, timeframe]);

  return <div ref={containerRef} className="w-full" />;
}
