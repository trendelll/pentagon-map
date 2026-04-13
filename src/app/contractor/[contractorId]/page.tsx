import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { contractorDetails } from '../../../lib/data';
import PercentageBarChart from '../../../components/PercentageBarChart';

export default async function ContractorPage({ params }: { params: Promise<{ contractorId: string }> }) {
  const resolvedParams = await params;
  
  // Look up the contractor in our data object
  const contractor = contractorDetails[resolvedParams.contractorId];
  
  if (!contractor) {
    notFound(); 
  }

  return (
    <main className="p-8 min-h-screen max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{contractor.name}</h1>
      </header>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/category/aviation" className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
          <ArrowLeft size={16} /> back to Aviation
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-500">Home / Aviation / </span>
        <span className="text-white font-medium">{contractor.name}</span>
      </nav>

      {/* Contractor Header Card */}
      <div className="bg-card p-6 rounded-xl border border-gray-800/50 flex flex-col md:flex-row gap-6 mb-10">
        {/* Placeholder Logo Box */}
        <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700/50 flex items-center justify-center min-w-[120px]">
          <span className="text-xs font-bold text-gray-400 tracking-widest text-center leading-tight">
            LOCKHEED<br/>MARTIN
          </span>
        </div>
        
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-1">{contractor.name}</h2>
            <p className="text-gray-400 text-sm mb-6">
              {contractor.location} <span className="mx-2">•</span> 
              publicly traded ({contractor.ticker}) <span className="mx-2">•</span> 
              ~{contractor.employees} employees
            </p>
          </div>
          
          <div className="flex gap-8 text-sm">
            <div>
              <p className="text-gray-500 uppercase tracking-wider text-[10px] font-bold mb-1">Total FY2026 DoD</p>
              <p className="text-xl font-bold text-white">${contractor.totalFy2026}B</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase tracking-wider text-[10px] font-bold mb-1">Contract Actions</p>
              <p className="text-xl font-bold text-white">{contractor.contractActions}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase tracking-wider text-[10px] font-bold mb-1">Fragility Impact</p>
              <p className="text-xl font-bold text-fragile">{contractor.fragilityImpact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Share Section */}
      <section>
        <h3 className="text-sm font-medium text-gray-400 mb-6 font-mono tracking-wide">
          market share across defense categories
        </h3>
        
        {/* We reuse the exact same chart component! */}
        <PercentageBarChart items={contractor.marketShare} />
      </section>
    </main>
  );
}