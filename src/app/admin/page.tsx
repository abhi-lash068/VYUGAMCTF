'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, Plus, Edit, Trash2, FileDown, Activity, 
  Settings, Users, AlertCircle, Send, Lock, Globe 
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  const challenges = [
    { id: '1', title: 'The Hidden Vault', category: 'Web', points: 100, solves: 12 },
    { id: '2', title: 'Echoes in the Dark', category: 'Crypto', points: 250, solves: 5 },
    { id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, solves: 2 },
  ];

  const handleAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `The ${action} command has been sent to the primary server.`,
    });
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateOpen(false);
    toast({
      title: "Challenge Created",
      description: "A new challenge has been deployed to the database.",
    });
  };

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
             <Button variant="outline" className="border-border" onClick={() => handleAction('Export')}>
              <FileDown className="mr-2 h-4 w-4" /> Export Results
            </Button>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="neon-glow">
                  <Plus className="mr-2 h-4 w-4" /> Create Challenge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] bg-card border-border">
                <form onSubmit={handleCreateChallenge}>
                  <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Deploy New <span className="text-primary">Challenge</span></DialogTitle>
                    <DialogDescription>
                      Configure the parameters for a new security laboratory.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Title</label>
                      <Input placeholder="Enter challenge name" className="col-span-3 bg-background" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Category</label>
                      <Select defaultValue="Web">
                        <SelectTrigger className="col-span-3 bg-background">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Web">Web Exploitation</SelectItem>
                          <SelectItem value="Crypto">Cryptography</SelectItem>
                          <SelectItem value="Forensics">Digital Forensics</SelectItem>
                          <SelectItem value="AI Security">AI Security</SelectItem>
                          <SelectItem value="Misc">Miscellaneous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Points</label>
                      <Input type="number" placeholder="100" className="col-span-3 bg-background" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Flag</label>
                      <Input placeholder="VYUGAM{...}" className="col-span-3 bg-background font-code" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Description</label>
                      <Textarea placeholder="Explain the vulnerability..." className="col-span-3 bg-background min-h-[100px]" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="neon-glow w-full sm:w-auto">
                      Initialize Deployment <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Challenge Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Solves</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {challenges.map((ch) => (
                  <TableRow key={ch.id} className="border-border group">
                    <TableCell className="font-bold group-hover:text-primary transition-colors">{ch.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase border-primary/20">{ch.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-code">{ch.points}</TableCell>
                    <TableCell className="text-right font-code">{ch.solves}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:text-primary"
                          onClick={() => handleAction('Edit')}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:text-destructive"
                          onClick={() => handleAction('Delete')}
                        >
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
              <CardTitle className="font-headline text-lg flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" /> System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-code text-xs">
                <div className="p-2 bg-background rounded border border-border/50 flex gap-3 animate-in fade-in duration-500">
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
              <CardTitle className="font-headline text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" /> Event Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/30">
                <div>
                  <p className="font-bold flex items-center gap-2">
                    <Lock className="h-4 w-4 text-orange-400" /> Submissions Lock
                  </p>
                  <p className="text-xs text-muted-foreground">Prevent any new flags from being submitted.</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => handleAction('Submissions Lock')}
                >
                  Lock Now
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/30">
                <div>
                  <p className="font-bold flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> Maintenance Mode
                  </p>
                  <p className="text-xs text-muted-foreground">Redirect all users to a maintenance screen.</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleAction('Maintenance Mode')}
                >
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

const Terminal = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);