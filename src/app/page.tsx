import Link from 'next/link';
import { defenseCategories } from '../lib/data';
import FragilityBadge from '../components/FragilityBadge';

export default function Home() {
  return (
    <main className="p-8 min-h-screen">
      {/* Top Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Overview</h1>
      </header>

      {/* Summary Box */}
      <div className="bg-card p-6 rounded-xl border border-gray-800/50 mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Pentagon fragility map</h2>
          <p className="text-gray-500 text-sm">FY2026 / DoD contract spending analysis</p>
        </div>
        <div className="md:text-right">
          <p className="text-3xl font-extrabold tracking-tight">$491.6B</p>
          <p className="text-gray-500 text-sm">4.48M contracts • 47k vendors</p>
        </div>
      </div>

      {/* The 4-Column Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {defenseCategories.map((category) => {
          const IconComponent = category.icon;
          
          return (
            /* We wrap each card in a Link so they will be clickable in the next step */
            <Link 
              href={`/category/${category.id}`} 
              key={category.id} 
              className="bg-card hover:bg-gray-800/40 transition-colors border border-gray-800/50 p-6 rounded-xl group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <IconComponent className="w-10 h-10 text-gray-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <FragilityBadge status={category.status} />
              </div>
              
              <div className="mt-auto">
                <h3 className="text-lg font-bold mb-1">{category.title}</h3>
                <p className="text-xs text-gray-500 mb-6">{category.subtext}</p>
                <p className="text-2xl font-bold">${category.budgetBillions.toFixed(1)}B</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}