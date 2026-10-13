import type { ReactNode } from 'react';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  subValue?: string;
  accent?: 'primary' | 'accent' | 'warning' | 'error';
}

const accentMap = {
  primary: { text: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
  accent: { text: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/20' },
  warning: { text: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/20' },
  error: { text: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/20' },
};

export function MetricCard({ icon, label, value, unit, subValue, accent = 'primary' }: MetricCardProps) {
  const a = accentMap[accent];
  return (
    <div className="bg-panel-900/60 rounded-xl border border-panel-700 p-4 hover:border-panel-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${a.bg} ${a.border} border flex items-center justify-center ${a.text}`}>
          {icon}
        </div>
        <span className="text-[10px] text-panel-400 font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold font-mono ${a.text} metric-value`}>{value}</span>
        <span className="text-xs text-panel-400 font-medium">{unit}</span>
      </div>
      {subValue && <p className="text-[11px] text-panel-400 mt-1">{subValue}</p>}
    </div>
  );
}
