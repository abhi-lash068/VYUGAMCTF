
'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Trophy, Medal, Search, TrendingUp, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getLeaderboard } from '@/app/actions/ctf-actions';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getLeaderboard().then(setPlayers);
  }, []);

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.college.toLowerCase().includes(search.toLowerCase())
  );

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return <Medal className="h-5 w-5 text-yellow-400" />;
      case 2: return <Medal className="h-5 w-5 text-gray-300" />;
      case 3: return <Medal className="h-5 w-5 text-orange-400" />;
      default: return <span className="text-sm font-code text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2 flex items-center gap-3">
              <Trophy className="h-10 w-10 text-primary" /> Hall of <span className="text-primary">Fame</span>
            </h1>
            <p className="text-muted-foreground">The best of the best. Real-time ranking of top cybersecurity talent.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Find a hacker..." 
                className="pl-10 bg-card border-border"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Hackers', value: '142', icon: Users, color: 'text-primary' },
            { label: 'Total Solves', value: '1,284', icon: TrendingUp, color: 'text-green-400' },
            { label: 'Average Score', value: '450', icon: Trophy, color: 'text-orange-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-card/50 border border-border p-6 rounded-xl flex items-center justify-between backdrop-blur-sm">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                <p className="text-3xl font-headline font-bold">{stat.value}</p>
              </div>
              <stat.icon className={cn("h-10 w-10 opacity-20", stat.color)} />
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden neon-border">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-[80px] text-center font-headline uppercase text-xs tracking-wider">Rank</TableHead>
                <TableHead className="font-headline uppercase text-xs tracking-wider">Player</TableHead>
                <TableHead className="hidden md:table-cell font-headline uppercase text-xs tracking-wider">College</TableHead>
                <TableHead className="text-right font-headline uppercase text-xs tracking-wider">Solved</TableHead>
                <TableHead className="text-right font-headline uppercase text-xs tracking-wider">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlayers.map((player) => (
                <TableRow key={player.uid} className="hover:bg-secondary/20 border-border group">
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center h-full">
                      {getRankBadge(player.rank)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border group-hover:border-primary transition-colors">
                        <AvatarImage src={`https://picsum.photos/seed/${player.uid}/32/32`} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold font-headline">{player.name}</span>
                        <span className="md:hidden text-xs text-muted-foreground">{player.college}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {player.college}
                  </TableCell>
                  <TableCell className="text-right font-code text-sm">
                    {player.solvedChallenges.length}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-primary font-code">{player.score.toLocaleString()} PTS</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
