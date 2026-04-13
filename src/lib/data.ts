import { Ship, Plane, RadioTower, Rocket } from 'lucide-react';

export type FragilityStatus = 'fragile' | 'moderate' | 'healthy';

export const defenseCategories = [
  { 
    id: 'aviation', 
    title: 'Aviation', 
    icon: Plane, 
    status: 'fragile' as FragilityStatus, 
    subtext: 'Fighter jets • helicopters • drones', 
    budgetBillions: 87.0 
  },
  { 
    id: 'maritime', 
    title: 'Maritime', 
    icon: Ship, 
    status: 'fragile' as FragilityStatus, 
    subtext: 'Ships • submarines • naval', 
    budgetBillions: 60.0 
  },
  { 
    id: 'c4i', 
    title: 'C4I', 
    icon: RadioTower, 
    status: 'moderate' as FragilityStatus, 
    subtext: 'Radar • comms • intel', 
    budgetBillions: 45.0 
  },
  { 
    id: 'missiles', 
    title: 'Missiles & munitions', 
    icon: Rocket, 
    status: 'fragile' as FragilityStatus, 
    subtext: 'Warheads • ammo • torpedoes', 
    budgetBillions: 44.7 
  }
];

export interface ContractorShare {
    id?: string; // Optional: used for linking to Screen 3
    name: string;
    sharePercentage: number;
    shareBillions: number;
  }
  
  export const aviationContractors: ContractorShare[] = [
    { id: 'lockheed', name: 'Lockheed Martin Corporation', sharePercentage: 58, shareBillions: 43.48 },
    { name: 'The Boeing Company', sharePercentage: 11.7, shareBillions: 10.28 },
    { name: 'Northrop Grumman Systems', sharePercentage: 7.6, shareBillions: 6.68 },
    { name: 'RTX Corporation', sharePercentage: 5.7, shareBillions: 5.08 },
    { name: 'Textron Aviation', sharePercentage: 3.2, shareBillions: 2.88 },
  ];


export const contractorDetails: Record<string, any> = {
    lockheed: {
      id: 'lockheed',
      name: 'Lockheed Martin Corporation',
      location: 'Bethesda, MD',
      ticker: 'LMT',
      employees: '114,000',
      totalFy2026: 43.4, // in billions
      contractActions: '7,257',
      fragilityImpact: 'high',
      // We map this to match the shape our PercentageBarChart expects!
      marketShare: [
        { name: 'Aviation', sharePercentage: 50.8, shareBillions: 43.48 },
        { name: 'Missile defense', sharePercentage: 38.2, shareBillions: 2.38 },
        { name: 'Space', sharePercentage: 22.1, shareBillions: 1.18 },
        { name: 'Missiles & munitions', sharePercentage: 14.8, shareBillions: 6.68 },
        { name: 'C4I', sharePercentage: 6.7, shareBillions: 2.88 },
      ]
    }
  };