# VYUGAM CTF Platform

This is a production-ready Capture The Flag (CTF) platform prototype built for the VYUGAM Security Symposium.

## Quick Start
1. **Login**: Use "admin" as a username to explore the Admin Panel, or any other name to enter as a Participant.
2. **Explore**: Head to the Challenges tab to view the hacking labs.
3. **AI Hints**: Click "AI Hint" inside any challenge to see the Genkit integration in action.

## Project Structure
- `src/ai/`: Genkit flows for AI-powered hints.
- `src/app/actions/`: Server actions simulating database operations.
- `src/components/ctf/`: Core game components (Challenge cards, Stats).
- `docs/ARCHITECTURE.md`: Detailed explanation of the app flow and logic.

## Tech Stack
Next.js 15, React, Tailwind CSS, Shadcn UI, and Google Genkit.