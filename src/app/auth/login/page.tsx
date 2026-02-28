'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, Lock, User, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState('');

  const handleLogin = (e: React.FormEvent, type: 'standard' | 'admin' = 'standard') => {
    if (e) e.preventDefault();
    
    // Simulate login and store role in localStorage for the prototype
    const role = (type === 'admin' || identifier.toLowerCase() === 'admin') ? 'admin' : 'player';
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', role === 'admin' ? 'Lead Admin' : (identifier || 'CyberWiz'));

    toast({
      title: "Session Initialized",
      description: `Access granted as ${role.toUpperCase()}. Redirecting to terminal...`,
    });

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-4 relative z-10">
        <Card className="bg-card border-border/50 neon-border">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-headline font-bold">Access <span className="text-primary">Terminal</span></CardTitle>
            <CardDescription>Enter your credentials to breach the perimeter.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Username or Email" 
                    className="pl-10 bg-background" 
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="Passcode" className="pl-10 bg-background" required />
                </div>
              </div>
              <Button type="submit" className="w-full neon-glow font-headline">
                Initialize Session <Terminal className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              New operator? <Link href="/auth/register" className="text-primary hover:underline">Register for deployment</Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-primary/5 border-primary/20 border-dashed">
          <CardContent className="p-4 flex flex-col items-center gap-3">
            <p className="text-xs text-center text-muted-foreground uppercase tracking-widest font-bold">Prototype Shortcuts</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-primary/30 hover:bg-primary/10 group"
              onClick={(e) => handleLogin(e, 'admin')}
            >
              <Key className="mr-2 h-3 w-3 text-primary group-hover:animate-pulse" />
              Login as Admin (Superuser)
            </Button>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Return to Surface
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
