export const GENERATOR_PROMPTS = {
  OPTIONS: `Generate 3 novel, distinct options for this decision that are MECE (Mutually Exclusive, Collectively Exhaustive). Do not repeat options that already exist in the context. For each option, provide a brief title and a 1-sentence description.`,
  
  CONSTRAINTS: `Identify 3 critical constraints (e.g., budget, timeline, technical, regulatory, resource) that the user has likely missed but are essential for this type of decision.`,
  
  QUESTIONS: `Generate 3 Socratic, piercing questions that expose ambiguities in the current Goal or Context. Do not answer the questions.`,
  
  IMPROVE_GOAL: `Rewrite the current goal to be more specific, measurable, and action-oriented. Provide exactly one improved version.`
};
