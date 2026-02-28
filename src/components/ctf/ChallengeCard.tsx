'use client';

import { useState } from 'react';
import { Terminal, Lock, Unlock, ExternalLink, Download, Send, Zap, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { submitFlag, requestHint } from '@/app/actions/ctf-actions';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  challenge: any;
  isSolved?: boolean;
}

export function ChallengeCard({ challenge, isSolved = false }: ChallengeCardProps) {
  const [flagInput, setFlagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const { toast } = useToast();

  const handleFlagSubmit = async () => {
    if (!flagInput) return;
    setIsSubmitting(true);
    try {
      const result = await submitFlag(challenge.id, flagInput, 'u1');
      if (result.success) {
        toast({ title: 'Success!', description: result.message });
        setFlagInput('');
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHintRequest = async () => {
    setIsHintLoading(true);
    try {
      const result = await requestHint(challenge.id, challenge.description);
      if (result.success) {
        setHint(result.hint || 'No hint available.');
      }
    } finally {
      setIsHintLoading(false);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Web': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Crypto': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Forensics': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'AI Security': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cn(
          "cyber-card cursor-pointer group relative overflow-hidden",
          isSolved && "opacity-75 grayscale-[0.5]"
        )}>
          {isSolved && (
            <div className="absolute top-2 right-2 z-10">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/50 gap-1">
                <Unlock className="h-3 w-3" /> Solved
              </Badge>
            </div>
          )}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={cn("mb-2", getCategoryColor(challenge.category))}>
                {challenge.category}
              </Badge>
              <span className="text-xl font-bold text-primary font-code">{challenge.points}pts</span>
            </div>
            <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
              {challenge.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {challenge.description}
            </p>
          </CardContent>
          <CardFooter className="pt-0 flex justify-between items-center text-xs text-muted-foreground font-code border-t border-border/20 mt-4 h-12">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-primary" />
              {challenge.solvesCount || 0} Solves
            </div>
            <div className="flex items-center gap-1 group-hover:text-primary transition-colors uppercase tracking-wider">
              {isSolved ? 'Completed' : 'Deploying...'} <Terminal className="h-3 w-3" />
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={getCategoryColor(challenge.category)}>
              {challenge.category}
            </Badge>
            <span className="text-sm text-muted-foreground font-code">{challenge.points} Points</span>
          </div>
          <DialogTitle className="text-2xl font-headline font-bold text-foreground">
            {challenge.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base mt-4 leading-relaxed whitespace-pre-wrap">
            {challenge.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-wrap gap-2">
            {challenge.externalLink && (
              <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:bg-primary/10" asChild>
                <a href={challenge.externalLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" /> Open Instance
                </a>
              </Button>
            )}
            {challenge.fileUrl && (
              <Button variant="outline" size="sm" className="gap-2 border-accent/30 hover:bg-accent/10" asChild>
                <a href={challenge.fileUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" /> Download Files
                </a>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 text-primary hover:text-primary/80 hover:bg-primary/5" 
              onClick={handleHintRequest}
              disabled={isHintLoading || !!hint}
            >
              <HelpCircle className="h-4 w-4" /> 
              {isHintLoading ? 'Decrypting Hint...' : hint ? 'Hint Revealed' : 'AI Hint (-50pts)'}
            </Button>
          </div>

          {hint && (
            <div className="p-4 rounded-md bg-primary/5 border border-primary/20 text-sm animate-in fade-in slide-in-from-top-2">
              <p className="font-bold text-primary mb-1 flex items-center gap-2 italic">
                <Terminal className="h-3 w-3" /> SECURE HINT TRANSMISSION
              </p>
              {hint}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-code mb-1 px-1">
              <span className="text-muted-foreground uppercase">Submit Flag</span>
              <span className="text-primary italic">Format: VYUGAM{'{'}...{'}'}</span>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter flag here..."
                className="bg-background border-border focus-visible:ring-primary font-code"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFlagSubmit()}
                disabled={isSolved || isSubmitting}
              />
              <Button 
                onClick={handleFlagSubmit} 
                className="neon-glow bg-primary" 
                disabled={isSolved || isSubmitting || !flagInput}
              >
                {isSubmitting ? 'Authenticating...' : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="text-xs text-muted-foreground font-code text-center sm:text-left pt-4 border-t border-border/20">
          {isSolved ? (
            <span className="text-green-400 flex items-center gap-1 font-bold">
              <Unlock className="h-3 w-3" /> CHALLENGE ALREADY SOLVED
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3 opacity-50" /> CHALLENGE LOCKED - AWAITING FLAG
            </span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
