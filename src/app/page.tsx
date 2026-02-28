import Link from 'next/link';
import { Shield, Terminal, ArrowRight, Lock, Trophy, Zap, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TerminalEffect } from '@/components/ctf/TerminalEffect';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 relative z-10 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary neon-glow mb-8 animate-pulse-glow">
          <Shield className="h-10 w-10 text-primary-foreground" />
        </div>
        
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-primary/50">
          VYUGAM CTF
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mb-12 font-medium">
          The ultimate inter-college cybersecurity battleground. Decode. Exploit. Conquer. Are you ready to breach the perimeter?
        </p>

        <div className="flex flex-col items-center w-full max-w-3xl mb-16 space-y-12">
          <div className="w-full">
            <TerminalEffect />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button asChild size="lg" className="h-14 px-8 neon-glow bg-primary hover:bg-primary/90 text-lg flex-1">
              <Link href="/auth/register">
                Join the Battle <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 border-border hover:bg-secondary text-lg flex-1">
              <Link href="/auth/login">Player Login</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
          {[
            { icon: Lock, title: "Real-world Labs", desc: "Edge-case vulnerabilities and real-world attack vectors across Web, Crypto, and OSINT." },
            { icon: Trophy, title: "Grand Prizes", desc: "Top hackers secure internship opportunities and exclusive hardware rewards." },
            { icon: Zap, title: "AI-Powered Hints", desc: "Stuck? Our neural hint generator provides progressive guidance without spoiling the solution." },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all">
              <feature.icon className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground relative z-10 font-code">
        <p>© {new Date().getFullYear()} VYUGAM SECURITY SYMPOSIUM. ALL RIGHTS RESERVED.</p>
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-6">
            <Link href="#" className="hover:text-primary">Rules</Link>
            <Link href="#" className="hover:text-primary">FAQ</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
          <Link 
            href="/admin/login" 
            className="flex items-center gap-1.5 px-3 py-1 rounded border border-border/50 text-[10px] uppercase tracking-wider hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all group"
          >
            <ShieldAlert className="h-3 w-3 opacity-50 group-hover:opacity-100" /> Admin Terminal Access
          </Link>
        </div>
      </footer>
    </div>
  );
}
