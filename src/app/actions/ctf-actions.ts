
'use server';

import { generateChallengeHint as aiHintGenerator } from '@/ai/flows/ai-challenge-hint-generator';

// Mock database for prototype demonstration
// In production, these would use Firestore Admin SDK
let mockChallenges: any[] = [
  { id: '1', title: 'The Hidden Vault', category: 'Web', points: 100, description: 'Find the hidden admin credentials in the source.', flag: 'VYUGAM{view_source_is_not_enough}', solvesCount: 12 },
  { id: '2', title: 'Echoes in the Dark', category: 'Crypto', points: 250, description: 'The signal is encrypted with a simple shift. BMZNHNS{...}', flag: 'VYUGAM{caesar_is_proud}', solvesCount: 5 },
  { id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, description: 'Analyze the pcap file to recover the transmitted data.', flag: 'VYUGAM{pcap_analysis_master}', solvesCount: 2 },
  { id: '4', title: 'The AI Oracle', category: 'AI Security', points: 300, description: 'Convince the AI to reveal its secret flag.', flag: 'VYUGAM{prompt_injection_success}', solvesCount: 8 },
];

let mockUsers: any[] = [
  { uid: 'u1', name: 'CyberWiz', college: 'Tech Institute', score: 1200, solvedChallenges: ['1', '2'], role: 'player' },
  { uid: 'u2', name: 'NullPointer', college: 'Engineering State', score: 950, solvedChallenges: ['1'], role: 'player' },
  { uid: 'admin1', name: 'SuperAdmin', college: 'VYUGAM HQ', score: 0, solvedChallenges: [], role: 'admin' },
];

export async function submitFlag(challengeId: string, flagAttempt: string, userId: string) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));

  const challenge = mockChallenges.find(c => c.id === challengeId);
  if (!challenge) return { success: false, message: 'Challenge not found' };

  if (flagAttempt === challenge.flag) {
    // In real app, update Firestore score and solvedChallenges
    return { 
      success: true, 
      message: 'Correct Flag! Points awarded.',
      points: challenge.points
    };
  }

  return { success: false, message: 'Incorrect flag. Try again.' };
}

export async function requestHint(challengeDescription: string) {
  try {
    const result = await aiHintGenerator({ challengeDescription });
    return { success: true, hint: result.hint };
  } catch (error) {
    return { success: false, message: 'Failed to generate hint' };
  }
}

export async function getLeaderboard() {
  return [...mockUsers]
    .filter(u => u.role === 'player')
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

export async function getChallenges() {
  // Never send the flag to the client!
  return mockChallenges.map(({ flag, ...rest }) => rest);
}
