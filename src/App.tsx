import { Zap, Gauge as GaugeIcon, Sun, Activity, Radio, Battery, TrendingUp } from 'lucide-react';
import { useMotorData } from './useMotorData';
import { Header } from './components/Header';
import { SimulationBanner } from './components/SimulationBanner';
import { MotorStatus } from './components/MotorStatus';
import { CurrentGauges } from './components/CurrentGauges';
import { MetricCard } from './components/MetricCard';
import { AlarmIndicator } from './components/AlarmIndicator';
import { CurrentChart } from './components/CurrentChart';
import { Controls } from './components/Controls';
import { ConnectionInfo } from './components/ConnectionInfo';

function App() {
  const motor = useMotorData();
  const { data } = motor;

  const voltageSub = `R: ${data.voltageR.toFixed(0)}V · S: ${data.voltageS.toFixed(0)}V · T: ${data.voltageT.toFixed(0)}V`;
  const powerFactorPct = (data.powerFactor * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-panel-950">
      <Header
        motorOn={data.motorOn}
        lastUpdate={motor.lastUpdate}
        deviceStatus={motor.mode === 'simulation' ? 'disconnected' : motor.deviceStatus}
      />
      <SimulationBanner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-4 sm:space-y-5">
        {/* Row 1: Motor Status + Alarm + Controls + Connection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MotorStatus motorOn={data.motorOn} />
          <AlarmIndicator alarm={data.alarm} message={data.alarmMessage} motorOn={data.motorOn} />
          <Controls
            running={motor.running}
            intervalMs={motor.intervalMs}
            mode={motor.mode}
            onToggle={motor.toggleRunning}
            onReset={motor.handleReset}
            onIntervalChange={motor.setIntervalMs}
            onModeChange={motor.handleModeChange}
          />
          <ConnectionInfo device={motor.device} status={motor.deviceStatus} mode={motor.mode} />
        </div>

        {/* Row 2: Current Gauges */}
        <CurrentGauges data={data} />

        {/* Row 3: Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={<Zap className="w-4 h-4" />}
            label="Tegangan"
            value={data.voltageAvg.toFixed(0)}
            unit="V"
            subValue={voltageSub}
            accent="primary"
          />
          <MetricCard
            icon={<GaugeIcon className="w-4 h-4" />}
            label="Daya"
            value={data.powerKw.toFixed(2)}
            unit="kW"
            subValue="Daya aktif total"
            accent="accent"
          />
          <MetricCard
            icon={<Activity className="w-4 h-4" />}
            label="Faktor Daya"
            value={data.powerFactor.toFixed(2)}
            unit="cos φ"
            subValue={`Efisiensi: ${powerFactorPct}%`}
            accent="primary"
          />
          <MetricCard
            icon={<Radio className="w-4 h-4" />}
            label="Frekuensi"
            value={data.frequency.toFixed(1)}
            unit="Hz"
            subValue="Nominal: 50 Hz"
            accent="accent"
          />
        </div>

        {/* Row 4: Energy + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <MetricCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="Energi"
              value={data.energyKwh.toFixed(2)}
              unit="kWh"
              subValue="Total energi terpakai"
              accent="warning"
            />
            <div className="mt-4">
              <MetricCard
                icon={<Battery className="w-4 h-4" />}
                label="Total Arus"
                value={((data.currentR + data.currentS + data.currentT) / 3).toFixed(1)}
                unit="A"
                subValue="Rata-rata 3 fasa"
                accent="primary"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <CurrentChart history={motor.history} />
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-4 pb-6 text-center">
          <p className="text-[10px] text-panel-500">
            Monitoring Panel DOL 3 Fasa — Mode Simulasi · Integrasi ESP32/Blynk dapat ditambahkan kemudian
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
