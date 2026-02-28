'use client';

import Link from 'next/link';
import { Shield, Terminal, ArrowRight, Lock, User, School, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent blur-[100px]" />
      </div>

      <Card className="w-full max-w-md bg-card border-border/50 relative z-10 neon-border">
        <CardHeader className="text-center space-y-1">
          <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold">New <span className="text-primary">Deployment</span></CardTitle>
          <CardDescription>Join the elite ranks of the VYUGAM Security Symposium.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Handle (Codename)" className="pl-10 bg-background" required />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Email Address" className="pl-10 bg-background" required />
              </div>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="University / College" className="pl-10 bg-background" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="Passcode" className="pl-10 bg-background" required />
              </div>
            </div>
            <Button type="submit" className="w-full neon-glow font-headline mt-2">
              Create Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Already registered? <Link href="/auth/login" className="text-primary hover:underline">Login to Terminal</Link>
          </div>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground text-center">
            ← Return to Surface
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
