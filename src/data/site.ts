import data from "../../data.json";

/**
 * Central content source for the whole portfolio.
 * Edit /data.json at the project root to update any text — no code changes needed.
 */
export type SiteData = typeof data;

export const site = data;
export const { profile, skills, flagshipProject, otherProjects, experience } =
  data;

/** All projects shown in the Work section: flagship first, then the rest. */
export const projects = [flagshipProject, ...otherProjects];

/** Initials derived from the name, e.g. "Ahmad Genius" -> "AG". */
export const initials = profile.name
  .split(/\s+/)
  .filter(Boolean)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

/** First word of the name (big line 1 of the hero). */
export const firstName = profile.name.split(/\s+/)[0] ?? "";
/** Remaining words of the name (line 2 of the hero). */
export const lastName = profile.name.split(/\s+/).slice(1).join(" ");

/**
 * Splits profile.title into the small prefix + the two words that cross-fade
 * in the hero animation. "Full Stack Software Engineer & Founder"
 *   -> prefix "A Full Stack Software", word1 "Engineer", word2 "Founder".
 */
export const heroRole = (() => {
  const parts = profile.title
    .split("&")
    .map((s) => s.trim())
    .filter(Boolean);
  const lastWord = (s: string) => s.split(/\s+/).filter(Boolean).slice(-1)[0] ?? "";

  let word1: string;
  let word2: string;
  let prefixSource: string;

  if (parts.length >= 2) {
    word1 = lastWord(parts[0]);
    word2 = lastWord(parts[1]);
    prefixSource = parts[0].split(/\s+/).slice(0, -1).join(" ");
  } else {
    const words = profile.title.split(/\s+/).filter(Boolean);
    word2 = words.pop() ?? "";
    word1 = words.pop() ?? "";
    prefixSource = words.join(" ");
  }

  return { prefix: `A ${prefixSource}`.trim(), word1, word2 };
})();

export default site;
