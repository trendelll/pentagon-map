import Link from 'next/link';
import { notFound } from 'next/navigation';
import clusterData from '../../../../data/cluster_output.json';
import PercentageBarChart from '../../../components/PercentageBarChart';

export default async function ContractorPage({ params }: { params: Promise<{ contractorId: string }> }) {
  const { contractorId } = await params;
  
  // Find the contractor by looking through all capability areas
  let contractor = null;
  for (const area of clusterData.capability_areas) {
    const found = area.top_contractors.find(v => v.id === contractorId);
    if (found) { contractor = found; break; }
  }

  if (!contractor) notFound();

  const chartItems = contractor.cross_category_breakdown.map((item: any) => ({
    name: item.category,
    sharePercentage: item.market_share_pct,
    shareBillions: item.dollars / 1e9
  }));

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{contractor.name}</h2>
      <p className="text-gray-500 mb-10">UEI: {contractor.id}</p>

      <h3 className="text-gray-400 uppercase text-xs font-bold mb-6">Dominance Across Categories</h3>
      <PercentageBarChart items={chartItems} />
    </main>
  );
}