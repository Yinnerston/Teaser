/**
 * Format numbers to 1dp.
 */
export const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

/**
 * Convert ISO8601 dates
 * @param {*} ISO8601Date
 */
export function formatCommentDate(ISO8601Date) {
  return ISO8601Date.slice(0, 9);
}
