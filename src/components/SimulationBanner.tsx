import { AlertTriangle } from 'lucide-react';

export function SimulationBanner() {
  return (
    <div className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-warning-500/10 border-b border-warning-500/20">
      <AlertTriangle className="w-4 h-4 text-warning-400 flex-shrink-0" />
      <p className="text-xs text-warning-200/90">
        <span className="font-bold">MODE SIMULASI</span> — Data yang ditampilkan adalah data contoh, bukan dari perangkat nyata. Integrasi ESP32/Blynk dapat ditambahkan kemudian.
      </p>
    </div>
  );
}
