import { Power } from 'lucide-react';

interface MotorStatusProps {
  motorOn: boolean;
}

export function MotorStatus({ motorOn }: MotorStatusProps) {
  return (
    <div className="bg-panel-900/60 rounded-xl border border-panel-700 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-200">Status Motor</h2>
        <span className="text-[10px] text-panel-400 font-mono">DOL Starter</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
              motorOn
                ? 'bg-success-500/20 border-success-400/50 shadow-[0_0_20px_rgba(34,179,102,0.3)]'
                : 'bg-panel-800 border-panel-600'
            }`}
          >
            <Power className={`w-7 h-7 ${motorOn ? 'text-success-400' : 'text-panel-500'}`} />
          </div>
          {motorOn && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success-400 animate-blink border-2 border-panel-900" />
          )}
        </div>
        <div>
          <p className={`text-2xl font-bold ${motorOn ? 'text-success-400' : 'text-panel-400'}`}>
            {motorOn ? 'ON' : 'OFF'}
          </p>
          <p className="text-xs text-panel-400">
            {motorOn ? 'Motor beroperasi' : 'Motor mati'}
          </p>
        </div>
      </div>
    </div>
  );
}
