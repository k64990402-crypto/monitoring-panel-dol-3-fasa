import { Wifi, WifiOff, Cpu } from 'lucide-react';
import type { DeviceInfo, ConnectionStatus } from '../types';

interface ConnectionInfoProps {
  device: DeviceInfo;
  status: ConnectionStatus;
  mode: string;
}

export function ConnectionInfo({ device, status, mode }: ConnectionInfoProps) {
  const connected = status === 'connected';
  const Icon = connected ? Wifi : WifiOff;

  return (
    <div className="bg-panel-900/60 rounded-xl border border-panel-700 p-4">
      <h2 className="text-sm font-bold text-slate-200 mb-3">Info Koneksi</h2>

      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-panel-700">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
          connected ? 'bg-success-500/10 border-success-500/30' : 'bg-panel-800 border-panel-600'
        }`}>
          <Cpu className={`w-4 h-4 ${connected ? 'text-success-400' : 'text-panel-500'}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-300 truncate">{device.name}</p>
          <p className="text-[10px] text-panel-400">Mode: {mode === 'simulation' ? 'Simulasi' : 'Perangkat'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${connected ? 'text-success-400' : 'text-panel-500'}`} />
        <span className={`text-xs font-medium ${connected ? 'text-success-400' : 'text-panel-400'}`}>
          {status === 'connected' ? 'Terhubung' : status === 'connecting' ? 'Menghubungkan...' : status === 'error' ? 'Error — Belum dikonfigurasi' : 'Terputus'}
        </span>
      </div>

      <div className="space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <span className="text-panel-400">Sinyal</span>
          <span className="text-panel-300 font-mono">{device.signalStrength != null ? `${device.signalStrength}%` : '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-panel-400">Terakhir dilihat</span>
          <span className="text-panel-300 font-mono">
            {device.lastSeen ? new Date(device.lastSeen).toLocaleTimeString('id-ID') : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
