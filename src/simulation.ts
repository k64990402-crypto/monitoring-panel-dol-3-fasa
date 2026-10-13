import type { MotorData } from './types';

const SIM_CONFIG = {
  baseCurrent: 62,
  currentVariation: 5,
  baseVoltage: 380,
  voltageVariation: 3,
  baseFrequency: 50,
  frequencyVariation: 0.15,
  basePowerFactor: 0.86,
  powerFactorVariation: 0.03,
  currentImbalance: 2,
  alarmChance: 0.003,
};

let energyAccumulator = 0;
let tickCount = 0;
let prevMotorOn = true;
let alarmCooldown = 0;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function jitter(base: number, variation: number): number {
  return base + (Math.random() - 0.5) * 2 * variation;
}

export function generateSimData(intervalMs: number): MotorData {
  tickCount++;
  const dtHours = intervalMs / 3_600_000;

  const motorOn = tickCount % 200 !== 0; // occasional off-cycle
  if (!motorOn && prevMotorOn) alarmCooldown = 0;
  prevMotorOn = motorOn;

  const currentR = motorOn ? clamp(jitter(SIM_CONFIG.baseCurrent, SIM_CONFIG.currentVariation), 0, 100) : 0;
  const currentS = motorOn ? clamp(jitter(SIM_CONFIG.baseCurrent + SIM_CONFIG.currentImbalance, SIM_CONFIG.currentVariation), 0, 100) : 0;
  const currentT = motorOn ? clamp(jitter(SIM_CONFIG.baseCurrent - SIM_CONFIG.currentImbalance, SIM_CONFIG.currentVariation), 0, 100) : 0;

  const voltageR = motorOn ? clamp(jitter(SIM_CONFIG.baseVoltage, SIM_CONFIG.voltageVariation), 0, 500) : 0;
  const voltageS = motorOn ? clamp(jitter(SIM_CONFIG.baseVoltage - 1, SIM_CONFIG.voltageVariation), 0, 500) : 0;
  const voltageT = motorOn ? clamp(jitter(SIM_CONFIG.baseVoltage + 1, SIM_CONFIG.voltageVariation), 0, 500) : 0;
  const voltageAvg = motorOn ? (voltageR + voltageS + voltageT) / 3 : 0;

  const frequency = motorOn ? clamp(jitter(SIM_CONFIG.baseFrequency, SIM_CONFIG.frequencyVariation), 49, 51) : 0;
  const powerFactor = motorOn ? clamp(jitter(SIM_CONFIG.basePowerFactor, SIM_CONFIG.powerFactorVariation), 0, 1) : 0;

  const totalCurrent = (currentR + currentS + currentT) / 3;
  const powerKw = motorOn ? (Math.sqrt(3) * voltageAvg * totalCurrent * powerFactor) / 1000 : 0;

  if (motorOn) energyAccumulator += powerKw * dtHours;

  let alarm = false;
  let alarmMessage = 'Sistem normal';
  if (alarmCooldown > 0) {
    alarmCooldown--;
  } else if (motorOn && Math.random() < SIM_CONFIG.alarmChance) {
    alarm = true;
    alarmCooldown = 3;
    const faults = [
      'Arus fasa R melebihi batas',
      'Ketidakseimbangan arus tinggi',
      'Tegangan turun di bawah nominal',
      'Faktor daya rendah',
    ];
    alarmMessage = faults[Math.floor(Math.random() * faults.length)];
  }

  return {
    timestamp: Date.now(),
    motorOn,
    currentR,
    currentS,
    currentT,
    voltageR,
    voltageS,
    voltageT,
    voltageAvg,
    powerKw,
    powerFactor,
    frequency,
    energyKwh: energyAccumulator,
    alarm,
    alarmMessage,
  };
}

export function resetSimulation(): void {
  energyAccumulator = 0;
  tickCount = 0;
  alarmCooldown = 0;
  prevMotorOn = true;
}
