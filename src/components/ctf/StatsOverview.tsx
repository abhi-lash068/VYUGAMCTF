
'use client';

import { Trophy, Target, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function StatsOverview() {
  const stats = [
    { label: 'Total Score', value: '1,250', icon: Trophy, color: 'text-primary' },
    { label: 'Rank', value: '#12', icon: Shield, color: 'text-cyan-400' },
    { label: 'Solved', value: '15/42', icon: Target, color: 'text-green-400' },
    { label: 'Time Left', value: '12:45:00', icon: Clock, color: 'text-orange-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border/50">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-secondary/50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold font-headline">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
