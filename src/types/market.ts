export interface Market {
  id: string;
  question: string;
  description: string;
  category: 'crypto' | 'sports' | 'tech' | 'politics' | 'entertainment';
  creator: string;
  createdAt: Date;
  resolutionDate: Date;
  totalVolume: number;
  yesPrice: number;
  noPrice: number;
  yesShares: number;
  noShares: number;
  status: 'active' | 'resolved' | 'closed';
  resolved?: boolean;
  tags: string[];
}

export interface UserPosition {
  marketId: string;
  shares: number;
  side: 'yes' | 'no';
  averagePrice: number;
  currentValue: number;
}

export interface User {
  publicKey: string;
  balance: number;
  positions: UserPosition[];
  marketsCreated: number;
  totalVolume: number;
}