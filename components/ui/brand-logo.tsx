"use client";

import * as React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function BrandIcon({ className, ...props }: BrandIconProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const starGradientId = `inline_starGradient_${uniqueId}`;
  const starHorizGradientId = `inline_starHorizGradient_${uniqueId}`;
  const coreGlowId = `inline_coreGlow_${uniqueId}`;
  const horizonGradientId = `inline_horizonGradient_${uniqueId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={cn("select-none fill-none", className)}
      {...props}
    >
      <defs>
        <linearGradient id={starGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFC857" />
          <stop offset="65%" stopColor="#6D5DF6" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>

        <linearGradient id={starHorizGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6D5DF6" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#6D5DF6" stopOpacity="0.15" />
        </linearGradient>

        <radialGradient id={coreGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="25%" stopColor="#FFC857" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#6D5DF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6D5DF6" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={horizonGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6D5DF6" stopOpacity="0.1" />
          <stop offset="20%" stopColor="#6D5DF6" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#FFC857" stopOpacity="1" />
          <stop offset="80%" stopColor="#6D5DF6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6D5DF6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <g id={`inline_flagship_mark_${uniqueId}`}>
        <circle cx="250" cy="240" r="82.5" fill={`url(#${coreGlowId})`} opacity="0.95" />
        
        <path 
          d="M 46.5,374.2 Q 250,290.6 453.5,374.2 Q 250,309.3 46.5,374.2 Z" 
          fill={`url(#${horizonGradientId})`} 
        />

        <path 
          d="M 181.8,171.8 Q 250,240 241.75,231.75 Q 250,240 181.8,171.8 Z
             M 318.2,171.8 Q 250,240 258.25,231.75 Q 250,240 318.2,171.8 Z
             M 181.8,308.2 Q 250,240 241.75,248.25 Q 250,240 181.8,308.2 Z
             M 318.2,308.2 Q 250,240 258.25,248.25 Q 250,240 318.2,308.2 Z"
          fill={`url(#${starGradientId})`} 
          opacity="0.75" 
        />

        <path 
          d="M 109.2,240 Q 250,225.15 250,240 Q 250,254.85 390.8,240 Z" 
          fill={`url(#${starGradientId})`} 
        />

        <path 
          d="M 250,77.2 Q 231.85,240 250,240 Q 268.15,240 250,77.2 Z
             M 250,385.2 Q 231.85,240 250,240 Q 268.15,240 250,385.2 Z" 
          fill={`url(#${starGradientId})`} 
        />
        
        <polygon 
          points="250,225.7 264.3,240 250,254.3 235.7,240" 
          fill="#FFFFFF" 
          opacity="0.98" 
        />
      </g>
    </svg>
  );
}

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <BrandIcon className="h-6 w-6" />
      <span className="font-heading text-lg font-bold tracking-widest uppercase text-foreground">
        ASTRA
      </span>
    </div>
  );
}
