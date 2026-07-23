"use client";

import { motion, Variants } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles, BrainCircuit, ShieldCheck, Zap, Database, Lock, CheckCircle2, Target, Plus } from "lucide-react";
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
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden flex items-center justify-center px-4 md:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[40%] rounded-full bg-gradient-to-tr from-[#6D5DF6]/5 to-[#FFC857]/5 blur-[80px] -z-10 animate-pulse duration-[6000ms]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-[1440px] mx-auto w-full">
          {/* Left Column: Heading & Value Proposition */}
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={STAGGER}
            className="lg:col-span-5 flex flex-col space-y-6 text-left"
          >
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary w-fit backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Introducing Astra Intelligence v1.1</span>
            </motion.div>

            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] font-heading">
              Make <span className="text-[#6D5DF6] dark:text-[#8E82F8]">Better</span> <br />
              Decisions.
            </motion.h1>

            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Astra is your AI-powered decision intelligence platform. Structure complex decisions, analyze every trade-off, and make choices with clarity and confidence.
            </motion.p>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto h-12 px-8 rounded-lg text-sm font-semibold bg-[#6D5DF6] hover:bg-[#5b4ce3] text-white shadow-[0_0_20px_-5px_rgba(109,93,246,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
              >
                Open Workspace <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto h-12 px-8 rounded-lg text-sm font-semibold bg-transparent border border-border hover:bg-secondary/40 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center"
              >
                Live Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 w-full hidden lg:block"
          >
            <div className="relative rounded-xl border border-border/60 bg-background/60 dark:bg-card/40 backdrop-blur-xl shadow-3xl overflow-hidden flex flex-col h-[460px]">
              {/* Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="text-[11px] font-medium text-muted-foreground/60 select-none">Astra Workspace — Dashboard</div>
                <div className="w-12" />
              </div>
              
              {/* App Layout */}
              <div className="flex flex-1 overflow-hidden text-left">
                {/* Mock Sidebar */}
                <div className="w-48 border-r border-border/40 p-4 bg-muted/10 flex flex-col gap-4 text-xs font-medium shrink-0">
                  <div className="flex items-center gap-2 font-heading font-semibold text-foreground tracking-wider uppercase">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-b from-white to-[#6D5DF6] flex items-center justify-center text-[10px] font-black text-white shadow-xs">✦</div>
                    <span>ASTRA</span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground/60 mb-1">Menu</span>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary/80 text-foreground"><div className="w-3.5 h-3.5 rounded bg-primary/20 shrink-0" /> Dashboard</div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground/80 hover:text-foreground"><div className="w-3.5 h-3.5 rounded bg-muted shrink-0" /> Timeline</div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground/80 hover:text-foreground"><div className="w-3.5 h-3.5 rounded bg-muted shrink-0" /> Archive</div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground/60 mb-1">Workspace</span>
                    <div className="text-[11px] text-muted-foreground/60 px-2 italic">No decisions found.</div>
                  </div>
                </div>
                
                {/* Mock Main Pane */}
                <div className="flex-1 p-6 bg-card/10 overflow-y-auto flex flex-col gap-6">
                  <div className="text-base font-semibold font-heading tracking-tight text-foreground">Dashboard</div>
                  
                  {/* Grid of Stats */}
                  <div className="grid grid-cols-4 gap-3 shrink-0">
                    {[
                      { label: "Total Decisions", value: "0" },
                      { label: "Active Decisions", value: "0" },
                      { label: "Avg. Completion", value: "0%" },
                      { label: "Avg. Confidence", value: "0%" }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-3 border border-border/40 rounded-lg bg-background/50 flex flex-col gap-1">
                        <span className="text-[9px] font-medium text-muted-foreground truncate">{stat.label}</span>
                        <span className="text-base font-bold font-heading">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Dashboard Bottom Section */}
                  <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
                    {/* Recent Decisions Card (2/3) */}
                    <div className="col-span-2 border border-border/40 rounded-lg bg-background/50 p-4 flex flex-col items-center justify-center text-center">
                      <div className="relative flex items-center justify-center mb-2">
                        <div className="absolute w-12 h-12 rounded-full border border-primary/20 animate-ping opacity-25" />
                        <div className="absolute w-8 h-8 rounded-full border border-primary/30" />
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <Target className="h-3 w-3 text-primary/60" />
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-foreground mb-0.5">No Decisions Yet</span>
                      <span className="text-[10px] text-muted-foreground leading-normal max-w-[200px] mb-3">
                        Start structuring your thoughts with Astra.
                      </span>
                      <div className="px-3 py-1.5 text-[10px] font-semibold text-white bg-[#6D5DF6] rounded-md shadow-xs flex items-center gap-1 select-none">
                        <Plus className="h-3 w-3" /> Create New Decision
                      </div>
                    </div>
                    
                    {/* Quick Actions (1/3) */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <span className="text-[9px] uppercase font-semibold tracking-wider text-muted-foreground/60 mb-0.5">Quick Actions</span>
                      <div className="p-2.5 border border-border/40 rounded-lg bg-[#6D5DF6]/5 flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#6D5DF6]/20 flex items-center justify-center text-[#6D5DF6] text-[10px] font-bold">+</div>
                        <div className="flex flex-col"><span className="text-[10px] font-semibold text-foreground">New Decision</span><span className="text-[8px] text-muted-foreground">Start workspace</span></div>
                      </div>
                      <div className="p-2.5 border border-border/40 rounded-lg bg-background/40 flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-foreground text-[10px] font-bold">◷</div>
                        <div className="flex flex-col"><span className="text-[10px] font-semibold text-foreground">Timeline</span><span className="text-[8px] text-muted-foreground">Browse history</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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
      <section className="py-24 px-4 max-w-7xl mx-auto text-center border-t border-border/40">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">How Astra Works</h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto mb-16">
          Three simple steps to make better decisions with AI intelligence.
        </p>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            { num: "01", title: "Structure", desc: "Break down your decision with goals, context, constraints, and options." },
            { num: "02", title: "Analyze", desc: "Astra analyzes trade-offs, risks, biases, and potential outcomes." },
            { num: "03", title: "Decide", desc: "Get AI-powered recommendations and make confident, informed decisions." }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 transition-all hover:scale-[1.02] duration-300">
              <div className="text-4xl font-bold font-heading text-primary/30 mb-4">{step.num}</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
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
