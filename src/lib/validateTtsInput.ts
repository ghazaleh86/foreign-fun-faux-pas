
export function validateTtsTextInput(text: string) {
  if (typeof text !== "string" || text.trim().length === 0) return "Text must not be empty.";
  if (text.length > 120) return "Text is too long (max 120 characters).";
  return null;
}
