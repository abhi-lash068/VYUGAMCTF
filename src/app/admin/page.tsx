
'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Plus, Edit, Trash2, FileDown, Activity, Settings, Users, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const challenges = [
    { id: '1', title: 'The Hidden Vault', category: 'Web', points: 100, solves: 12 },
    { id: '2', title: 'Echoes in the Dark', category: 'Crypto', points: 250, solves: 5 },
    { id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, solves: 2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" /> Command <span className="text-primary">Center</span>
            </h1>
            <p className="text-muted-foreground">Manage challenges, monitor activity, and oversee event security.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="border-border">
              <FileDown className="mr-2 h-4 w-4" /> Export Results
            </Button>
            <Button className="neon-glow">
              <Plus className="mr-2 h-4 w-4" /> Create Challenge
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Participants', value: '142', icon: Users },
            { label: 'Submissions/Min', value: '24', icon: Activity },
            { label: 'Platform Status', value: 'Secure', icon: Shield, extra: 'text-green-400' },
            { label: 'Reported Issues', value: '0', icon: AlertCircle },
          ].map((stat, i) => (
            <Card key={i} className="bg-card border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">{stat.label}</p>
                  <p className={`text-xl font-bold font-headline ${stat.extra || ''}`}>{stat.value}</p>
                </div>
                <stat.icon className="h-5 w-5 text-muted-foreground opacity-50" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">Challenge Inventory</CardTitle>
            <div className="relative w-64">
              <Input placeholder="Filter challenges..." className="h-8 bg-background border-border text-xs" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Challenge Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Solves</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challenges.map((ch) => (
                  <TableRow key={ch.id} className="border-border">
                    <TableCell className="font-bold">{ch.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase">{ch.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-code">{ch.points}</TableCell>
                    <TableCell className="text-right font-code">{ch.solves}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="font-headline text-lg">System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-code text-xs">
                <div className="p-2 bg-background rounded border border-border/50 flex gap-3">
                  <span className="text-primary">[14:22:01]</span>
                  <span className="text-green-400">SUCCESS:</span>
                  <span>User 'CyberWiz' solved 'The Hidden Vault'</span>
                </div>
                <div className="p-2 bg-background rounded border border-border/50 flex gap-3">
                  <span className="text-primary">[14:21:55]</span>
                  <span className="text-destructive">FAILURE:</span>
                  <span>Flag attempt mismatch from IP 192.168.1.45</span>
                </div>
                <div className="p-2 bg-background rounded border border-border/50 flex gap-3">
                  <span className="text-primary">[14:20:12]</span>
                  <span className="text-accent">INFO:</span>
                  <span>Platform health check complete. All systems nominal.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Event Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-bold">Submissions Lock</p>
                  <p className="text-xs text-muted-foreground">Prevent any new flags from being submitted.</p>
                </div>
                <Button variant="outline" className="border-border hover:bg-destructive hover:text-destructive-foreground">Lock Now</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div>
                  <p className="font-bold">Maintenance Mode</p>
                  <p className="text-xs text-muted-foreground">Redirect all users to a maintenance screen.</p>
                </div>
                <Button variant="outline" className="border-border">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
