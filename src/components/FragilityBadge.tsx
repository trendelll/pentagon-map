// 1. We'll define the type here directly so it's easier to manage
export type FragilityStatus = 'extreme concentration' | 'monopoly risk' | 'moderate concentration' | 'mixed';

interface FragilityBadgeProps {
  status: FragilityStatus;
}

export default function FragilityBadge({ status }: FragilityBadgeProps) {
  // Logic for "Extreme Concentration" or "Monopoly Risk"
  if (status === 'extreme concentration' || status === 'monopoly risk') {
    return (
      <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-red-500/30">
        {status}
      </span>
    );
  }

  // Logic for "Moderate" or "Mixed"
  if (status === 'moderate concentration' || status === 'mixed') {
    return (
      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-yellow-500/30">
        {status}
      </span>
    );
  }

  // Fallback for anything else
  return (
    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-green-500/30">
      Healthy / Competitive
    </span>
  );
}