import { Book, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Book className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold">Documentation</h1>
            <p className="text-lg text-muted-foreground mt-2">Learn how to use Astra&apos;s decision intelligence framework.</p>
          </div>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-border/50 pb-2">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed">
              Astra is designed to help you make better decisions by forcing you to structure your thinking. Start by creating a new workspace from the dashboard.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-border/50 pb-2">The Decision Canvas</h2>
            <p className="text-muted-foreground leading-relaxed">
              The canvas is divided into key areas: Goal, Context, Constraints, Options, Evidence, Analysis, Recommendation, and Notes. 
              Fill them out sequentially or jump around. The intelligence engine will score your progress in real-time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-border/50 pb-2">Data Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              All your decisions are stored locally in your browser&apos;s IndexedDB/LocalStorage. Nothing is sent to our servers.
            </p>
          </section>
          
          <div className="pt-8 flex justify-center border-t border-border/50">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full">Open Dashboard <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
