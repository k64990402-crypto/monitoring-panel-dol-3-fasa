import { Activity, Zap, Power } from 'lucide-react';

interface HeaderProps {
  motorOn: boolean;
  lastUpdate: number | null;
  deviceStatus: string;
}

export function Header({ motorOn, lastUpdate, deviceStatus }: HeaderProps) {
  const statusColor = deviceStatus === 'connected'
    ? 'bg-success-400'
    : deviceStatus === 'connecting'
    ? 'bg-warning-400 animate-pulse'
    : 'bg-panel-500';

  return (
    <header className="sticky top-0 z-50 bg-panel-950/95 backdrop-blur-md border-b border-panel-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-500/15 border border-primary-500/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
              MONITORING PANEL DOL 3 FASA
            </h1>
            <p className="text-[10px] sm:text-xs text-panel-400 leading-tight">
              Sistem Pemantauan Motor Listrik 3 Fasa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-panel-300">
            <Activity className="w-3.5 h-3.5" />
            <span>
              {lastUpdate
                ? `Update: ${new Date(lastUpdate).toLocaleTimeString('id-ID')}`
                : 'Menunggu data...'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-panel-800/60 border border-panel-700">
            <span className={`w-2 h-2 rounded-full ${statusColor}`} />
            <span className="text-[10px] sm:text-xs text-panel-300 font-medium">
              {deviceStatus === 'connected' ? 'Terhubung' : deviceStatus === 'connecting' ? 'Menghubungkan' : 'Terputus'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border" style={{
            borderColor: motorOn ? 'rgba(34,179,102,0.3)' : 'rgba(74,93,114,0.3)',
            background: motorOn ? 'rgba(15,157,79,0.1)' : 'rgba(19,28,40,0.6)',
          }}>
            <Power className={`w-3.5 h-3.5 ${motorOn ? 'text-success-400' : 'text-panel-500'}`} />
            <span className={`text-[10px] sm:text-xs font-bold ${motorOn ? 'text-success-400' : 'text-panel-400'}`}>
              {motorOn ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
