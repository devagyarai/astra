export const ANALYSIS_PROMPTS = {
  BIAS: `Analyze the current decision context. Identify any cognitive biases (e.g., Sunk Cost, Confirmation Bias, Anchoring, Availability Heuristic) present in the user's framing, evidence, or option selection. Be highly specific and cite exact phrases from the decision where the bias is evident.`,
  
  RISK: `Analyze the current decision options. Identify 3 critical, non-obvious failure modes or second-order risks that the user has not documented. For each risk, explain the impact and suggest a mitigation strategy.`,
  
  TRADEOFF: `Create a comprehensive Tradeoff Matrix for the options presented. Identify 3-4 key dimensions (e.g., Cost, Time-to-Market, Maintenance, Risk) and compare each option. Present this as a Markdown table. Conclude with a brief summary of the hardest tradeoff the user must make.`,
  
  DEVILS_ADVOCATE: `Identify the option that seems to be the user's favorite or most likely path. Aggressively attack it. List the top 3 reasons why it will fail catastrophically. Be brutal but logical. Do not offer a softer alternative; force the user to defend their choice.`,
  
  SUMMARY: `Synthesize the entire decision into a 1-page Executive Summary. Include the core dilemma, the leading options, the biggest risk, and a definitive recommendation based on the evidence provided.`
};
