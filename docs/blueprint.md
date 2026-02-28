# **App Name**: VYUGAM CTF

## Core Features:

- Secure User Authentication: Implements Firebase Email/Password login for distinct Player and Admin roles. Stores essential user details like name, college, and email securely in Firestore.
- Categorized Challenge Display: Presents a dynamic list of challenges, categorized (e.g., Web, Crypto, OSINT, AI Security), showing title, points, description, and real-time solve status.
- Flag Submission System: Provides an input mechanism for players to submit flags, ensuring case-sensitive validation and adherence to the specified VYUGAM{...} format.
- Server-side Flag Validation: Utilizes Firebase Cloud Functions for secure flag validation, comparing submitted flags against hashed values stored in Firestore to prevent client-side bypass and exposure.
- Real-time Leaderboard: Displays an actively updating leaderboard showing participant ranks, names, colleges, and scores, sorted by score with earliest solve time as a tie-breaker.
- Admin Challenge Management: Provides a basic administrator interface for creating, editing, and deleting challenges, setting point values, defining categories, and uploading necessary challenge files.
- AI Hint Generation Tool: An AI-powered tool that generates context-aware hints for challenges upon request, leveraging challenge descriptions to provide progressive guidance without revealing direct solutions.

## Style Guidelines:

- Primary color: A bold blue-violet (#7060F6) to embody a fusion of technology, mystery, and vibrant energy against a dark backdrop.
- Background color: A deep, dark violet-blue (#1A1822) to establish a focused 'hacker' aesthetic and provide stark contrast for neon elements.
- Accent color: A very bright, highly saturated cyan-blue (#CDE9FF) designed to create striking 'neon glow' effects for interactive elements and highlights.
- Headline font: 'Space Grotesk' (sans-serif) for its futuristic and technical appearance, suitable for headings and prominent text.
- Body font: 'Inter' (sans-serif) for its modern neutrality and excellent readability in challenge descriptions and general interface text.
- Code font: 'Source Code Pro' (monospace sans-serif) for clearly rendering flags, code snippets, and any terminal-like textual content.
- Utilize sleek, minimalist, and vector-based icons with themes like cybersecurity, circuit boards, locks, and shields to reinforce the 'hacker' aesthetic.
- Implement a clean, card-based grid layout for displaying challenges and the leaderboard, optimized for responsiveness across both mobile and desktop devices within the dark theme.
- Incorporate subtle, smooth transitions and hover effects with neon glows for dynamic elements like challenge status updates, leaderboard position changes, and navigation, enhancing interactivity.