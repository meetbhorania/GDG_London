
export enum RoastLevel {
  Mild = "MILD MODE (😊)",
  Medium = "MEDIUM MODE (😬)",
  Savage = "SAVAGE MODE (💀)",
}

export interface Score {
  overall: number;
  headline: number;
  about: number;
  originality: number;
}

export interface Badge {
  emoji: string;
  title: string;
  description: string;
}

export interface RoastPoint {
  category: string;
  quote: string;
  reality: string;
  severity: number;
}

export interface Buzzword {
  word: string;
  usage_percentage: number;
  comment: string;
}

export interface LinkedInTwins {
  estimated_count: number;
  roast_comment: string;
}

export interface Improvement {
  improved_version: string;
  why_it_works: string;
}

export interface Improvements {
  headline: Improvement;
  about: Improvement;
  key_changes: string[];
}

export interface ImprovementPotential {
  current_score: number;
  potential_score: number;
  message: string;
}

export interface RoastData {
  first_impression: string;
  scores: Score;
  score_comment: string;
  badges: Badge[];
  roast_points: RoastPoint[];
  buzzwords_found: Buzzword[];
  linkedin_twins: LinkedInTwins;
  improvements: Improvements;
  improvement_potential: ImprovementPotential;
  final_words: string;
}
