export const numberCommaSeparatedFormatter = new Intl.NumberFormat("en-US");

export const numberCompactShortFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});
