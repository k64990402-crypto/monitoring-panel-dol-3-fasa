import type { MotorData } from '../types';
import { Gauge } from './Gauge';

export function CurrentGauges({ data }: { data: MotorData }) {
  return (
    <div className="bg-panel-900/60 rounded-xl border border-panel-700 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-200">Arus Fasa (A)</h2>
        <span className="text-[10px] text-panel-400 font-mono">0 — 100 A</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Gauge label="Fasa R" value={data.currentR} max={100} unit="Ampere" color="#22b366" />
        <Gauge label="Fasa S" value={data.currentS} max={100} unit="Ampere" color="#0ea5e9" />
        <Gauge label="Fasa T" value={data.currentT} max={100} unit="Ampere" color="#f59e0b" />
      </div>
    </div>
  );
}
