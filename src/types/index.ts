
export type UserRole = 'admin' | 'player';

export interface User {
  uid: string;
  name: string;
  email: string;
  college: string;
  role: UserRole;
  score: number;
  solvedChallenges: string[]; // Challenge IDs
  rank?: number;
  createdAt: number;
}

export type ChallengeCategory = 'Web' | 'Crypto' | 'OSINT' | 'Forensics' | 'AI Security' | 'Misc';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: ChallengeCategory;
  flag?: string; // Hashed or protected on server-side
  fileUrl?: string;
  externalLink?: string;
  isLocked?: boolean;
  requiredChallengeId?: string;
  solvesCount: number;
}

export interface Solve {
  id: string;
  userId: string;
  challengeId: string;
  timestamp: number;
  userName: string;
  college: string;
  points: number;
}

export interface Hint {
  id: string;
  challengeId: string;
  content: string;
  cost: number;
}
