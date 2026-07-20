import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto w-full text-center">
        <Link href="/" className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Home
        </Link>
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground">Start making better decisions today. No credit card required.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          
          <div className="p-8 rounded-3xl border border-border/50 bg-card/40 flex flex-col relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-2">Personal</h3>
            <p className="text-muted-foreground mb-6">Perfect for individual decision-makers.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-muted-foreground">/ forever</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited decisions', 'Local storage', 'Confidence scoring', 'Data export'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-success" /> <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="w-full">
              <Button className="w-full h-12 rounded-full text-base">Get Started</Button>
            </Link>
          </div>

          <div className="p-8 rounded-3xl border border-primary/50 bg-primary/5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              Coming Soon
            </div>
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-muted-foreground mb-6">For teams that need centralized knowledge.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">$12</span>
              <span className="text-muted-foreground">/ mo per user</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 opacity-70">
              {['Everything in Personal', 'Cloud sync & backup', 'Team sharing', 'AI-assisted analysis', 'Custom templates'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary" /> <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full h-12 rounded-full text-base" disabled>Join Waitlist</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
