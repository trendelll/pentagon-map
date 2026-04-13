import { FragilityStatus } from '../lib/data';

export default function FragilityBadge({ status }: { status: FragilityStatus }) {
  if (status === 'fragile') {
    return <span className="bg-fragile-bg text-fragile px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">fragile / monopoly risk</span>;
  }
  if (status === 'moderate') {
    return <span className="bg-moderate-bg text-moderate px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">moderate</span>;
  }
  return <span className="bg-healthy-bg text-healthy px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">healthy / competitive</span>;
}