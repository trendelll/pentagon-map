import Link from 'next/link';
import { 
  Plane, 
  Ship, 
  Satellite, 
  Truck, 
  Zap, 
  Atom, 
  Rocket, 
  Shield, 
  Settings, 
  Flag 
} from 'lucide-react';
import clusterData from '../../data/cluster_output.json';
import FragilityBadge, { FragilityStatus } from '../components/FragilityBadge';

// Map the icons based on the IDs in your JSON
const iconMap: Record<string, any> = {
  aviation: Plane,
  maritime: Ship,
  c4i: Satellite,
  ground: Truck,           // Replacing 'Tank'
  missiles_munitions: Zap, // Replacing 'Missile'
  nuclear: Atom,
  space: Rocket,
  missile_defense: Shield,
  mission_support: Settings, // Replacing 'Gear'
  other_general_dod: Flag
};

export default function Home() {
  const { capability_areas, total_obligations, total_contracts } = clusterData;
  const totalB = (total_obligations / 1e9).toFixed(1);

  return (
    <main className="p-8 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Pentagon Fragility Map</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Analyzing ${totalB}B in FY2025 DoD spending across {total_contracts.toLocaleString()} contracts.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {capability_areas.map((area) => {
          const Icon = iconMap[area.id] || Flag;
          const areaB = (area.total_obligations / 1e9).toFixed(1);
          
          return (
            <Link href={`/category/${area.id}`} key={area.id} 
              className="group bg-card p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <Icon className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={32} />
                <FragilityBadge status={area.cluster_label as FragilityStatus} />              </div>
              <h3 className="text-xl font-bold mb-1">{area.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{area.description}</p>
              <div className="text-2xl font-mono font-bold">${areaB}B</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}