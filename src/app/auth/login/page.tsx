'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      // In this prototype, 'admin' is the secret keyword for administrative access
      const isAdmin = identifier.toLowerCase() === 'admin';
      const role = isAdmin ? 'admin' : 'player';
      
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', isAdmin ? 'System Administrator' : (identifier || 'Participant'));

      toast({
        title: "Session Initialized",
        description: `Access granted as ${role.toUpperCase()}. Redirecting to terminal...`,
      });

      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
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
            <form onSubmit={handleLogin} className="space-y-4">
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
                  <Input 
                    type="password" 
                    placeholder="Passcode" 
                    className="pl-10 bg-background" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full neon-glow font-headline" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Initialize Session'} 
                {!isLoading && <Terminal className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              New operator? <Link href="/auth/register" className="text-primary hover:underline">Register for deployment</Link>
            </div>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Return to Surface
            </Link>
          </CardFooter>
        </Card>

        {/* Informative notice for players */}
        <div className="text-center px-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            Secure Connection: AES-256 Bit Encrypted Session
          </p>
        </div>
      </div>
    </div>
  );
}
