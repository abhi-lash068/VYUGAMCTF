'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Trophy, LayoutDashboard, Terminal, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Challenges', href: '/challenges', icon: Terminal },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
];

export function Navbar() {
  const pathname = usePathname();
  // Mock user as admin for prototype demonstration purposes
  const user = { name: 'Player One', role: 'admin' }; 

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary neon-glow group-hover:scale-110 transition-transform">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline text-xl font-bold tracking-tight text-foreground">
              VYUGAM<span className="text-primary">CTF</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href 
                    ? "bg-secondary text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs text-muted-foreground">Score</span>
            <span className="text-sm font-bold text-primary font-code">1,250 PTS</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-border/50 hover:border-primary/50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/p1/32/32" alt="Avatar" />
                  <AvatarFallback>P1</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
              <DropdownMenuLabel className="font-headline">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              {user.role === 'admin' && (
                <Link href="/admin">
                  <DropdownMenuItem className="cursor-pointer text-primary">
                    <Settings className="mr-2 h-4 w-4" /> Admin Panel
                  </DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-destructive cursor-pointer">
                <Link href="/auth/login" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
