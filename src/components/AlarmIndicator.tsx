import { AlertOctagon, ShieldCheck } from 'lucide-react';

interface AlarmIndicatorProps {
  alarm: boolean;
  message: string;
  motorOn: boolean;
}

export function AlarmIndicator({ alarm, message, motorOn }: AlarmIndicatorProps) {
  if (alarm) {
    return (
      <div className="bg-error-500/10 border border-error-500/30 rounded-xl p-4 scan-line relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-error-500/20 border border-error-500/40 flex items-center justify-center flex-shrink-0">
            <AlertOctagon className="w-5 h-5 text-error-400 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-bold text-error-400">FAULT — Alarm Aktif</p>
            <p className="text-xs text-error-200/80 mt-0.5">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-success-500/10 border border-success-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-success-500/15 border border-success-500/30 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-success-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-success-400">NORMAL</p>
          <p className="text-xs text-panel-300 mt-0.5">
            {motorOn ? message : 'Motor dalam kondisi mati (OFF)'}
          </p>
        </div>
      </div>
    </div>
  );
}
