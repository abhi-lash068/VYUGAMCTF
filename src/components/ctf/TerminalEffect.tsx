'use client';

import { useState, useEffect } from 'react';

const COMMANDS = [
  '> INITIALIZING VYUGAM_KERNEL_v4.0.2...',
  '> ESTABLISHING SECURE CONNECTION...',
  '> LOADING ENCRYPTION MODULES...',
  '> BYPASSING FIREWALL [OK]',
  '> GAINING ROOT ACCESS...',
  '> DECRYPTING CHALLENGE_DATABASE...',
  '> SYSTEM READY. WELCOME OPERATOR.',
  '> _'
];

export function TerminalEffect() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate session ID only on the client to avoid hydration mismatch
    setSessionId(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  useEffect(() => {
    if (currentLineIndex < COMMANDS.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, COMMANDS[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, currentLineIndex === 0 ? 500 : 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  return (
    <div className="bg-black/80 border border-primary/30 rounded-lg p-4 font-code text-xs md:text-sm shadow-[0_0_20px_rgba(34,197,94,0.15)] h-64 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-scanline pointer-events-none" />
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={i === COMMANDS.length - 1 ? "text-primary animate-pulse" : "text-primary/80"}>
            {line}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-4 text-[10px] text-primary/40 uppercase tracking-tighter">
        Secure Terminal Access // Session ID: {sessionId || 'BOOTING...'}
      </div>
    </div>
  );
}
