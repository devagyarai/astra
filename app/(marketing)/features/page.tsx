import { Zap, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-12">
          <div className="h-16 w-16 rounded-2xl bg-warning/10 flex items-center justify-center">
            <Zap className="h-8 w-8 text-warning" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold">Features</h1>
            <p className="text-lg text-muted-foreground mt-2">Everything you need for perfect decision-making.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Real-time Heuristics", desc: "Instantly evaluates your inputs against best practices." },
            { title: "Local-First Speed", desc: "No loading spinners. Everything saves instantly." },
            { title: "Confidence Scoring", desc: "Quantify how complete your decision process is." },
            { title: "Guided Workflows", desc: "Breaks complex problems into manageable steps." },
            { title: "Offline Support", desc: "Work without an internet connection." },
            { title: "Export & Backup", desc: "Full data portability. You own your data." }
          ].map((feat, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <Link href="/dashboard">
              <Button size="lg" className="rounded-full">Try Astra Free <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
