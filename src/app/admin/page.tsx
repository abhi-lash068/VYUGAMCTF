'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, Plus, Edit, Trash2, Activity, 
  Users, Globe, FileArchive, X,
  Search, UserCog, Ban, CheckCircle2, UserPlus,
  Lock, Unlock, AlertCircle, RefreshCcw, Settings2
} from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChallengeFile, User, UserRole } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Challenge {
  id: string;
  title: string;
  category: string;
  points: number;
  solves: number;
  description: string;
  flag: string;
  externalLink?: string;
  files?: ChallengeFile[];
}

const INITIAL_CHALLENGES: Challenge[] = [
  { id: '1', title: 'The Hidden Vault', category: 'Web', points: 100, solves: 12, description: 'Find the hidden admin credentials in the source.', flag: 'VYUGAM{view_source_is_not_enough}', externalLink: 'https://vault.vyugam.live' },
  { id: '2', title: 'Echoes in the Dark', category: 'Crypto', points: 250, solves: 5, description: 'The signal is encrypted with a simple shift. BMZNHNS{...}', flag: 'VYUGAM{caesar_is_proud}', files: [{ name: 'signal.zip', url: 'https://files.vyugam.live/signal.zip' }] },
  { id: '3', title: 'Lost Signal', category: 'Forensics', points: 500, solves: 2, description: 'Analyze the pcap file to recover the transmitted data.', flag: 'VYUGAM{pcap_analysis_master}', files: [{ name: 'traffic.pcap', url: 'https://files.vyugam.live/traffic.pcap' }] },
];

const INITIAL_USERS: User[] = [
  { uid: 'u1', name: 'CyberWiz', email: 'wiz@tech.edu', college: 'Tech Institute', score: 1250, solvedChallenges: ['1', '2'], role: 'player', createdAt: Date.now() },
  { uid: 'u2', name: 'NullPointer', email: 'null@state.edu', college: 'Engineering State', score: 950, solvedChallenges: ['1'], role: 'player', createdAt: Date.now() },
  { uid: 'u3', name: 'RootShell', email: 'root@poly.edu', college: 'Polytechnic Univ', score: 2100, solvedChallenges: ['1', '2', '3'], role: 'player', createdAt: Date.now() },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  
  // Event controls state
  const [isLive, setIsLive] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isUserEditOpen, setIsUserEditOpen] = useState(false);
  const [challengeEditMode, setChallengeEditMode] = useState(false);
  const [userEditMode, setUserEditMode] = useState(false);
  
  const [currentChallenge, setCurrentChallenge] = useState<Partial<Challenge>>({
    title: '',
    category: 'Web',
    points: 100,
    description: '',
    flag: '',
    externalLink: '',
    files: []
  });

  const [selectedUser, setSelectedUser] = useState<Partial<User>>({
    name: '',
    email: '',
    college: '',
    score: 0,
    role: 'player',
    solvedChallenges: []
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
      
      const savedChallenges = localStorage.getItem('ctf_challenges');
      if (savedChallenges) {
        try { setChallenges(JSON.parse(savedChallenges)); } catch (e) { setChallenges(INITIAL_CHALLENGES); }
      } else { setChallenges(INITIAL_CHALLENGES); }

      const savedUsers = localStorage.getItem('ctf_users');
      if (savedUsers) {
        try { setUsers(JSON.parse(savedUsers)); } catch (e) { setUsers(INITIAL_USERS); }
      } else { setUsers(INITIAL_USERS); }
    }
  }, [router, toast]);

  const saveChallenges = (list: Challenge[]) => {
    setChallenges(list);
    localStorage.setItem('ctf_challenges', JSON.stringify(list));
  };

  const saveUsers = (list: User[]) => {
    setUsers(list);
    localStorage.setItem('ctf_users', JSON.stringify(list));
  };

  const handleOpenCreateChallenge = () => {
    setChallengeEditMode(false);
    setCurrentChallenge({ title: '', category: 'Web', points: 100, description: '', flag: '', externalLink: '', files: [] });
    setIsChallengeOpen(true);
  };

  const handleOpenEditChallenge = (challenge: Challenge) => {
    setChallengeEditMode(true);
    setCurrentChallenge({ ...challenge, files: challenge.files || [] });
    setIsChallengeOpen(true);
  };

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedFiles = (currentChallenge.files || []).filter(f => f.name.trim() && f.url.trim());
    
    if (challengeEditMode && currentChallenge.id) {
      const updated = challenges.map(c => c.id === currentChallenge.id ? ({ ...currentChallenge, files: sanitizedFiles } as Challenge) : c);
      saveChallenges(updated);
      toast({ title: "Challenge Updated" });
    } else {
      const newChallenge = { ...currentChallenge, id: Math.random().toString(36).substr(2, 9), solves: 0, files: sanitizedFiles } as Challenge;
      saveChallenges([...challenges, newChallenge]);
      toast({ title: "Challenge Deployed" });
    }
    setIsChallengeOpen(false);
  };

  const handleDeleteChallenge = (id: string) => {
    const updated = challenges.filter(c => c.id !== id);
    saveChallenges(updated);
    toast({ title: "Challenge Removed", variant: "destructive" });
  };

  const handleOpenCreateUser = () => {
    setUserEditMode(false);
    setSelectedUser({ name: '', email: '', college: '', score: 0, role: 'player', solvedChallenges: [] });
    setIsUserEditOpen(true);
  };

  const handleOpenEditUser = (user: User) => {
    setUserEditMode(true);
    setSelectedUser(user);
    setIsUserEditOpen(true);
  };

  const handleUserUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEditMode && selectedUser.uid) {
      const updated = users.map(u => u.uid === selectedUser.uid ? (selectedUser as User) : u);
      saveUsers(updated);
      toast({ title: "User Profile Updated" });
    } else {
      const newUser = { 
        ...selectedUser, 
        uid: 'u' + Math.random().toString(36).substr(2, 5),
        createdAt: Date.now() 
      } as User;
      saveUsers([...users, newUser]);
      toast({ title: "Participant Created" });
    }
    setIsUserEditOpen(false);
  };

  const handleDeleteUser = (uid: string) => {
    const updated = users.filter(u => u.uid !== uid);
    saveUsers(updated);
    toast({ title: "User Removed", variant: "destructive" });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.college.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" /> Command <span className="text-primary">Center</span>
            </h1>
            <p className="text-muted-foreground">Comprehensive system management: Control, Content, and Community.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Participants', value: users.length.toString(), icon: Users },
            { label: 'Total Solves', value: users.reduce((acc, u) => acc + (u.solvedChallenges?.length || 0), 0).toString(), icon: Activity },
            { label: 'System Status', value: maintenanceMode ? 'MAINTENANCE' : 'ONLINE', icon: CheckCircle2, extra: maintenanceMode ? 'text-orange-400' : 'text-green-400' },
            { label: 'Live Challenges', value: challenges.length.toString(), icon: Globe },
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

        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="bg-card border border-border flex w-full md:w-auto overflow-x-auto justify-start p-1">
            <TabsTrigger value="challenges" className="data-[state=active]:bg-primary min-w-[120px]">
              <Globe className="h-4 w-4 mr-2" /> Challenges
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary min-w-[120px]">
              <Users className="h-4 w-4 mr-2" /> Participants
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-primary min-w-[120px]">
              <Settings2 className="h-4 w-4 mr-2" /> Event Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-headline font-bold">Challenge Inventory</h2>
              <Button className="neon-glow" onClick={handleOpenCreateChallenge}>
                <Plus className="mr-2 h-4 w-4" /> Add Challenge
              </Button>
            </div>
            
            <Card className="bg-card border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Challenge</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead className="text-right">Files</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {challenges.map((ch) => (
                      <TableRow key={ch.id} className="border-border">
                        <TableCell className="font-bold">{ch.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] uppercase border-primary/20">{ch.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-code">{ch.points}</TableCell>
                        <TableCell className="text-right">{ch.files?.length || 0}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEditChallenge(ch)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteChallenge(ch.id)}>
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
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-headline font-bold">Participant Database</h2>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, college, email..." 
                    className="pl-10 bg-card border-border"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
                <Button className="neon-glow whitespace-nowrap" onClick={handleOpenCreateUser}>
                  <UserPlus className="mr-2 h-4 w-4" /> Create User
                </Button>
              </div>
            </div>

            <Card className="bg-card border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Participant</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead className="text-right">Solves</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.uid} className="border-border">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarImage src={`https://picsum.photos/seed/${u.uid}/32/32`} />
                              <AvatarFallback>{u.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-bold">{u.name}</span>
                              <span className="text-[10px] text-muted-foreground uppercase">{u.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{u.college}</TableCell>
                        <TableCell className="text-right font-code">{u.solvedChallenges?.length || 0}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{u.score} PTS</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEditUser(u)}>
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteUser(u.uid)}>
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <h2 className="text-xl font-headline font-bold">Event Administration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" /> Global Controls
                  </CardTitle>
                  <CardDescription>Manage the overall state of the competition.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Submissions Active</Label>
                      <p className="text-sm text-muted-foreground">Allow participants to submit flags.</p>
                    </div>
                    <Switch 
                      checked={isLive} 
                      onCheckedChange={(val) => {
                        setIsLive(val);
                        toast({ title: val ? "Submissions Unlocked" : "Submissions Paused", variant: val ? "default" : "destructive" });
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Locks the entire site for emergency updates.</p>
                    </div>
                    <Switch 
                      checked={maintenanceMode} 
                      onCheckedChange={(val) => {
                        setMaintenanceMode(val);
                        toast({ title: val ? "Maintenance Enabled" : "Site Online", variant: val ? "destructive" : "default" });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-400" /> System Integrity
                  </CardTitle>
                  <CardDescription>Quick actions for session and data management.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-secondary" onClick={() => toast({ title: "Scores Recalculated" })}>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Recalculate Global Leaderboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-border hover:bg-secondary text-destructive hover:text-destructive" onClick={() => toast({ title: "All Sessions Cleared", variant: "destructive" })}>
                    <Lock className="mr-2 h-4 w-4" /> Force Logout All Participants
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Challenge Dialog */}
        <Dialog open={isChallengeOpen} onOpenChange={setIsChallengeOpen}>
          <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleChallengeSubmit}>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">
                  {challengeEditMode ? 'Update' : 'Deploy New'} <span className="text-primary">Challenge</span>
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Title</label>
                  <Input 
                    placeholder="Challenge name" 
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
                    onValueChange={(val) => setCurrentChallenge({...currentChallenge, category: val as any})}
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
                  <label className="text-right text-sm font-medium">Instance</label>
                  <Input 
                    placeholder="https://..." 
                    className="col-span-3 bg-background" 
                    value={currentChallenge.externalLink}
                    onChange={(e) => setCurrentChallenge({...currentChallenge, externalLink: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <FileArchive className="h-4 w-4" /> Challenge Files
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => setCurrentChallenge({ ...currentChallenge, files: [...(currentChallenge.files || []), { name: '', url: '' }] })}>
                      <Plus className="h-3 w-3 mr-1" /> Add File
                    </Button>
                  </div>
                  {(currentChallenge.files || []).map((file, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-secondary/20 p-2 rounded-md">
                      <div className="flex-1 space-y-2">
                        <Input 
                          placeholder="File name" 
                          className="h-8 text-xs bg-background"
                          value={file.name}
                          onChange={(e) => {
                            const files = [...(currentChallenge.files || [])];
                            files[idx].name = e.target.value;
                            setCurrentChallenge({ ...currentChallenge, files });
                          }}
                        />
                        <Input 
                          placeholder="File URL" 
                          className="h-8 text-xs bg-background"
                          value={file.url}
                          onChange={(e) => {
                            const files = [...(currentChallenge.files || [])];
                            files[idx].url = e.target.value;
                            setCurrentChallenge({ ...currentChallenge, files });
                          }}
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive" 
                        onClick={() => setCurrentChallenge({ ...currentChallenge, files: currentChallenge.files?.filter((_, i) => i !== idx) })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Description</label>
                  <Textarea 
                    className="col-span-3 bg-background min-h-[80px]" 
                    value={currentChallenge.description}
                    onChange={(e) => setCurrentChallenge({...currentChallenge, description: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="neon-glow w-full">
                  {challengeEditMode ? 'Save Changes' : 'Initialize Deployment'} 
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* User Management Dialog */}
        <Dialog open={isUserEditOpen} onOpenChange={setIsUserEditOpen}>
          <DialogContent className="sm:max-w-[425px] bg-card border-border">
            <form onSubmit={handleUserUpdate}>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl">
                  {userEditMode ? 'Modify' : 'Create'} <span className="text-primary">Participant</span>
                </DialogTitle>
                <DialogDescription>
                  {userEditMode ? 'Update account details and current score.' : 'Register a new participant for the competition.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Name</label>
                  <Input 
                    className="col-span-3 bg-background" 
                    placeholder="Operator Name"
                    value={selectedUser.name || ''}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Email</label>
                  <Input 
                    type="email"
                    placeholder="contact@vyugam.live"
                    className="col-span-3 bg-background" 
                    value={selectedUser.email || ''}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">College</label>
                  <Input 
                    placeholder="Institute Name"
                    className="col-span-3 bg-background" 
                    value={selectedUser.college || ''}
                    onChange={(e) => setSelectedUser({...selectedUser, college: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Role</label>
                  <Select 
                    value={selectedUser.role} 
                    onValueChange={(val) => setSelectedUser({...selectedUser, role: val as UserRole})}
                  >
                    <SelectTrigger className="col-span-3 bg-background">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="player">Player</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">Score</label>
                  <Input 
                    type="number"
                    className="col-span-3 bg-background" 
                    value={selectedUser.score || 0}
                    onChange={(e) => setSelectedUser({...selectedUser, score: parseInt(e.target.value) || 0})}
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="neon-glow w-full">
                  {userEditMode ? 'Commit Changes' : 'Finalize Registration'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}