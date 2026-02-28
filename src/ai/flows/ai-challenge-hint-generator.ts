'use server';
/**
 * @fileOverview An AI agent that generates hints for CTF challenges.
 *
 * - generateChallengeHint - A function that handles the AI hint generation process.
 * - ChallengeHintInput - The input type for the generateChallengeHint function.
 * - ChallengeHintOutput - The return type for the generateChallengeHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChallengeHintInputSchema = z.object({
  challengeDescription: z
    .string()
    .describe("The full description of the CTF challenge for which a hint is requested."),
});
export type ChallengeHintInput = z.infer<typeof ChallengeHintInputSchema>;

const ChallengeHintOutputSchema = z.object({
  hint: z
    .string()
    .describe(
      "A helpful hint for the challenge, providing progressive guidance without directly revealing the solution."
    ),
});
export type ChallengeHintOutput = z.infer<typeof ChallengeHintOutputSchema>;

export async function generateChallengeHint(
  input: ChallengeHintInput
): Promise<ChallengeHintOutput> {
  return aiChallengeHintGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'challengeHintPrompt',
  input: {schema: ChallengeHintInputSchema},
  output: {schema: ChallengeHintOutputSchema},
  prompt: `You are an AI assistant specialized in providing hints for Capture The Flag (CTF) challenges.
Your goal is to give a helpful hint that guides the player towards the solution without giving it away directly.
The hint should be based on the provided challenge description and aim to stimulate critical thinking.

Challenge Description:
{{{challengeDescription}}}

Generate a hint for this challenge:`,
});

const aiChallengeHintGeneratorFlow = ai.defineFlow(
  {
    name: 'aiChallengeHintGeneratorFlow',
    inputSchema: ChallengeHintInputSchema,
    outputSchema: ChallengeHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
