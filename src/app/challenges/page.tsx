
'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ChallengeCard } from '@/components/ctf/ChallengeCard';
import { Input } from '@/components/ui/input';
import { Search, Terminal, Globe, Shield, Database, Cpu, Box, Bug, Info, SearchCode } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getChallenges } from '@/app/actions/ctf-actions';

export default function Challenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getChallenges().then(setChallenges);
  }, []);

  const categories = [
    { name: 'All', icon: Box },
    { name: 'Web', icon: Globe },
    { name: 'Crypto', icon: Shield },
    { name: 'Forensics', icon: Database },
    { name: 'OSINT', icon: SearchCode },
    { name: 'DEBUG', icon: Bug },
    { name: 'AI Security', icon: Cpu },
    { name: 'General', icon: Info },
    { name: 'Misc', icon: Terminal },
  ];

  const filteredChallenges = challenges.filter(c => 
    (filter === 'All' || c.category === filter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || 
     c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <header className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-headline font-bold mb-2">Challenge <span className="text-primary">Hub</span></h1>
              <p className="text-muted-foreground">Select a category and start hacking. May the source be with you.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search challenges..." 
                className="pl-10 bg-card border-border"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <Tabs defaultValue="All" className="w-full" onValueChange={setFilter}>
              <TabsList className="bg-card border border-border p-1 w-full sm:w-auto h-auto flex flex-wrap sm:flex-nowrap">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.name} 
                    value={cat.name} 
                    className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} isSolved={challenge.id === '1'} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Terminal className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-xl text-muted-foreground font-headline">No challenges found matching your filters.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
