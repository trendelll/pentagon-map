import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { defenseCategories, aviationContractors } from '../../../lib/data';
import FragilityBadge from '../../../components/FragilityBadge';
import PercentageBarChart from '../../../components/PercentageBarChart';

// 1. Notice the Promise type and async function here
export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  
  // 2. We must await the params before extracting the ID!
  const resolvedParams = await params;
  
  // Find the specific category using the resolved ID
  const category = defenseCategories.find(c => c.id === resolvedParams.categoryId);
  
  if (!category) {
    notFound(); 
  }

  const IconComponent = category.icon;

  return (
    <main className="p-8 min-h-screen max-w-4xl">
      <header className="mb-8">
      </header>

      {/* Breadcrumb Navigation */}
      <nav className="flex justify-between items-center mb-6 text-sm">
        <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium">
          <ArrowLeft size={16} /> back to overview
        </Link>
        <div className="text-gray-500">
          Home / <span className="text-white font-medium">{category.title}</span>
        </div>
      </nav>

      {/* Category Header Card */}
      <div className="bg-card p-6 rounded-xl border border-gray-800/50 flex items-center gap-6 mb-10">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
          <IconComponent className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">{category.title}</h2>
            <FragilityBadge status={category.status} />
          </div>
          <p className="text-gray-500 text-sm">
            ${category.budgetBillions.toFixed(1)}B <span className="mx-2">•</span>
            179,938 contracts <span className="mx-2">•</span> 
            2,318 vendors
          </p>
        </div>
      </div>

      {/* Market Share Section */}
      <section>
        <h3 className="text-sm font-medium text-gray-400 mb-6 font-mono tracking-wide">
          top contractors by market share
        </h3>
        
        <PercentageBarChart items={aviationContractors} />

        {/* Info Callout */}
        <div className="mt-10 border-l-2 border-fragile bg-card p-4 text-sm text-gray-400 rounded-r-lg">
          <span className="font-bold text-gray-300">Why it's fragile:</span> 87% of Aviation contracts are sole-sourced. Lockheed alone controls half the market. Click a contractor for details.
        </div>
      </section>
    </main>
  );
}