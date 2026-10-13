import type { DeviceInfo, MotorData } from './types';

/**
 * STUB — Integrasi perangkat nyata (ESP32 / Blynk / MQTT).
 *
 * File ini disiapkan sebagai placeholder agar integrasi perangkat keras
 * dapat ditambahkan kemudian tanpa mengubah komponen UI.
 *
 * Untuk mengaktifkan:
 * 1. Implementasikan fetchDeviceData() untuk membaca dari ESP32/Blynk/MQTT.
 * 2. Ubah DataSourceMode menjadi 'device' di useMotorData.
 * 3. Sesuaikan pemetaan field dengan format data perangkat Anda.
 */

export const STUB_DEVICE: DeviceInfo = {
  name: 'ESP32 — Panel DOL 3 Fasa',
  status: 'disconnected',
  lastSeen: null,
  signalStrength: null,
};

export async function fetchDeviceData(): Promise<MotorData> {
  throw new Error(
    'Integrasi perangkat belum dikonfigurasi. Implementasikan fetchDeviceData() di src/device.ts untuk menghubungkan ESP32 / Blynk / MQTT.'
  );
}

export async function connectDevice(): Promise<DeviceInfo> {
  return { ...STUB_DEVICE, status: 'error' };
}
