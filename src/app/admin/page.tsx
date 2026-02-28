
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, Plus, Edit, Trash2, FileDown, Activity, 
  Settings, Users, AlertCircle, Send, Globe, Save, FileArchive
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

interface Challenge {
  id: string;
  title: string;
  category: string;
  points: number;
  solves: number;
  description: string;
  flag: string;
  externalLink?: string;
  fileUrl?: string;
}

const INITIAL_CHALLENGES: Challenge[] = [
  { id: '1', title: 'The Hidden Vault', category: 'Web', points: 100, solves: 12, description: 'Find the hidden admin credentials in the source.', flag: 'VYUGAM{view_source_is_not_enough}', externalLink: 'https://vault.vyugam.live' },
  { id: '2', title: 'Echoes in the Dark', category: 'Crypto', points: 250, solves: 5, description: 'The signal is encrypted with a simple shift. BMZNHNS{...}', flag: 'VYUGAM{caesar_is_proud}', fileUrl: 'https://files.vyugam.live/signal.zip' },
  { id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, solves: 2, description: 'Analyze the pcap file to recover the transmitted data.', flag: 'VYUGAM{pcap_analysis_master}', fileUrl: 'https://files.vyugam.live/traffic.pcap' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Partial<Challenge>>({
    title: '',
    category: 'Web',
    points: 100,
    description: '',
    flag: '',
    externalLink: '',
    fileUrl: ''
  });

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the Command Center.",
        variant: "destructive"
      });
      router.push('/');
    } else {
      setIsAuthorized(true);
      const saved = localStorage.getItem('ctf_challenges');
      if (saved) {
        try {
          setChallenges(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load challenges", e);
        }
      }
    }
  }, [router, toast]);

  const saveToStorage = (updatedList: Challenge[]) => {
    localStorage.setItem('ctf_challenges', JSON.stringify(updatedList));
  };

  const handleOpenCreate = () => {
    setEditMode(false);
    setCurrentChallenge({
      title: '',
      category: 'Web',
      points: 100,
      description: '',
      flag: '',
      externalLink: '',
      fileUrl: ''
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (challenge: Challenge) => {
    setEditMode(true);
    setCurrentChallenge(challenge);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = challenges.filter(c => c.id !== id);
    setChallenges(updated);
    saveToStorage(updated);
    toast({
      title: "Challenge Removed",
      description: "The challenge has been deleted from the database.",
      variant: "destructive"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode && currentChallenge.id) {
      const updated = challenges.map(c => 
        c.id === currentChallenge.id ? (currentChallenge as Challenge) : c
      );
      setChallenges(updated);
      saveToStorage(updated);
      toast({
        title: "Challenge Updated",
        description: `${currentChallenge.title} has been updated successfully.`,
      });
    } else {
      const newChallenge: Challenge = {
        ...(currentChallenge as Omit<Challenge, 'id' | 'solves'>),
        id: Math.random().toString(36).substr(2, 9),
        solves: 0
      } as Challenge;
      
      const updated = [...challenges, newChallenge];
      setChallenges(updated);
      saveToStorage(updated);
      toast({
        title: "Challenge Deployed",
        description: `${newChallenge.title} is now live.`,
      });
    }
    
    setIsOpen(false);
  };

  const handleGeneralAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `The ${action} command has been sent to the primary server.`,
    });
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" /> Command <span className="text-primary">Center</span>
            </h1>
            <p className="text-muted-foreground">Manage challenges, monitor activity, and oversee event security.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="border-border" onClick={() => handleGeneralAction('Export')}>
              <FileDown className="mr-2 h-4 w-4" /> Export Results
            </Button>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="neon-glow" onClick={handleOpenCreate}>
                  <Plus className="mr-2 h-4 w-4" /> Create Challenge
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] bg-card border-border">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">
                      {editMode ? 'Update' : 'Deploy New'} <span className="text-primary">Challenge</span>
                    </DialogTitle>
                    <DialogDescription>
                      Configure the parameters for a security laboratory.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Title</label>
                      <Input 
                        placeholder="Enter challenge name" 
                        className="col-span-3 bg-background" 
                        value={currentChallenge.title}
                        onChange={(e) => setCurrentChallenge({...currentChallenge, title: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Category</label>
                      <Select 
                        value={currentChallenge.category} 
                        onValueChange={(val) => setCurrentChallenge({...currentChallenge, category: val})}
                      >
                        <SelectTrigger className="col-span-3 bg-background">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Web">Web Exploitation</SelectItem>
                          <SelectItem value="Crypto">Cryptography</SelectItem>
                          <SelectItem value="Forensics">Digital Forensics</SelectItem>
                          <SelectItem value="OSINT">OSINT</SelectItem>
                          <SelectItem value="DEBUG">Debugging</SelectItem>
                          <SelectItem value="AI Security">AI Security</SelectItem>
                          <SelectItem value="General">General Knowledge</SelectItem>
                          <SelectItem value="Misc">Miscellaneous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Points</label>
                      <Input 
                        type="number" 
                        placeholder="100" 
                        className="col-span-3 bg-background" 
                        value={currentChallenge.points}
                        onChange={(e) => setCurrentChallenge({...currentChallenge, points: parseInt(e.target.value) || 0})}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Flag</label>
                      <Input 
                        placeholder="VYUGAM{...}" 
                        className="col-span-3 bg-background font-code" 
                        value={currentChallenge.flag}
                        onChange={(e) => setCurrentChallenge({...currentChallenge, flag: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium flex items-center justify-end gap-1">
                        <Globe className="h-3 w-3" /> Instance
                      </label>
                      <Input 
                        placeholder="https://..." 
                        className="col-span-3 bg-background" 
                        value={currentChallenge.externalLink}
                        onChange={(e) => setCurrentChallenge({...currentChallenge, externalLink: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium flex items-center justify-end gap-1">
                        <FileArchive className="h-3 w-3" /> File URL
                      </label>
                      <Input 
                        placeholder="URL to challenge files" 
                        className="col-span-3 bg-background" 
                        value={currentChallenge.fileUrl}
                        onChange={(e) => setCurrentChallenge({...currentChallenge, fileUrl: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm font-medium">Description</label>
                      <Textarea 
                        placeholder="Explain the vulnerability..." 
                        className="col-span-3 bg-background min-h-[80px]" 
                        value={currentChallenge.description}
                        onChange={(e) => setCurrentChallenge({...currentChallenge, description: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="neon-glow w-full sm:w-auto">
                      {editMode ? 'Save Changes' : 'Initialize Deployment'} 
                      {editMode ? <Save className="ml-2 h-4 w-4" /> : <Send className="ml-2 h-4 w-4" />}
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
            { label: 'Total Challenges', value: challenges.length.toString(), icon: AlertCircle },
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
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Challenge Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                  <TableHead className="text-right">Solves</TableHead>
                  <TableHead className="text-right">Resources</TableHead>
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
                        {ch.externalLink && <Globe className="h-4 w-4 text-muted-foreground" title="External Link" />}
                        {ch.fileUrl && <FileArchive className="h-4 w-4 text-muted-foreground" title="File Resource" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:text-primary"
                          onClick={() => handleOpenEdit(ch)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:text-destructive"
                          onClick={() => handleDelete(ch.id)}
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
      </main>
    </div>
  );
}
