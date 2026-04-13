import Link from 'next/link';
import { ContractorShare } from '../lib/data';

export default function PercentageBarChart({ items }: { items: ContractorShare[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={item.name} className="space-y-2">
          {/* Label and Value Row */}
          <div className="flex justify-between items-end text-sm">
            {item.id ? (
              <Link href={`/contractor/${item.id}`} className="text-white font-bold hover:text-blue-400 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-white font-bold">{item.name}</span>
            )}
            <span className="text-gray-400 text-xs font-mono">
              <span className="text-white text-sm font-sans mr-2">${item.shareBillions.toFixed(2)}B</span> 
              • {item.sharePercentage.toFixed(1)}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-gray-800/50 rounded-full h-2">
            {/* Dynamic Fill */}
            <div
              className="bg-fragile h-2 rounded-full"
              style={{ width: `${item.sharePercentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}