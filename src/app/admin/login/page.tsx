'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Terminal, Lock, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [adminKey, setAdminKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated Admin Check
    setTimeout(() => {
      // Simple logic: 'vyugam-root' is the secret key for this prototype
      if (adminKey === 'vyugam-root') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', 'System Administrator');

        toast({
          title: "Root Access Granted",
          description: "Welcome back, Admin. Establishing secure connection to Command Center...",
        });

        router.push('/admin');
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid Admin Key. Intrusion attempt logged.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
      
      <div className="w-full max-w-md space-y-4 relative z-10">
        <Card className="bg-card border-destructive/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto h-12 w-12 rounded-lg bg-destructive flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-headline font-bold text-foreground">Admin <span className="text-destructive">Terminal</span></CardTitle>
            <CardDescription>Restricted Area. Authorized personal only.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Enter Admin Secret Key" 
                    className="pl-10 bg-background border-border focus-visible:ring-destructive" 
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <Button type="submit" variant="destructive" className="w-full font-headline" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Authenticate Root'} 
                {!isLoading && <Terminal className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Return to Main Surface
            </Link>
          </CardFooter>
        </Card>
        
        <div className="text-center">
          <p className="text-[10px] text-destructive uppercase tracking-[0.2em] font-mono opacity-50">
            Unauthorized access is strictly prohibited and monitored
          </p>
        </div>
      </div>
    </div>
  );
}
