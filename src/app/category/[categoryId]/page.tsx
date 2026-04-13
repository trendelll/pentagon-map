import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
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

// Import the data and the badge type
import clusterData from '../../../../data/cluster_output.json';
import FragilityBadge, { FragilityStatus } from '../../../components/FragilityBadge';
import PercentageBarChart from '../../../components/PercentageBarChart';

// Icon mapping to match your JSON data IDs
const iconMap: Record<string, any> = {
  aviation: Plane,
  maritime: Ship,
  c4i: Satellite,
  ground: Truck,
  missiles_munitions: Zap,
  nuclear: Atom,
  space: Rocket,
  missile_defense: Shield,
  mission_support: Settings,
  other_general_dod: Flag
};

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  
  // Find the specific category from your data mining results
  const category = clusterData.capability_areas.find(c => c.id === categoryId);
  
  if (!category) {
    notFound();
  }

  const Icon = iconMap[category.id] || Flag;

  // Format the top contractors for the visualization component
  const chartItems = category.top_contractors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    sharePercentage: vendor.market_share_pct,
    shareBillions: vendor.dollars / 1e9
  }));

  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen">
      {/* Navigation Header */}
      <nav className="mb-12">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Overview</span>
        </Link>
      </nav>

      {/* Category Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800">
            <Icon size={40} className="text-cyan-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
            <p className="text-gray-400 mt-1">{category.description}</p>
          </div>
        </div>
        
        {/* Type assertion fix for the FragilityBadge */}
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Cluster Profile</span>
          <FragilityBadge status={category.cluster_label as FragilityStatus} />
        </div>
      </div>

      {/* Market Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Obligations</p>
          <div className="text-3xl font-mono font-bold">
            ${(category.total_obligations / 1e9).toFixed(2)}B
          </div>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-500 text-sm font-medium mb-1">Contract Count</p>
          <div className="text-3xl font-mono font-bold">
            {category.contract_count.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <p className="text-gray-500 text-sm font-medium mb-1">Unique Vendors</p>
          <div className="text-3xl font-mono font-bold">
            {category.unique_vendors.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Analysis and Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            Top Contractor Dominance
          </h3>
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <PercentageBarChart items={chartItems} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-lg font-bold mb-6">Fragility Risk Analysis</h3>
          <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-red-400 font-bold mb-4">
              <Shield size={20} />
              <h4>Supply Chain Insight</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {category.why_fragile}
            </p>
            <div className="mt-6 pt-6 border-t border-red-500/20">
              <p className="text-xs text-gray-500 italic">
                Analysis based on K-means clustering (k=5) with a silhouette score of {clusterData.silhouette_score.toFixed(4)}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}