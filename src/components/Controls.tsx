import { Play, Pause, RotateCcw } from 'lucide-react';
import type { DataSourceMode } from '../types';

interface ControlsProps {
  running: boolean;
  intervalMs: number;
  mode: DataSourceMode;
  onToggle: () => void;
  onReset: () => void;
  onIntervalChange: (ms: number) => void;
  onModeChange: (m: DataSourceMode) => void;
}

export function Controls({
  running, intervalMs, mode, onToggle, onReset, onIntervalChange, onModeChange,
}: ControlsProps) {
  return (
    <div className="bg-panel-900/60 rounded-xl border border-panel-700 p-4">
      <h2 className="text-sm font-bold text-slate-200 mb-3">Kontrol Simulasi</h2>

      <div className="flex gap-2 mb-3">
        <button
          onClick={onToggle}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            background: running ? 'rgba(239,68,68,0.1)' : 'rgba(34,179,102,0.1)',
            border: `1px solid ${running ? 'rgba(239,68,68,0.3)' : 'rgba(34,179,102,0.3)'}`,
            color: running ? '#f87171' : '#4fc786',
          }}
        >
          {running ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-panel-800 border border-panel-600 text-panel-300 hover:bg-panel-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      <div className="mb-3">
        <label className="text-[10px] text-panel-400 font-medium uppercase tracking-wider mb-1.5 block">
          Interval Pembaruan
        </label>
        <select
          value={intervalMs}
          onChange={(e) => onIntervalChange(Number(e.target.value))}
          className="w-full bg-panel-800 border border-panel-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary-500/50"
        >
          <option value={1000}>1 detik</option>
          <option value={2000}>2 detik</option>
          <option value={3000}>3 detik</option>
          <option value={5000}>5 detik</option>
        </select>
      </div>

      <div>
        <label className="text-[10px] text-panel-400 font-medium uppercase tracking-wider mb-1.5 block">
          Sumber Data
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onModeChange('simulation')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              mode === 'simulation'
                ? 'bg-primary-500/20 border border-primary-500/40 text-primary-300'
                : 'bg-panel-800 border border-panel-600 text-panel-400 hover:text-panel-300'
            }`}
          >
            Simulasi
          </button>
          <button
            onClick={() => onModeChange('device')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              mode === 'device'
                ? 'bg-accent-500/20 border border-accent-500/40 text-accent-300'
                : 'bg-panel-800 border border-panel-600 text-panel-400 hover:text-panel-300'
            }`}
          >
            Perangkat
          </button>
        </div>
      </div>
    </div>
  );
}
