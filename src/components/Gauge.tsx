interface GaugeProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export function Gauge({ label, value, max, unit, color }: GaugeProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const dashOffset = circumference * (1 - pct * 0.75);
  const arcLength = circumference * 0.75;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[140px] h-[140px]">
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="#1d2a3a" strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            strokeDashoffset={dashOffset}
            className="gauge-progress"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono text-slate-100">
            {value.toFixed(1)}
          </span>
          <span className="text-[10px] text-panel-400 font-medium">{unit}</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-panel-300 mt-1">{label}</span>
    </div>
  );
}
