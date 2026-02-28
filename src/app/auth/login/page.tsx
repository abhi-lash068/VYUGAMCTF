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
    
    // Participant Login Logic
    setTimeout(() => {
      const isSecretAdmin = identifier.toLowerCase() === 'admin';
      localStorage.setItem('userRole', isSecretAdmin ? 'admin' : 'player');
      localStorage.setItem('userName', identifier || 'Participant');

      toast({
        title: "Session Initialized",
        description: `Welcome back, ${isSecretAdmin ? 'Admin' : 'Operator'}. Redirecting...`,
      });

      router.push(isSecretAdmin ? '/admin' : '/dashboard');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary/50 blur-[100px]" />
      </div>

      <div className="w-full max-w-md space-y-4 relative z-10">
        <Card className="bg-card border-border/50 neon-border">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-headline font-bold text-foreground">Participant <span className="text-primary">Login</span></CardTitle>
            <CardDescription>Enter your codename to access the terminal.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Username / Codename" 
                    className="pl-10 bg-background border-border focus-visible:ring-primary" 
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
                    className="pl-10 bg-background border-border focus-visible:ring-primary" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full neon-glow font-headline" disabled={isLoading}>
                {isLoading ? 'Decrypting...' : 'Initialize Session'} 
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
      </div>
    </div>
  );
}
