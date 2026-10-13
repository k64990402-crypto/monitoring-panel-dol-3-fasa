import { useMemo } from 'react';
import type { ChartPoint } from '../types';

interface CurrentChartProps {
  history: ChartPoint[];
}

export function CurrentChart({ history }: CurrentChartProps) {
  const W = 800;
  const H = 240;
  const PAD = { top: 20, right: 16, bottom: 32, left: 40 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const Y_MAX = 100;

  const { pathR, pathS, pathT, ticks, gridLines, labels } = useMemo(() => {
    if (history.length < 2) {
      return { pathR: '', pathS: '', pathT: '', ticks: [], gridLines: [], labels: [] };
    }

    const n = history.length;
    const xFor = (i: number) => PAD.left + (i / (n - 1)) * plotW;
    const yFor = (v: number) => PAD.top + plotH - (v / Y_MAX) * plotH;

    const toPath = (key: 'r' | 's' | 'tt') =>
      history.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(p[key]).toFixed(1)}`).join(' ');

    const ticks = [0, 25, 50, 75, 100];
    const gridLines = ticks.map((t) => yFor(t));
    const labels = history.length > 0
      ? [history[0], history[Math.floor(n / 2)], history[n - 1]].map((p) => ({
          x: xFor(history.indexOf(p)),
          label: new Date(p.t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        }))
      : [];

    return { pathR: toPath('r'), pathS: toPath('s'), pathT: toPath('tt'), ticks, gridLines, labels };
  }, [history, plotW, plotH]);

  return (
    <div className="bg-panel-900/60 rounded-xl border border-panel-700 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-200">Grafik Arus Fasa R / S / T</h2>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-400" /><span className="text-panel-300">R</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent-400" /><span className="text-panel-300">S</span></span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-warning-400" /><span className="text-panel-300">T</span></span>
        </div>
      </div>

      {history.length < 2 ? (
        <div className="h-[240px] flex items-center justify-center text-panel-400 text-sm">
          Mengumpulkan data...
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 480 }}>
            {gridLines.map((y, i) => (
              <line key={i} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
                stroke="#1d2a3a" strokeWidth="1" strokeDasharray="3 3" />
            ))}
            {ticks.map((t, i) => (
              <text key={i} x={PAD.left - 8} y={gridLines[i] + 4} textAnchor="end"
                fill="#4a5d72" fontSize="10" fontFamily="JetBrains Mono, monospace">{t}</text>
            ))}
            <text x={PAD.left - 30} y={PAD.top + plotH / 2} textAnchor="middle"
              fill="#4a5d72" fontSize="10" transform={`rotate(-90 ${PAD.left - 30} ${PAD.top + plotH / 2})`}>Arus (A)</text>

            <path d={pathR} fill="none" stroke="#22b366" strokeWidth="2" strokeLinejoin="round" />
            <path d={pathS} fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
            <path d={pathT} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />

            {labels.map((l, i) => (
              <text key={i} x={l.x} y={H - 10} textAnchor={i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'}
                fill="#4a5d72" fontSize="9" fontFamily="JetBrains Mono, monospace">{l.label}</text>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}
