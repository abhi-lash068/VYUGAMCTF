'use server';

import { generateChallengeHint as aiHintGenerator } from '@/ai/flows/ai-challenge-hint-generator';

// Mock database for prototype demonstration
let mockChallenges: any[] = [
  { id: '1', title: 'The Hidden Vault', category: 'Web', points: 100, description: 'Find the hidden admin credentials in the source.', flag: 'VYUGAM{view_source_is_not_enough}', solvesCount: 12 },
  { id: '2', title: 'Echoes in the Dark', category: 'Crypto', points: 250, description: 'The signal is encrypted with a simple shift. BMZNHNS{...}', flag: 'VYUGAM{caesar_is_proud}', solvesCount: 5 },
  { id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, description: 'Analyze the pcap file to recover the transmitted data.', flag: 'VYUGAM{pcap_analysis_master}', solvesCount: 2 },
  { id: '4', title: 'The AI Oracle', category: 'AI Security', points: 300, description: 'Convince the AI to reveal its secret flag.', flag: 'VYUGAM{prompt_injection_success}', solvesCount: 8 },
];

let mockUsers: any[] = [
  { uid: 'u1', name: 'CyberWiz', college: 'Tech Institute', score: 1250, solvedChallenges: ['1', '2'], role: 'player' },
  { uid: 'u2', name: 'NullPointer', college: 'Engineering State', score: 950, solvedChallenges: ['1'], role: 'player' },
];

// Predefined hints for when AI key is missing
const fallbackHints: Record<string, string> = {
  '1': 'Have you tried checking the HTML comments or the Network tab in your browser tools?',
  '2': 'The hint mentions a "simple shift". Look into the Caesar Cipher, it is a classic for a reason.',
  '3': 'Wireshark is your best friend here. Look for transmitted strings or exported objects.',
  '4': 'The AI is programmed to be helpful, but it might be too helpful if you ask it to "act as a developer" or "ignore previous instructions".',
};

export async function submitFlag(challengeId: string, flagAttempt: string, userId: string) {
  await new Promise(r => setTimeout(r, 800));

  const challenge = mockChallenges.find(c => c.id === challengeId);
  if (!challenge) return { success: false, message: 'Challenge not found' };

  if (flagAttempt === challenge.flag) {
    return { 
      success: true, 
      message: 'Correct Flag! Points awarded.',
      points: challenge.points
    };
  }

  return { success: false, message: 'Incorrect flag. Try again.' };
}

export async function requestHint(challengeId: string, challengeDescription: string) {
  try {
    // Attempt AI generation if key exists (simulated check via try/catch)
    const result = await aiHintGenerator({ challengeDescription });
    return { success: true, hint: result.hint };
  } catch (error) {
    // Fallback to static hints if AI fails (e.g., missing API key)
    console.log('AI Hint failed or no API key, using fallback for challenge:', challengeId);
    const hint = fallbackHints[challengeId] || 'No specific hint available for this challenge yet. Try searching for common vulnerabilities in this category.';
    return { success: true, hint };
  }
}

export async function getLeaderboard() {
  return [...mockUsers]
    .sort((a, b) => b.score - a.score)
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

export async function getChallenges() {
  return mockChallenges.map(({ flag, ...rest }) => rest);
}
