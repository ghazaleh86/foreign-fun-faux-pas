
/**
 * Validate user_scoring inputs for secure submission.
 * Returns an error string if invalid, or null if valid.
 */
export function validateScoreSubmission({ score, correct_count, total_questions, username }: {
  score: number;
  correct_count: number;
  total_questions: number;
  username: string;
}): string | null {
  if (typeof score !== "number" || score < 0 || score > 1000) return "Invalid score.";
  if (typeof correct_count !== "number" || correct_count < 0 || correct_count > total_questions) return "Invalid correct count.";
  if (typeof total_questions !== "number" || total_questions <= 0 || total_questions > 100) return "Invalid total questions.";
  if (typeof username !== "string" || username.length === 0 || username.length > 40) return "Invalid username.";
  return null;
}
