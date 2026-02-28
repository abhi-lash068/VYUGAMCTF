'use client';

import { useState, useEffect } from 'react';

export function TerminalEffect() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate session ID only on the client to avoid hydration mismatch
    setSessionId(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  return (
    <div className="bg-black/80 border border-primary/30 rounded-lg p-6 font-code text-sm shadow-[0_0_20px_rgba(34,197,94,0.15)] h-64 relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10 animate-pulse pointer-events-none" />
      <div className="space-y-2">
        <div className="text-primary/60">[root@vyugam ~]# systemctl status security-hub</div>
        <div className="text-primary">● security-hub.service - Vyugam CTF Core Engine</div>
        <div className="pl-4 text-primary/80">
          <div>Loaded: loaded (/lib/systemd/system/security-hub.service)</div>
          <div>Active: <span className="text-green-400 font-bold">active (running)</span> since Thu 2024-05-23</div>
          <div>Main PID: 1337 (hacker-engine)</div>
          <div>Tasks: 42 (limit: 4915)</div>
          <div className="mt-4 animate-pulse">
            {'>'} Initializing challenge nodes... [OK]
          </div>
          <div className="animate-pulse">
            {'>'} Awaiting operator connection...
          </div>
          <div className="mt-2 text-primary font-bold">
            {'>'} _
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-6 text-[10px] text-primary/30 uppercase tracking-tighter font-mono">
        Terminal ID: {sessionId || 'BOOTING...'}
      </div>
    </div>
  );
}
