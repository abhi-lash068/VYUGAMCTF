
'use client';

import { Navbar } from '@/components/layout/Navbar';
import { StatsOverview } from '@/components/ctf/StatsOverview';
import { ChallengeCard } from '@/components/ctf/ChallengeCard';
import { Button } from '@/components/ui/button';
import { Terminal, Bell, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Dashboard() {
  const recentSolves = [
    { challenge: 'The Hidden Vault', time: '5 mins ago', points: '+100' },
    { challenge: 'Echoes in the Dark', time: '1 hour ago', points: '+250' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Welcome back, <span className="text-primary">CyberWiz</span></h1>
            <p className="text-muted-foreground">Tech Institute | Current Rank: #12</p>
          </div>
          <Button asChild className="neon-glow">
            <Link href="/challenges">
              <Terminal className="mr-2 h-4 w-4" /> Go to Challenges
            </Link>
          </Button>
        </div>

        <StatsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-headline font-bold flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" /> Active Challenges
                </h2>
                <Link href="/challenges" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChallengeCard challenge={{
                  id: '4', title: 'The AI Oracle', category: 'AI Security', points: 300, description: 'Convince the AI to reveal its secret flag.'
                }} />
                <ChallengeCard challenge={{
                  id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, description: 'Analyze the pcap file to recover the transmitted data.'
                }} />
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" /> Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-secondary/30 border-l-4 border-primary">
                  <p className="text-sm font-bold">New Challenge Released!</p>
                  <p className="text-xs text-muted-foreground">"Memory Leak" (Misc) is now available. 400pts.</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border-l-4 border-orange-400">
                  <p className="text-sm font-bold flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" /> Event Closing Soon
                  </p>
                  <p className="text-xs text-muted-foreground">Submissions lock in less than 13 hours.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-headline">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSolves.map((solve, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{solve.challenge}</span>
                        <span className="text-xs text-muted-foreground">{solve.time}</span>
                      </div>
                      <span className="text-sm font-bold text-green-400 font-code">{solve.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
