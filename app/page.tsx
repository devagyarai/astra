"use client";

import { PageContainer } from "@/components/layout/page-container";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.22 } },
};

export default function Home() {
  return (
    <PageContainer className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="flex flex-col items-center text-center space-y-8 max-w-3xl"
      >
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm font-medium text-secondary-foreground backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Astra Style v1.0 is now live</span>
        </motion.div>

        <motion.h1 
          variants={FADE_UP_ANIMATION_VARIANTS} 
          className="text-display-xl"
        >
          Decision Intelligence <br />
          <span className="text-muted-foreground font-normal">Platform</span>
        </motion.h1>

        <motion.p 
          variants={FADE_UP_ANIMATION_VARIANTS} 
          className="text-body text-lg md:text-xl max-w-2xl"
        >
          A premium, enterprise-grade operating system for your data. Experience intelligent automation with uncompromising elegance.
        </motion.p>

        <motion.div 
          variants={FADE_UP_ANIMATION_VARIANTS} 
          className="flex items-center gap-4 pt-4"
        >
          <Button size="lg" className="h-12 px-8 rounded-full text-base font-medium shadow-[0_0_20px_-5px_rgba(91,108,255,0.4)] transition-all hover:shadow-[0_0_25px_-5px_rgba(91,108,255,0.5)] active:scale-[0.98]">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-medium bg-transparent border-border hover:bg-secondary active:scale-[0.98]">
            Book a Demo
          </Button>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
