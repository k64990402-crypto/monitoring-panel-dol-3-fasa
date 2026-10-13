export interface MotorData {
  timestamp: number;
  motorOn: boolean;
  currentR: number;
  currentS: number;
  currentT: number;
  voltageR: number;
  voltageS: number;
  voltageT: number;
  voltageAvg: number;
  powerKw: number;
  powerFactor: number;
  frequency: number;
  energyKwh: number;
  alarm: boolean;
  alarmMessage: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export type DataSourceMode = 'simulation' | 'device';

export interface DeviceInfo {
  name: string;
  status: ConnectionStatus;
  lastSeen: number | null;
  signalStrength: number | null;
}

export interface ChartPoint {
  t: number;
  r: number;
  s: number;
  tt: number;
}
