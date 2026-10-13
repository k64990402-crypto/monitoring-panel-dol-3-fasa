import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChartPoint, ConnectionStatus, DataSourceMode, DeviceInfo, MotorData } from './types';
import { generateSimData, resetSimulation } from './simulation';
import { STUB_DEVICE } from './device';

const MAX_HISTORY = 40;
const DEFAULT_INTERVAL_MS = 2000;

function buildEmptyData(): MotorData {
  return {
    timestamp: Date.now(),
    motorOn: false,
    currentR: 0,
    currentS: 0,
    currentT: 0,
    voltageR: 0,
    voltageS: 0,
    voltageT: 0,
    voltageAvg: 0,
    powerKw: 0,
    powerFactor: 0,
    frequency: 0,
    energyKwh: 0,
    alarm: false,
    alarmMessage: 'Sistem normal',
  };
}

export function useMotorData() {
  const [data, setData] = useState<MotorData>(buildEmptyData);
  const [history, setHistory] = useState<ChartPoint[]>([]);
  const [running, setRunning] = useState(true);
  const [intervalMs, setIntervalMs] = useState(DEFAULT_INTERVAL_MS);
  const [mode, setMode] = useState<DataSourceMode>('simulation');
  const [device, setDevice] = useState<DeviceInfo>(STUB_DEVICE);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<ConnectionStatus>('disconnected');

  const runningRef = useRef(running);
  runningRef.current = running;
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    if (!running) return;

    const tick = () => {
      if (modeRef.current === 'simulation') {
        const d = generateSimData(intervalMs);
        setData(d);
        setLastUpdate(Date.now());
        setHistory((prev) => {
          const next = [...prev, { t: d.timestamp, r: d.currentR, s: d.currentS, tt: d.currentT }];
          return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
        });
        setDeviceStatus('disconnected');
      }
    };

    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [running, intervalMs, mode]);

  const toggleRunning = useCallback(() => setRunning((r) => !r), []);

  const handleReset = useCallback(() => {
    resetSimulation();
    setHistory([]);
    setData(buildEmptyData());
    setLastUpdate(null);
  }, []);

  const handleModeChange = useCallback((m: DataSourceMode) => {
    if (m === 'device') {
      setDevice({ ...STUB_DEVICE, status: 'error' });
      setDeviceStatus('error');
    } else {
      setDevice(STUB_DEVICE);
      setDeviceStatus('disconnected');
    }
    setMode(m);
  }, []);

  return {
    data,
    history,
    running,
    intervalMs,
    mode,
    device,
    lastUpdate,
    deviceStatus,
    setIntervalMs,
    toggleRunning,
    handleReset,
    handleModeChange,
  };
}
