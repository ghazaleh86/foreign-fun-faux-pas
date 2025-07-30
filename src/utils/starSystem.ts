export type SpeedBadge = "fast" | "normal" | "careful";
export type StarRating = 1 | 2 | 3;

export interface StageResult {
  score: number;
  totalQuestions: number;
  stars: StarRating;
  speedBadge: SpeedBadge;
  averageTime: number;
}

/**
 * Calculate star rating based on performance percentage
 */
export function calculateStars(score: number, total: number): StarRating {
  const percentage = (score / total) * 100;
  
  if (percentage >= 90) return 3; // ⭐⭐⭐
  if (percentage >= 70) return 2; // ⭐⭐
  return 1; // ⭐
}

/**
 * Calculate speed badge based on average answer time
 */
export function calculateSpeedBadge(averageTimeSeconds: number): SpeedBadge {
  if (averageTimeSeconds <= 3) return "fast";     // ⚡
  if (averageTimeSeconds <= 6) return "normal";   // 📚
  return "careful";                               // 🎯
}

/**
 * Get display info for star rating
 */
export function getStarDisplay(stars: StarRating): { text: string; emoji: string } {
  switch (stars) {
    case 3: return { text: "Excellent!", emoji: "⭐⭐⭐" };
    case 2: return { text: "Great job!", emoji: "⭐⭐" };
    case 1: return { text: "Good effort!", emoji: "⭐" };
  }
}

/**
 * Get display info for speed badge
 */
export function getSpeedBadgeDisplay(badge: SpeedBadge): { text: string; emoji: string; color: string } {
  switch (badge) {
    case "fast": return { text: "Lightning Fast", emoji: "⚡", color: "text-yellow-600" };
    case "normal": return { text: "Steady Pace", emoji: "📚", color: "text-blue-600" };
    case "careful": return { text: "Thoughtful", emoji: "🎯", color: "text-green-600" };
  }
}

/**
 * Calculate stage result with stars and speed badge
 */
export function calculateStageResult(
  score: number, 
  totalQuestions: number, 
  totalTimeSeconds: number
): StageResult {
  const averageTime = totalTimeSeconds / totalQuestions;
  
  return {
    score,
    totalQuestions,
    stars: calculateStars(score, totalQuestions),
    speedBadge: calculateSpeedBadge(averageTime),
    averageTime
  };
}