"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BrainCircuit, ShieldCheck, Zap, Database, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
};

const STAGGER = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={STAGGER}
          className="flex flex-col items-center space-y-8 max-w-4xl"
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Introducing Astra Intelligence v1.0</span>
          </motion.div>

          <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-display-xl tracking-tight">
            Think clearly. <br />
            <span className="text-muted-foreground font-normal">Decide intelligently.</span>
          </motion.h1>

          <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-body text-lg md:text-xl max-w-2xl text-muted-foreground">
            Astra is a premium decision intelligence platform that evaluates your reasoning in real-time. Say goodbye to intuition bias and hello to deterministic clarity.
          </motion.p>

          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button render={<Link href="/dashboard" />} size="lg" className="h-12 px-8 rounded-full text-base font-medium shadow-[0_0_20px_-5px_rgba(91,108,255,0.4)] transition-all hover:shadow-[0_0_25px_-5px_rgba(91,108,255,0.5)] active:scale-[0.98]">
              Open Workspace <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button render={<Link href="/pricing" />} size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-medium bg-transparent border-border hover:bg-secondary active:scale-[0.98]">
              Book a Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* PRODUCT PREVIEW */}
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
            </div>
          </div>
          <div className="aspect-[16/9] w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
        </motion.div>
      </section>

      {/* WHY ASTRA */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Astra?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Traditional note-taking apps just store text. Astra analyzes it.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BrainCircuit, title: "Deterministic Analysis", desc: "No hallucinations. Pure heuristic algorithms analyze your decision completeness in real-time." },
            { icon: Zap, title: "Frictionless Workflow", desc: "A linear canvas designed to eliminate distractions and keep you in a state of flow." },
            { icon: Database, title: "Local-First Architecture", desc: "Your data never leaves your browser until you choose to sync. Uncompromising privacy." }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 transition-colors"
            >
              <feat.icon className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DECISION INTELLIGENCE FEATURES */}
      <section className="py-24 bg-secondary/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Decision Intelligence</h2>
              <p className="text-lg text-muted-foreground mb-8">
                As you type, Astra&apos;s intelligence engine evaluates your reasoning. It highlights strengths, warns you of biases, and suggests the next best action.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time Confidence Scoring",
                  "Automated Risk Detection",
                  "Single-option bias warnings",
                  "Actionable recommendations",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                  <h4 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">Confidence</h4>
                  <p className="text-4xl font-bold text-foreground">85%</p>
                </div>
                <div className="p-6 rounded-2xl bg-success/10 border border-success/20 shadow-sm">
                  <h4 className="text-sm font-semibold text-success mb-1">Strength</h4>
                  <p className="text-sm text-foreground">Evidence-backed decision</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-warning/10 border border-warning/20 shadow-sm">
                  <h4 className="text-sm font-semibold text-warning mb-1">Risk Detected</h4>
                  <p className="text-sm text-foreground">Single-option bias</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                  <h4 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">Status</h4>
                  <p className="text-lg font-bold text-primary">In Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {[
            { num: "01", title: "Define the Goal", desc: "Start with a clear, measurable objective." },
            { num: "02", title: "Build the Case", desc: "Add context, constraints, options, and evidence." },
            { num: "03", title: "Review Insights", desc: "Let Astra calculate your confidence score." }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center max-w-xs">
              <div className="text-5xl font-bold font-heading text-primary/20 mb-6">{step.num}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENTERPRISE SECURITY */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <ShieldCheck className="h-16 w-16 mx-auto opacity-90" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Enterprise Security</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Astra operates entirely locally in your browser by default. No databases. No telemetry. No APIs. Your strategic decisions are your intellectual property. 
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <span className="flex items-center gap-2 bg-primary-foreground/10 px-4 py-2 rounded-full text-sm font-medium">
              <Lock className="h-4 w-4" /> End-to-End Local
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-8 text-left">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Does Astra use AI or LLMs to make decisions?</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              No. Astra uses deterministic heuristic algorithms to evaluate the completeness of your decision framework. It will never make a decision for you. It ensures you have done the required thinking.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Where is my data stored?</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Everything is stored locally on your device within your browser&apos;s Local Storage. We have no access to your data.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Is Astra free to use?</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Astra v1.0 is currently completely free and open-source for personal use. Enterprise synchronization features will be available in the future.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 bg-background py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" /> Astra Decision Intelligence Platform
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
