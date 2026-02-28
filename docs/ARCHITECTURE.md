# VYUGAM CTF Architecture

This document explains the flow and structure of the VYUGAM CTF prototype.

## 1. User Roles & Authentication
The prototype uses a simulated authentication system stored in `localStorage`.
- **Player**: Standard access. Can view challenges, request hints, and submit flags.
- **Admin**: Command Center access. Can "create" challenges and manage event status.
- **Login Logic**: Entering "admin" in the username field grants administrative privileges. Any other input defaults to a player role.

## 2. Core Application Flow

### Player Journey
1. **Landing Page**: Introduction to the symposium.
2. **Registration/Login**: Users initialize their session.
3. **Dashboard**: View personal stats (Rank, Score, Solves) and active challenges.
4. **Challenge Hub**: 
   - Challenges are categorized (Web, Crypto, etc.).
   - Users open a challenge to read the description and view resources.
   - **AI Hint System**: Powered by Google Genkit. If an API key is present, it generates progressive hints. If not, it falls back to predefined static hints.
   - **Flag Submission**: Users submit flags in the `VYUGAM{...}` format. Server actions validate the input and update the UI.
5. **Leaderboard**: Real-time ranking based on total points.

### Admin Journey
1. **Admin Panel**: Accessible via the user dropdown if the role is 'admin'.
2. **Command Center**:
   - Monitor system health and logs.
   - Deploy new challenges (Simulation).
   - Global event controls (Lock submissions, Maintenance mode).

## 3. Technology Stack
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS + Shadcn UI.
- **Icons**: Lucide React.
- **AI Engine**: Google Genkit (Gemini 2.5 Flash).
- **Data Handling**: Server Actions (`src/app/actions/ctf-actions.ts`) simulating a backend database.

## 4. AI Hint Generation Flow
The hint system follows this logic:
1. `ChallengeCard.tsx` calls the `requestHint` server action.
2. The action invokes `ai-challenge-hint-generator.ts`.
3. Genkit uses a defined prompt to transform the challenge description into a helpful hint.
4. If the LLM call fails (missing key), the server action catches the error and provides a fallback hint from a local dictionary.